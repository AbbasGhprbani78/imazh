import { PrismaClient } from "@prisma/client";
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

    return new Response(
      JSON.stringify({
        message: "تنظیمات جدید با موفقیت اضافه شد",
        data: newSetting,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}
