import { PrismaClient } from "@prisma/client";
import { middleware } from "../../middleware";

const prisma = new PrismaClient();

function validateCustomerData(data) {
  const errors = {};
  if (
    !data.fullname ||
    typeof data.fullname !== "string" ||
    data.fullname.trim().length < 3
  ) {
    errors.fullname = "نام کامل مشتری الزامی است";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "ایمیل معتبر نیست";
  }

  const phoneRegex = /^[0-9]{10,15}$/;
  if (!data.phonenumber || !phoneRegex.test(data.phonenumber)) {
    errors.phonenumber = "شماره تلفن معتبر نیست";
  }

  const nationalCodeRegex = /^[0-9]{10}$/;
  if (!data.nationalcode || !nationalCodeRegex.test(data.nationalcode)) {
    errors.nationalcode = "کد ملی معتبر نیست";
  }

  if (!data.datereference || isNaN(Date.parse(data.datereference))) {
    errors.datereference = "تاریخ مراجعه معتبر نیست";
  }

  if (!data.birthday || isNaN(Date.parse(data.birthday))) {
    errors.birthday = "تاریخ تولد معتبر نیست";
  }

  if (
    !data.filenumber ||
    typeof data.filenumber !== "string" ||
    data.filenumber.trim().length < 3
  ) {
    errors.filenumber = "شماره پرونده الزامی است";
  }

  if (data.gender !== "men" && data.gender !== "women") {
    errors.gender = "جنسیت باید 'مرد' یا 'زن' باشد";
  }

  return errors;
}

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: "ایدی مشتری لازم است" }), {
        status: 400,
      });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!customer) {
      return new Response(JSON.stringify({ error: "مشتری پیدا نشد" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(customer), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PUT(req, context) {
  const logResponse = await middleware(req);
  try {
    const { params } = context;
    const { id } = await params;

    if (!id) {
      return new Response(JSON.stringify({ error: "ایدی بیمار لازم است" }), {
        status: 400,
      });
    }

    const updatedData = await req.json();
    const errors = validateCustomerData(updatedData);

    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ errors }), { status: 400 });
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id: parseInt(id, 10) },
      data: updatedData,
    });

    const response = new Response(
      JSON.stringify({
        message: "اطلاعات بیمار با موفقیت به‌روزرسانی شد",
        data: updatedCustomer,
      }),
      { status: 200 }
    );

    if (logResponse) await logResponse(response);

    return response;
  } catch (error) {
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

export async function DELETE(req, { params }) {
  const logResponse = await middleware(req);
  try {
    const { id } = params;
    if (!id || isNaN(Number(id))) {
      return new Response(JSON.stringify({ message: "ایدی معتبر نیست" }), {
        status: 400,
      });
    }

    const customer = await prisma.customer.update({
      where: { id: Number(id) },
      data: { isDelete: true },
    });

    const response = new Response(
      JSON.stringify({
        message: "بیمار با موفقیت حذف گردید",
        customer,
      }),
      { status: 200 }
    )

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
