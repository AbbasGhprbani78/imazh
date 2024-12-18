import { hashPassword } from "@/utils/auth";
import { verifyAccessToken } from "@/utils/auth";
import UserModel from "../../../../../../models/User";
import { cookies } from "next/headers";
import connectToDB from "../../../../../../configs/db";

export async function PUT(req) {
  try {
    await connectToDB();

    const token = cookies().get("token");
    if (!token) {
      return Response.json({ message: "دسترسی مجاز نیست" }, { status: 401 });
    }

    const tokenPayload = verifyAccessToken(token.value);
    if (!tokenPayload) {
      return Response.json({ message: "توکن نامعتبر است" }, { status: 403 });
    }

    const body = await req.json();
    const { password } = body;

    if (!password || password.length < 3) {
      return Response.json(
        { message: "رمز عبور باید حداقل 3 کاراکتر باشد" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const username = tokenPayload.username;

    const updatedUser = await UserModel.findOneAndUpdate(
      { username: username },
      { password: hashedPassword },
      { new: true, select: "-password -refreshToken -__v" }
    );

    if (!updatedUser) {
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    return Response.json({
      message: "رمز عبور با موفقیت تغییر کرد",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json({ message: "خطای سرور رخ داد" }, { status: 500 });
  }
}
