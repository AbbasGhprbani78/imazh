import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { promises as fs } from "fs";
import path from "path";

export async function GET(req) {
  try {
    const allArchives = await prisma.archive.findMany({
      include: {
        customer: true,
        operation: true,
        setting: true,
        photos: true,
      },
    });
    return new Response(JSON.stringify(allArchives), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const operationId = formData.get("operationId");
//     const settingId = formData.get("settingId");
//     const customerId = formData.get("customerId");
//     const photos = formData.getAll("photos");

//     if (!operationId || !settingId || !customerId) {
//       return new Response(
//         JSON.stringify({ message: "Missing required fields or files" }),
//         { status: 400 }
//       );
//     }

//     const uploadsDir = path.join(process.cwd(), "public", "uploads");
//     await fs.mkdir(uploadsDir, { recursive: true });

//     const allPhotos = [];

//     for (const file of photos) {
//       const fileName = `${Date.now()}-${file.name}`;
//       const filePath = path.join(uploadsDir, fileName);

//       const buffer = await file.arrayBuffer();
//       await fs.writeFile(filePath, Buffer.from(buffer));

//       allPhotos.push({ url: `/uploads/${fileName}` });
//     }

//     const newArchive = await prisma.archive.create({
//       data: {
//         operationId: parseInt(operationId),
//         settingId: parseInt(settingId),
//         customerId: parseInt(customerId),
//         status: 1,
//         date2: new Date(),
//         photos1: {
//           create: allPhotos,
//         },
//       },
//       include: {
//         photos1: true,
//       },
//     });

//     return new Response(JSON.stringify(newArchive), { status: 201 });
//   } catch (error) {
//     console.error("Error processing request:", error.message, error.stack);
//     return new Response(
//       JSON.stringify({
//         message: "Internal Server Error",
//         error: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }

export async function POST(req) {
  try {
    const formData = await req.formData();
    const operationId = formData.get("operationId");
    const settingId = formData.get("settingId");
    const customerId = formData.get("customerId");
    const photos = formData.getAll("photos");

    if (!operationId || !settingId || !customerId) {
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
        url: `/uploads/${fileName}`,
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

    return new Response(JSON.stringify(newArchive), { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error.message, error.stack);
    return new Response(
      JSON.stringify({
        message: "مشکلی سمت سرور پیش آمده",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
