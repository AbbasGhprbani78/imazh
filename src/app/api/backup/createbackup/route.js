import fs from "fs";
import path from "path";
import archiver from "archiver";
import { NextResponse } from "next/server";

export async function GET() {
  const dbPath = path.join(process.cwd(), "prisma", "dev.db");
  const uploadsPath = path.join(process.cwd(), "public", "uploads");
  const backupPath = path.join(
    process.cwd(),
    "backups",
    `backup_${Date.now()}.zip`
  );

  try {
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json(
        { error: "Database not found." },
        { status: 404 }
      );
    }
    if (!fs.existsSync(uploadsPath)) {
      return NextResponse.json(
        { error: "Uploads folder not found." },
        { status: 404 }
      );
    }

    const output = fs.createWriteStream(backupPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);

    archive.file(dbPath, { name: "prisma/dev.db" });

    archive.directory(uploadsPath, "uploads");

    archive.on("error", (err) => {
      return NextResponse.json(
        { error: "Archiving error.", details: err.message },
        { status: 500 }
      );
    });

    await archive.finalize();

    const fileStream = fs.createReadStream(backupPath);
    const headers = {
      "Content-Disposition": `attachment; filename=backup_${Date.now()}.zip`,
      "Content-Type": "application/zip",
    };
    return new NextResponse(fileStream, { headers });
  } catch (error) {
    return NextResponse.json(
      { error: "Backup failed.", details: error.message },
      { status: 500 }
    );
  }
}
