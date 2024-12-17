import connectToDB from "../../../../../configs/db";
import CustomerModel from "../../../../../models/Customer";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "ایدی  مشتری لازم است" }), {
        status: 400,
      });
    }

    const deletedCustomer = await CustomerModel.findOneAndDelete({ _id: id });

    if (!deletedCustomer) {
      return new Response(
        JSON.stringify({ error: "مشتری با این ایدی یافت نشد" }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify({ message: "مشتری با موفقیت حذف شد" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return new Response(JSON.stringify({ error: "مشکلی سمت سرور پیش امده" }), {
      status: 500,
    });
  }
}

function validateCustomerData(data) {
  const errors = {};
  if (
    !data.fullname ||
    typeof data.fullname !== "string" ||
    data.fullname.trim().length < 3
  ) {
    errors.fullname =
      "نام کامل مشتری الزامی است";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "ایمیل معتبر نیست";
  }

  const phoneRegex = /^[0-9]{10,15}$/;
  if (!data.phonenumber || !phoneRegex.test(data.phonenumber)) {
    errors.phonenumber = "شماره تلفن معتبر نیست";
  }

  if (!data.operation) {
    errors.operation = "عملیات الزامی است";
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

  if (typeof data.age !== "number" || data.age <= 0 || data.age > 150) {
    errors.age = "سن معتبر نیست";
  }

  if (
    !data.filenumber ||
    typeof data.filenumber !== "string" ||
    data.filenumber.trim().length < 3
  ) {
    errors.filenumber =
      "شماره پرونده الزامی است";
  }

  return errors;
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const updatedData = await req.json();

    const errors = validateCustomerData(updatedData);
    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ errors }), { status: 400 });
    }

    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, 
        runValidators: true,
      }
    );

    if (!updatedCustomer) {
      return new Response(JSON.stringify({ error: "مشتری پیدا نشد" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedCustomer), { status: 200 });
  } catch (error) {
    console.error("Error updating customer:", error);
    return new Response(JSON.stringify({ error: "مشکلی سمت سرور پیش آمده" }), {
      status: 500,
    });
  }
}