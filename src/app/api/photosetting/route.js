import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
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

    return new Response(JSON.stringify(SettingPhoto), { status: 200 });
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
    const {format } = body;

    const updatedSettingPhoto = await prisma.SettingPhoto.update({
      where: { id: 1 },
      data: {
        format,
      },
    });

    return new Response(
      JSON.stringify({
        success: "تنظیمات با موفقیت تغییر کرد",
        data: updatedSettingPhoto,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating SettingPhoto:", error);
    return new Response(
      JSON.stringify({ success: false, message: "خطا در به‌روزرسانی تنظیمات" }),
      {
        status: 500,
      }
    );
  }
}
