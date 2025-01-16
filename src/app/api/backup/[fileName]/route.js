import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const backupFolderPath = path.join(process.cwd(), "backups");

  const { fileName } = params;

  try {
    const filePath = path.join(backupFolderPath, fileName);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "فایل یافت نشد" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=${fileName}`,
        "Content-Length": fileBuffer.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching file.", details: error.message },
      { status: 500 }
    );
  }
}



export async function DELETE(req, { params }) {
  const { fileName } = params;

  const backupFolderPath = path.join(process.cwd(), "backups");

  try {
    const filePath = path.join(backupFolderPath, fileName);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "فایل یافت نشد" }, { status: 404 });
    }

    fs.unlinkSync(filePath);

    return NextResponse.json(
      {
        message: "فایل پشتیبان با موفقیت حذف شد",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching file.", details: error.message },
      { status: 500 }
    );
  }
}
