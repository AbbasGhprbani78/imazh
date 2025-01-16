import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { promises as fs } from "fs";
import path from "path";
import { middleware } from "../../middleware"; 

export async function POST(req) {
  const logResponse = await middleware(req);
  try {
    const formData = await req.formData();
    const archiveId = formData.get("archiveId");
    const photos = formData.getAll("photos");

    if (!archiveId || photos?.length === 0) {
      return new Response(
        JSON.stringify({ message: "لطفاً تمام فیلدهای الزامی را وارد کنید." }),
        { status: 400 }
      );
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
        group: 2,
      });
    }

    const updatedArchive = await prisma.archive.update({
      where: {
        id: parseInt(archiveId),
      },
      data: {
        status: 2,
        date2: new Date(),
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
        message: `آرشیو جدید با موفقیت اضافه شد`,
        archive: updatedArchive,
      }),
      {
        status: 200,
      }
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
