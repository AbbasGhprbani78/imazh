// import { hashPassword } from "@/utils/auth";
// import { verifyAccessToken } from "@/utils/auth";
// import UserModel from "../../../../../../models/User";
// import { cookies } from "next/headers";
// import connectToDB from "../../../../../../configs/db";

// export async function PUT(req) {
//   try {
//     await connectToDB();

//     const token = cookies().get("token");
//     if (!token) {
//       return Response.json({ message: "دسترسی مجاز نیست" }, { status: 401 });
//     }

//     const tokenPayload = verifyAccessToken(token.value);
//     if (!tokenPayload) {
//       return Response.json({ message: "توکن نامعتبر است" }, { status: 403 });
//     }

//     const body = await req.json();
//     const { password } = body;

//     if (!password || password.length < 3) {
//       return Response.json(
//         { message: "رمز عبور باید حداقل 3 کاراکتر باشد" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await hashPassword(password);

//     const username = tokenPayload.username;

//     const updatedUser = await UserModel.findOneAndUpdate(
//       { username: username },
//       { password: hashedPassword },
//       { new: true, select: "-password -refreshToken -__v" }
//     );

//     if (!updatedUser) {
//       return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });
//     }

//     return Response.json({
//       message: "رمز عبور با موفقیت تغییر کرد",
//     });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return Response.json({ message: "خطای سرور رخ داد" }, { status: 500 });
//   }
// }



import { hashPassword, verifyAccessToken } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

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

    return new Response(
      JSON.stringify({ message: "رمز عبور با موفقیت تغییر کرد" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ message: "خطای سرور رخ داد" }), {
      status: 500,
    });
  }
}
