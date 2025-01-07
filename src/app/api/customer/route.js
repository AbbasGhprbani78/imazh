import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const allCustomers = await prisma.customer.findMany({
      where: {
        isDelete: false,
      },
    });

    return new Response(JSON.stringify(allCustomers), { status: 200 });
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
    const {
      fullname,
      email,
      phonenumber,
      nationalcode,
      datereference,
      birthday,
      filenumber,
      gender,
    } = body;

    if (!fullname) {
      return new Response(JSON.stringify({ message: "نام کامل الزامی است" }), {
        status: 400,
      });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ message: "ایمیل نامعتبر است" }), {
        status: 400,
      });
    }

    if (!phonenumber || !/^09[0-9]{9}$/.test(phonenumber)) {
      return new Response(
        JSON.stringify({ message: "شماره تلفن معتبر نمی‌باشد" }),
        { status: 400 }
      );
    }

    if (!filenumber) {
      return new Response(
        JSON.stringify({ message: "شماره پرونده الزامی است" }),
        { status: 400 }
      );
    }

    if (!nationalcode || !/^[0-9]{10}$/.test(nationalcode)) {
      return new Response(
        JSON.stringify({ message: "کد ملی باید شامل ۱۰ رقم باشد" }),
        { status: 400 }
      );
    }

    if (!datereference || isNaN(Date.parse(datereference))) {
      return new Response(
        JSON.stringify({ message: "تاریخ مراجعه نامعتبر است" }),
        { status: 400 }
      );
    }

    if (!birthday || isNaN(Date.parse(birthday))) {
      return new Response(
        JSON.stringify({ message: "تاریخ تولد نامعتبر است" }),
        { status: 400 }
      );
    }

    if (!gender || (gender !== "men" && gender !== "women")) {
      return new Response(
        JSON.stringify({ message: "جنسیت باید یکی از مقادیر زن یا مرد باشد" }),
        { status: 400 }
      );
    }

    // Check for duplicate entries
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        OR: [{ nationalcode }, { phonenumber }, { filenumber }, { email }],
      },
    });

    if (existingCustomer) {
      if (existingCustomer.nationalcode === nationalcode) {
        return new Response(
          JSON.stringify({ message: "کد ملی قبلاً ثبت شده است" }),
          { status: 400 }
        );
      }
      if (existingCustomer.phonenumber === phonenumber) {
        return new Response(
          JSON.stringify({ message: "شماره تلفن قبلاً ثبت شده است" }),
          { status: 400 }
        );
      }
      if (existingCustomer.filenumber === filenumber) {
        return new Response(
          JSON.stringify({ message: "شماره پرونده قبلاً ثبت شده است" }),
          { status: 400 }
        );
      }
      if (existingCustomer.email === email) {
        return new Response(
          JSON.stringify({ message: "ایمیل قبلاً ثبت شده است" }),
          { status: 400 }
        );
      }
    }

    // Create new customer
    const customer = await prisma.customer.create({
      data: {
        fullname,
        email,
        phonenumber,
        nationalcode,
        datereference: new Date(datereference),
        birthday: new Date(birthday),
        filenumber,
        gender,
      },
    });

    return new Response(
      JSON.stringify({
        message: "مشتری با موفقیت ثبت شد",
        data: customer,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}
