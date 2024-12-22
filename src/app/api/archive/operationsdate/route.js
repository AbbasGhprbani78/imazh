import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customerId");
  const operationId = searchParams.get("operationId");

  if (!customerId || !operationId) {
    return new Response(
      JSON.stringify({ message: "ایدی بیمار و ایدی عملیات اجباری میباشد " }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const archives = await prisma.archive.findMany({
      where: {
        customerId: parseInt(customerId),
        operationId: parseInt(operationId),
      },
      select: {
        id: true,
        date1: true,
        date2: true,
        createdAt: true,
      },
    });

   
    return new Response(JSON.stringify(archives), {status: 200});
  } catch (error) {
    console.error("Error fetching archives:", error);
    return new Response(JSON.stringify({ error: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}
