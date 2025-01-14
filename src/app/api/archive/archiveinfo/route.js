import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req) {
  try {
    const url = new URL(req.url); 
    const customerId = url.searchParams.get("customerId");
    const operationId = url.searchParams.get("operationId");
    const archiveId = url.searchParams.get("archiveId");
    const group = url.searchParams.get("group");

    if (!customerId || !operationId || !archiveId) {
      return new Response(
        JSON.stringify({ message: "تمامی پارامترها باید ارسال شوند" }),
        { status: 400 }
      );
    }

    const whereCondition = {
      id: Number(archiveId),
      customerId: Number(customerId),
      operationId: Number(operationId),
      isDelete: false,
    };

    const includeCondition = {
      customer: true,
      operation: true,
      setting: true,
      photos: group
        ? {
            where: {
              group: Number(group),
            },
          }
        : true,
    };

    const archive = await prisma.archive.findFirst({
      where: whereCondition,
      include: includeCondition,
    });

    if (!archive) {
      return new Response(
        JSON.stringify({ archive: [], message: "آرشیو یافت نشد" }),
        {
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: group
          ? `آرشیوهای دارای group ${group} با موفقیت یافت شدند`
          : "آرشیو با موفقیت یافت شد",
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
