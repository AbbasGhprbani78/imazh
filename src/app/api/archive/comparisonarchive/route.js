import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { settingId, archiveId, operationId } = body;

  try {
    const settingExists = await prisma.setting.findUnique({
      where: { id: settingId },
    });

    if (!settingExists) {
      return new Response(
        JSON.stringify({ message: "تنظیمات مورد نظر یافت نشد" }),
        { status: 404 }
      );
    }

    const archives = await prisma.archive.findMany({
      where: {
        settingId,
        operationId, 
        isDelete: false, 
        id: { not: archiveId }, 
        customer: {
          isDelete: false,
        },
      },
      include: {
        customer: true, 
        photos: true,
      },
    });

    return new Response(JSON.stringify(archives), { status: 200 });
  } catch (error) {
    console.error("Error processing POST request:", error.message, error.stack);

    return new Response(
      JSON.stringify({
        message: "مشکلی سمت سرور پیش آمده",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
