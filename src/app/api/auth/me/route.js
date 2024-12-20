import {
  verifyAccessToken,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
      const cookieStore =await cookies(); 
      const token = cookieStore.get("token");
    if (!token) {
      return new Response(
        JSON.stringify({ data: null, message: "دسترسی مجاز نیست" }),
        { status: 401 }
      );
    }

    const tokenPayload = verifyAccessToken(token.value);
    if (!tokenPayload) {
      return new Response(
        JSON.stringify({ data: null, message: "توکن نامعتبر است" }),
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username: tokenPayload.username },
      select: {
        id: true,
        username: true,
        role: true,
        img: true, 
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ data: null, message: "کاربر یافت نشد" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error in GET:", error);
    return new Response(JSON.stringify({ message: "خطای سرور رخ داد" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
     const cookieStore =await cookies();
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

    const formData = await req.formData();
    const username = formData.get("username");
    const img = formData.get("img");

    if (username && typeof username !== "string") {
      return new Response(
        JSON.stringify({ message: "نام کاربری نامعتبر است" }),
        { status: 400 }
      );
    }

    let imgUrl;
    if (img) {
      const buffer = Buffer.from(await img.arrayBuffer());
      const extension = path.extname(img.name) || ".png";
      const filename = `${Date.now()}-${crypto
        .randomBytes(6)
        .toString("hex")}${extension}`;
      const imgPath = path.join(process.cwd(), "public/uploads", filename);

      await writeFile(imgPath, buffer);
      imgUrl = `http://localhost:3000/uploads/${filename}`;
    }

    const updateData = {
      ...(username && { username }),
      ...(imgUrl && { img: imgUrl }),
    };

    const updatedUser = await prisma.user.update({
      where: { username: tokenPayload.username },
      data: updateData,
    });

    const accessToken = generateAccessToken({ username: updatedUser.username });
    const refreshToken = generateRefreshToken({
      username: updatedUser.username,
    });

    const tokenMaxAge = 60 * 60 * 24 * 15; // 15 days
    const refreshMaxAge = 60 * 60 * 24 * 30; // 30 days

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `token=${accessToken};path=/;httpOnly=true;Max-Age=${tokenMaxAge}`
    );
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true;Max-Age=${refreshMaxAge}`
    );

    return new Response(
      JSON.stringify({
        message: "اطلاعات کاربر با موفقیت به‌روزرسانی شد",
        data: updatedUser,
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ message: "خطای سرور رخ داد" }), {
      status: 500,
    });
  }
}
