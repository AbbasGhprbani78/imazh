// import {
//   generateAccessToken,
//   generateRefreshToken,
//   verifyPassword,
// } from "@/utils/auth";
// import connectToDB from "../../../../../configs/db";
// import UserModel from "../../../../../models/User";

// export async function POST(req) {
//   try {
//     connectToDB();
//     const body = await req.json();
//     const { username, password } = body;
//     const user = await UserModel.findOne({ username });

//     if (!user) {
//       return Response.json({ message: "کاربر یافت نشد" }, { status: 422 });
//     }

//     const isCorrectPasswordWithHash = await verifyPassword(
//       password,
//       user.password
//     );

//     if (!isCorrectPasswordWithHash) {
//       return Response.json(
//         { message: "نام کاربری یا رمز عبور اشتباه است" },
//         { status: 401 }
//       );
//     }

//     const accessToken = generateAccessToken({ username });
//     const refreshToken = generateRefreshToken({ username });

//     await UserModel.findOneAndUpdate(
//       { username },
//       {
//         $set: {
//           refreshToken,
//         },
//       }
//     );

//     const headers = new Headers();
//     const tokenMaxAge = 60 * 60 * 24 * 15;
//     const refreshMaxAge = 60 * 60 * 24 * 30;

//     headers.append(
//       "Set-Cookie",
//       `token=${accessToken};path=/;httpOnly=true;Max-Age=${tokenMaxAge}`
//     );

//     headers.append(
//       "Set-Cookie",
//       `refresh-token=${refreshToken};path=/;httpOnly=true;Max-Age=${refreshMaxAge}`
//     );

//     return Response.json(
//       {
//         message: "کاربر با موفقیت وارد شد",
//         role: user.role,
//       },
//       {
//         status: 200,
//         headers,
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
//       status: 500,
//     });
//   }
// }


import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@/utils/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "کاربر یافت نشد" }), {
        status: 422,
      });
    }

    const isCorrectPasswordWithHash = await verifyPassword(
      password,
      user.password
    );

    if (!isCorrectPasswordWithHash) {
      return new Response(
        JSON.stringify({ message: "نام کاربری یا رمز عبور اشتباه است" }),
        { status: 401 }
      );
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

    return new Response(
      JSON.stringify({
        message: "کاربر با موفقیت وارد شد",
        role: user.role,
      }),
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}
