import { PrismaClient } from "@prisma/client";
import { middleware } from "../middleware";
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const allSettings = await prisma.setting.findMany();

    return new Response(JSON.stringify(allSettings), { status: 200 });
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

    const { name, description } = body;

    if (!name) {
      return new Response(
        JSON.stringify({ message: "کد تنظیمات نمی تواند خالی باشد" }),
        { status: 400 }
      );
    }
    if (!description) {
      return new Response(
        JSON.stringify({ message: "اسم تنظیمات نمی تواند خالی باشد" }),
        { status: 400 }
      );
    }

    const newSetting = await prisma.setting.create({
      data: {
        name,
        description,
      },
    });

    const response = new Response(
      JSON.stringify({
        message: "تنظیمات جدید با موفقیت اضافه شد",
        data: newSetting,
      }),
      { status: 201 }
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
