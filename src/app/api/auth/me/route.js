import { verifyAccessToken } from "@/utils/auth";
import connectToDB from "../../../../../configs/db";
import { cookies } from "next/headers";
import UserModel from "../../../../../models/User";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function GET(req) {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne(
        { username: tokenPayload.username },
        "-password -refreshToken -__v"
      );
    }
    return Response.json(user);
  } else {
    return Response.json(
      {
        data: null,
        message: "دسترسی مجاز نیست",
      },
      { status: 401 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectToDB();

    const token = cookies().get("token");
    if (!token) {
      return Response.json({ message: "دسترسی مجاز نیست" }, { status: 401 });
    }

    const tokenPayload = verifyAccessToken(token.value);
    if (!tokenPayload || !tokenPayload._id) {
      return Response.json({ message: "توکن نامعتبر است" }, { status: 403 });
    }

    if (username && typeof username !== "string") {
      return Response.json(
        { message: "نام کاربری نامعتبر است" },
        { status: 400 }
      );
    }


    const formData = await req.formData();
    const username = formData.get("username");
    const img = formData.get("img");

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

    const updatedUser = await UserModel.findByIdAndUpdate(
      tokenPayload._id,
      updateData,
      { new: true, select: "-password -refreshToken -__v" }
    );

    if (!updatedUser) {
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    return Response.json({
      message: "اطلاعات کاربر با موفقیت به‌روزرسانی شد",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json({ message: "خطای سرور رخ داد" }, { status: 500 });
  }
}