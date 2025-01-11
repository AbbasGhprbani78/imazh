import { PrismaClient } from "@prisma/client";
import { middleware } from "../middleware";
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    let SettingPhoto = await prisma.SettingPhoto.findUnique({
      where: { id: 1 },
    });

    if (!SettingPhoto) {
      SettingPhoto = await prisma.SettingPhoto.create({
        data: {
          format: "webp",
        },
      });
    }

    return new Response(JSON.stringify(SettingPhoto), {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving settings:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "خطا در دریافت تنظیمات عکس",
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const logResponse = await middleware(req);
  try {
    const body = await req.json();
    const { format } = body;

    const updatedSettingPhoto = await prisma.SettingPhoto.update({
      where: { id: 1 },
      data: {
        format,
      },
    });

    const response = new Response(
      JSON.stringify({
        message: "تنظیمات عکس با موفقیت تغییر کرد",
        data: updatedSettingPhoto,
      }),
      {
        status: 200,
      }
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
