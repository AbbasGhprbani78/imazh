import connectToDB from "../../../../configs/db";
import OperationModel from "../../../../models/Operation";
export async function GET(req) {
  try {
    connectToDB();
    const allOperation = OperationModel.find({});
    return Response.json({ data: allOperation }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { nameoperation } = body;


    return Response.json({ message:"عملیات جدید با موفقیت اضافه شد" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}
