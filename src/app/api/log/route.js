import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req) {
  try {
    if (req.method !== "GET") {
      return req.status(405).json({ message: "Method not allowed" });
    }

    const logs = await prisma.log.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });

    console.log("Logs retrieved:", logs);

    return new Response(JSON.stringify(logs), { status: 200 });
  } catch (error) {
    console.error("Error retrieving settings:", error);
    return new Response(
      JSON.stringify({ success: false, message: "خطا در دریافت لاگ" }),
      {
        status: 500,
      }
    );
  }
}
