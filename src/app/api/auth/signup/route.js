// import { generateAccessToken, hashPassword } from "@/utils/auth";
// import connectToDB from "../../../../../configs/db";
// import UserModel from "../../../../../models/User";

// export async function POST(req) {
//   try {
//     await connectToDB();

//     const body = await req.json();
//     const { username, password,role } = body;

//     const isUserExist = await UserModel.findOne({
//       $or: [{ username }],
//     });

//     if (isUserExist) {
//       return new Response(
//         JSON.stringify({ message: "The username already exists" }),
//         { status: 422 }
//       );
//     }

//     const hashedPassword = await hashPassword(password);

//     const accessToken = generateAccessToken({ username });

//     await UserModel.create({
//       username,
//       password: hashedPassword,
//       role
//     });

//     return new Response(
//       JSON.stringify({
//         message: "User signed up successfully :))",
//         username, 
//       }),
//       {
//         status: 201,
//         headers: {
//           "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`,
//         },
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ message: "Internal Server Error" }), {
//       status: 500,
//     });
//   }
// }

import { generateAccessToken, hashPassword } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password, role } = body;

    const isUserExist = await prisma.user.findUnique({
      where: { username },
    });

    if (isUserExist) {
      return new Response(
        JSON.stringify({ message: "The username already exists" }),
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const accessToken = generateAccessToken({ username });

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });

    return new Response(
      JSON.stringify({
        message: "User signed up successfully :))",
        username,
      }),
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`, 
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
