import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function middleware(req) {
  try {
    const { method, url, headers } = req;

    const ipAddress =
      headers["x-forwarded-for"] || req.socket?.remoteAddress || "UNKNOWN";

    const logData = {
      action: method || "UNKNOWN",
      endpoint: url || "UNKNOWN",
      userId: req.body?.userId || null,
      userAgent: headers["user-agent"] || null,
      requestData: JSON.stringify(req.body) || null,
      ipAddress: ipAddress,
      status: null,
      description: null,
    };

    const savedLog = await prisma.log.create({ data: logData });

    return async function logResponse(response) {
      try {
        const responseClone = response.clone();
        const responseBody = await responseClone.json();

        const message = responseBody.message || "ناشناخته";

        await prisma.log.update({
          where: { id: savedLog.id },
          data: {
            status: response.status || 200,
            description: message,
            responseData: JSON.stringify(responseBody) || null,
          },
        });
      } catch (error) {
        console.error("Error updating log status:", error);
      }
    };
  } catch (error) {
    console.error("Log middleware error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}