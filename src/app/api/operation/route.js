// import connectToDB from "../../../../configs/db";
// import OperationModel from "../../../../models/Operation";
// export async function GET(req) {
//   try {
//     connectToDB();
//     const allOperation = await OperationModel.find({}, "-__v");
//     return Response.json( allOperation , { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
//       status: 500,
//     });
//   }
// }

// export async function POST(req) {
//   try {
//     connectToDB();
//     const body = await req.json();
//     const { operation } = body;
//     if (!operation) {
//       return Response.json(
//         { message: "نام عملیات معتبر نمی‌باشد" },
//         { status: 400 }
//       );
//     }
//     const operationName = await OperationModel.create({
//       operation,
//     });

//     return Response.json(
//       { message: "عملیات جدید با موفقیت اضافه شد", data: operationName },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
//       status: 500,
//     });
//   }
// }

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const allOperations = await prisma.operation.findMany();
    return new Response(JSON.stringify(allOperations), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { operation } = body;

    if (!operation) {
      return new Response(
        JSON.stringify({ message: "نام عملیات معتبر نمی‌باشد" }),
        { status: 400 }
      );
    }

    try {
      const newOperation = await prisma.operation.create({
        data: {
          operation,
        },
      });

      return new Response(
        JSON.stringify({
          message: "عملیات جدید با موفقیت اضافه شد",
          data: newOperation,
        }),
        { status: 201 }
      );
    } catch (error) {
      if (error.code === "P2002") {
        return new Response(
          JSON.stringify({
            message: "نام عملیات باید یکتا باشد",
          }),
          { status: 400 }
        );
      }
      throw error; 
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}
