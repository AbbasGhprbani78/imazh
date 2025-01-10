import { PrismaClient } from "@prisma/client";

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

    return new Response(JSON.stringify(SettingVideo), {status: 200});
  } catch (error) {
    console.error("Error retrieving settings:", error);
    return new Response(
      JSON.stringify({ success: false, message: "خطا در دریافت تنظیمات" }),
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {
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

    return new Response(
      JSON.stringify({
        success: "تنظیمات با موفقیت تغییر کرد",
        data: updatedSettingVideo,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating SettingVideos:", error);
    return new Response(
      JSON.stringify({ success: false, message: "خطا در به‌روزرسانی تنظیمات" }),
      {
        status: 500,
      }
    );
  }
}
