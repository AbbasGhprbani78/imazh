import { PrismaClient } from "@prisma/client";
import { middleware } from "../../middleware";
import path from "path";
import fs from "fs/promises";
const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  const logResponse = await middleware(req);
  try {
    const { id } = params;

    if (!id || isNaN(Number(id))) {
      return new Response(JSON.stringify({ message: "ایدی معتبر نیست" }), {
        status: 400,
      });
    }

    const archive = await prisma.archive.findUnique({
      where: { id: Number(id) },
      include: {
        operation: true,
        customer: true,
      },
    });

    if (!archive) {
      return new Response(JSON.stringify({ message: "آرشیو یافت نشد" }), {
        status: 404,
      });
    }

    const updatedArchive = await prisma.archive.update({
      where: { id: Number(id) },
      data: { isDelete: true },
    });

    const response = new Response(
      JSON.stringify({
        message: `آرشیو با عملیات "${archive.operation.operation}" برای مشتری "${archive.customer.fullname}" حذف شد.`,
        archive: updatedArchive,
      }),
      { status: 200 }
    );

    if (logResponse) await logResponse(response);

    return response;
  } catch (error) {
    const errorResponse = new Response(
      JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }),
      {
        status: 500,
      }
    );

    if (logResponse) {
      const errorDetails = {
        message: error.message || "مشخصات خطا نامشخص",
        stack: error.stack || "هیچ اطلاعاتی از پشته موجود نیست",
      };
      await logResponse(errorResponse, errorDetails);
    }

    return errorResponse;
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const group = searchParams.get("group");

    if (!id || isNaN(Number(id))) {
      return new Response(JSON.stringify({ message: "ایدی معتبر نیست" }), {
        status: 400,
      });
    }

    const archive = await prisma.archive.findUnique({
      where: {
        id: Number(id),
        isDelete: false,
      },
      include: {
        customer: true,
        operation: true,
        setting: true,
        photos: true,
      },
    });

    if (!archive) {
      return new Response(JSON.stringify({ message: "آرشیو یافت نشد" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "آرشیو با موفقیت یافت شد",
        archive,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing GET request:", error.message);
    return new Response(
      JSON.stringify({
        message: "مشکلی سمت سرور پیش آمده",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return new Response(JSON.stringify({ message: "ایدی معتبر نیست" }), {
      status: 400,
    });
  }

  try {
    const formData = await req.formData();
    const archiveId = formData.get("id");
    const customerId = formData.get("customerId");
    const newPhotos = formData.getAll("newPhotos");
    const newPhotoGroups = formData.getAll("newPhotoGroups");
    const existingPhotos = formData.getAll("existingPhotos");

    if (!archiveId || !customerId) {
      return new Response(
        JSON.stringify({ message: "لطفاً تمام فیلدهای الزامی را وارد کنید." }),
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const uploadedPhotos = [];
    for (let i = 0; i < newPhotos.length; i++) {
      const file = newPhotos[i];
      const group = Number(newPhotoGroups[i]);

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadsDir, fileName);

      const buffer = await file.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(buffer));

      uploadedPhotos.push({
        url: `http://localhost:3000/uploads/${fileName}`,
        group,
      });
    }

   
    const parsedExistingPhotos = existingPhotos.map((photo) =>
      JSON.parse(photo)
    );

 
    const updatedArchive = await prisma.archive.update({
      where: { id: Number(archiveId) },
      data: {
        customerId: Number(customerId),
        photos: {
          deleteMany: {}, 
          create: [
            ...uploadedPhotos, 
            ...parsedExistingPhotos.map((photo) => ({
              url: photo.url,
              group: photo.group,
            })), 
          ],
        },
      },
      include: {
        photos: true, 
      },
    });

    return new Response(
      JSON.stringify({
        message: "آرشیو با موفقیت به‌روزرسانی شد.",
        archive: updatedArchive,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/archive/:id:", error.message, error.stack);

    return new Response(
      JSON.stringify({
        message: "مشکلی سمت سرور پیش آمده است.",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}