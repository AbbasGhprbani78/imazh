import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { middleware } from "../../middleware";

const prisma = new PrismaClient();

export async function POST(req) {
  const logResponse = await middleware(req);

  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      const errorResponse = new Response(
        JSON.stringify({ message: "کاربر یافت نشد" }),
        {
          status: 422,
        }
      );

      if (logResponse)
        await logResponse(errorResponse, { message: "کاربر یافت نشد" });

      return errorResponse;
    }

    const isCorrectPasswordWithHash = await verifyPassword(
      password,
      user.password
    );

    if (!isCorrectPasswordWithHash) {
      const errorResponse = new Response(
        JSON.stringify({ message: "نام کاربری یا رمز عبور اشتباه است" }),
        { status: 401 }
      );

      if (logResponse)
        await logResponse(errorResponse, {
          message: "نام کاربری یا رمز عبور اشتباه است",
        });

      return errorResponse;
    }

    const accessToken = generateAccessToken({ username });
    const refreshToken = generateRefreshToken({ username });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    const headers = new Headers();
    const tokenMaxAge = 60 * 60 * 24 * 15;
    const refreshMaxAge = 60 * 60 * 24 * 30;

    headers.append(
      "Set-Cookie",
      `token=${accessToken};path=/;httpOnly=true;Max-Age=${tokenMaxAge}`
    );

    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true;Max-Age=${refreshMaxAge}`
    );

    const response = new Response(
      JSON.stringify({
        message: `با موفقیت وارد شد ${username} کاربر`,
        role: user.role,
      }),
      {
        status: 200,
        headers,
      }
    );

    if (logResponse) await logResponse(response);

    return response;
  } catch (error) {
    console.error(error);

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
