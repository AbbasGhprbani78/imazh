import { PrismaClient } from "@prisma/client";
import { middleware } from "../../middleware";

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

    const operation = await prisma.Operation.delete({
      where: { id: Number(id) },
      data: { isDelete: true },
    });

    const response = new Response(
      JSON.stringify({
        message: "عملیات با موفقیت حذف گردید",
        operation,
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
