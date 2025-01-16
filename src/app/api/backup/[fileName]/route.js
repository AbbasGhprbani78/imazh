import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const backupFolderPath = path.join(process.cwd(), "backups");

  const { fileName } = params; 

  console.log("fileName =>", fileName);

  try {
    const filePath = path.join(backupFolderPath, fileName);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
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
