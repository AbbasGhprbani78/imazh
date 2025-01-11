import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { promises as fs } from "fs";
import path from "path";
import { middleware } from "../middleware";

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  try {
    const totalCount = await prisma.archive.count({
      where: {
        isDelete: false,
      },
    });

    const allArchives = await prisma.archive.findMany({
      where: {
        isDelete: false,
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      include: {
        customer: true,
        operation: true,
        setting: true,
        photos: true,
      },
    });

    const totalPages = Math.ceil(totalCount / limitNumber);

    return new Response(
      JSON.stringify({
        data: allArchives,
        totalPages,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const logResponse = await middleware(req);
  try {
    const formData = await req.formData();
    const operationId = formData.get("operationId");
    const settingId = formData.get("settingId");
    const customerId = formData.get("customerId");
    const photos = formData.getAll("photos");

    if (!operationId || !settingId || !customerId) {
      const errorResponse = new Response(
        JSON.stringify({ message: "لطفاً تمام فیلدهای الزامی را وارد کنید." }),
        { status: 400 }
      );

      if (logResponse)
        await logResponse(errorResponse, {
          message: "لطفاً تمام فیلدهای الزامی را وارد کنید.",
        });

      return errorResponse;
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const allPhotos = [];

    for (const file of photos) {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadsDir, fileName);

      const buffer = await file.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(buffer));

      allPhotos.push({
        url: `http://localhost:3000/uploads/${fileName}`,
        group: 1,
      });
    }

    const newArchive = await prisma.archive.create({
      data: {
        operationId: parseInt(operationId),
        settingId: parseInt(settingId),
        customerId: parseInt(customerId),
        status: 1,
        photos: {
          create: allPhotos,
        },
      },
      include: {
        photos: true,
      },
    });

    const response = new Response(
      JSON.stringify({
        message: `آرشیو جدید با موفقیت اضافه شد: ${newArchive.id}`,
        archive: newArchive,
      }),
      { status: 201 }
    );

    if (logResponse) await logResponse(response);

    return response;
    
  } catch (error) {
    console.error("Error processing POST request:", error.message, error.stack);

    const errorResponse = new Response(
      JSON.stringify({
        message: "مشکلی سمت سرور پیش آمده",
        error: error.message,
      }),
      { status: 500 }
    );

    if (logResponse)
      await logResponse(errorResponse, { message: "مشکلی سمت سرور پیش آمده" });

    return errorResponse;
  }
}
