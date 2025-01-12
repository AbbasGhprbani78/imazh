import { PrismaClient } from "@prisma/client";
import { middleware } from "../middleware";

const prisma = new PrismaClient();

export async function GET() {
  try {
    let SettingVideo = await prisma.SettingVideo.findUnique({
      where: { id: 1 },
    });

    if (!SettingVideo) {
      SettingVideo = await prisma.SettingVideo.create({
        data: {
          resolution: "4k",
          videoDelay: 0,
          format: "mp4",
        },
      });
    }

    return new Response(JSON.stringify(SettingVideo), { status: 200 });
  } catch (error) {
    console.error("Error retrieving settings:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "خطا در دریافت تنظیمات ویدیو",
      }),
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {
  const logResponse = await middleware(req);
  try {
    const body = await req.json();
    const { resolution, videoDelay, format } = body;

    const updatedSettingVideo = await prisma.SettingVideo.update({
      where: { id: 1 },
      data: {
        resolution,
        videoDelay: Number(videoDelay),
        format,
      },
    });

    const response = new Response(
      JSON.stringify({
        message: "تنظیمات ویدیو با موفقیت تغییر کرد",
        data: updatedSettingVideo,
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
