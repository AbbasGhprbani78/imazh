import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const backupFolderPath = path.join(process.cwd(), "backups");

  try {
    if (!fs.existsSync(backupFolderPath)) {
      return NextResponse.json(
        { error: "Backups folder not found." },
        { status: 404 }
      );
    }

    const files = fs.readdirSync(backupFolderPath);
    const backups = files
      .filter((file) => file.endsWith(".zip"))
      .map((file) => {
        const filePath = path.join(backupFolderPath, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          createdAt: stats.mtime,
        };
      });

    return NextResponse.json(backups);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching backups.", details: error.message },
      { status: 500 }
    );
  }
}
