import { PrismaClient } from "@prisma/client";
import { middleware } from "../middleware";
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const allOperations = await prisma.operation.findMany();
    return new Response(JSON.stringify(allOperations), { status: 200 });
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
    const body = await req.json();
    const { operation } = body;

    if (!operation) {
      return new Response(
        JSON.stringify({ message: "نام عملیات معتبر نمی‌باشد" }),
        { status: 400 }
      );
    }

    try {
      const newOperation = await prisma.operation.create({
        data: {
          operation,
        },
      });

      const response = new Response(
        JSON.stringify({
          message: "عملیات جدید با موفقیت اضافه شد",
          data: newOperation,
        }),
        { status: 201 }
      );
      if (logResponse) await logResponse(response);
      return response;
      
    } catch (error) {
      if (error.code === "P2002") {
        return new Response(
          JSON.stringify({
            message: "نام عملیات باید یکتا باشد",
          }),
          { status: 400 }
        );
      }
      throw error;
    }
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
