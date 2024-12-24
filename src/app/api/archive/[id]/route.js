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
