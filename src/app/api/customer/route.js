import connectToDB from "../../../../configs/db";
import CustomerModel from "../../../../models/Customer";

export async function GET(req) {
  try {
    connectToDB();
    const allCustomer = await CustomerModel.find({});
    return Response.json(allCustomer, { status: 200 });
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
        JSON.stringify({
          message: "شماره پرونده الزامی است",
        }),
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
        {
          status: 400,
        }
      );
    }

    if (!gender || (gender !== "men" && gender !== "women")) {
      return new Response(
        JSON.stringify({
          message: "جنسیت باید یکی از مقادیر زن یا مرد باشد",
        }),
        { status: 400 }
      );
    }

      const existingCustomer = await CustomerModel.findOne({
        $or: [{ nationalcode }, { phonenumber }, { filenumber }, { email }],
      });

      
    if (existingCustomer) {
      if (existingCustomer.nationalcode === nationalcode) {
        return Response.json(
          { message: "کد ملی قبلاً ثبت شده است" },
          { status: 400 }
        );
      }
      if (existingCustomer.phonenumber === phonenumber) {
        return Response.json(
          { message: "شماره تلفن قبلاً ثبت شده است" },
          { status: 400 }
        );
      }
      if (existingCustomer.filenumber === filenumber) {
        return Response.json(
          { message: "شماره پرونده قبلاً ثبت شده است" },
          { status: 400 }
        );
      }
      if (existingCustomer.email === email) {
        return Response.json(
          { message: "ایمیل قبلاً ثبت شده است" },
          { status: 400 }
        );
      }
    }

    const customer = await CustomerModel.create(body);

    return Response.json(
      { message: "مشتری با موفقیت ثبت شد", data: customer },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "مشکلی سمت سرور رخ داده" }), {
      status: 500,
    });
  }
}
