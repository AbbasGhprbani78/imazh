import { middleware } from "@/app/api/middleware";
import { hashPassword, verifyAccessToken } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function PUT(req) {
  const logResponse = await middleware(req);
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return new Response(JSON.stringify({ message: "دسترسی مجاز نیست" }), {
        status: 401,
      });
    }

    const tokenPayload = verifyAccessToken(token.value);
    if (!tokenPayload) {
      return new Response(JSON.stringify({ message: "توکن نامعتبر است" }), {
        status: 403,
      });
    }

    const body = await req.json();
    const { password } = body;

    if (!password || password.length < 3) {
      return new Response(
        JSON.stringify({ message: "رمز عبور باید حداقل 3 کاراکتر باشد" }),
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const username = tokenPayload.username;

    const updatedUser = await prisma.user.update({
      where: { username },
      data: { password: hashedPassword },
    });

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: "کاربر یافت نشد" }), {
        status: 404,
      });
    }

    const response = new Response(
      JSON.stringify({ message: "رمز عبور با موفقیت تغییر کرد" }),
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
