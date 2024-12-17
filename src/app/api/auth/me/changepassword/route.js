import { hashPassword } from "@/utils/auth";
import connectToDB from "../../../../../configs/db";

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

    const body = await req.json();
    const { password } = body;

    if (!password || password.length < 6) {
      return Response.json(
        { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const updatedUser = await UserModel.findByIdAndUpdate(
      tokenPayload._id,
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
