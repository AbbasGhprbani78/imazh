import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    if (!id || isNaN(Number(id))) {
      return new Response(JSON.stringify({ message: "ایدی معتبر نیست" }), {
        status: 400,
      });
    }

    const archive = await prisma.archive.update({
      where: { id: Number(id) },
      data: { isDelete: true },
    });

    return new Response(
      JSON.stringify({
        message: "آرشیو با موفقیت حذف گردید",
        archive,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing delete request:", error.message);
    return new Response(
      JSON.stringify({
        message: "مشکلی سمت سرور پیش آمده",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const group = searchParams.get("group"); // دریافت پارامتر group از URL

    if (!id || isNaN(Number(id))) {
      return new Response(JSON.stringify({ message: "ایدی معتبر نیست" }), {
        status: 400,
      });
    }

    if (group) {
      // اگر group مشخص شده باشد، فیلتر بر اساس گروه
      const archives = await prisma.archive.findMany({
        where: {
          id: Number(id),
          isDelete: false,
          photos: {
            some: {
              group: Number(group),
            },
          },
        },
        include: {
          customer: true,
          operation: true,
          setting: true,
          photos: true,
        },
      });

      if (archives.length === 0) {
        return new Response(
          JSON.stringify({ message: "هیچ آرشیوی با این گروه یافت نشد" }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({
          message: `آرشیوهای دارای group ${group} با موفقیت یافت شدند`,
          archives,
        }),
        { status: 200 }
      );
    }

    // اگر group مشخص نشده باشد، تمام اطلاعات آرشیو
    const archive = await prisma.archive.findUnique({
      where: {
        id: Number(id),
        isDelete: false,
      },
      include: {
        customer: true,
        operation: true,
        setting: true,
        photos: true,
      },
    });

    if (!archive) {
      return new Response(JSON.stringify({ message: "آرشیو یافت نشد" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "آرشیو با موفقیت یافت شد",
        archive,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing GET request:", error.message);
    return new Response(
      JSON.stringify({
        message: "مشکلی سمت سرور پیش آمده",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
