import fs from "fs";
import path from "path";
import unzipper from "unzipper";
import { NextResponse } from "next/server";

export async function POST(req) {
  const backupFolderPath = path.join(process.cwd(), "backups"); 
  const dbPath = path.join(process.cwd(), "prisma", "dev.db"); 
  const uploadsPath = path.join(process.cwd(), "public", "uploads"); 
  try {
    if (!fs.existsSync(backupFolderPath)) {
      return NextResponse.json(
        { error: "Backups folder not found." },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("backup");

  if (!file || !file.name.endsWith(".zip")) {
    return NextResponse.json(
      { error: "Invalid file type. Please upload a valid .zip file." },
      { status: 400 }
    );
  }
    const tempBackupPath = path.join(backupFolderPath, "temp_backup.zip");

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(tempBackupPath, buffer);

    const extractPath = path.join(backupFolderPath, "temp_extracted");
    if (fs.existsSync(extractPath)) {
      fs.rmSync(extractPath, { recursive: true, force: true });
    }
    fs.mkdirSync(extractPath, { recursive: true });

    await fs
      .createReadStream(tempBackupPath)
      .pipe(unzipper.Extract({ path: extractPath }))
      .promise();

    const restoredDbPath = path.join(extractPath, "prisma", "dev.db");
    if (fs.existsSync(restoredDbPath)) {
      fs.copyFileSync(restoredDbPath, dbPath); 
    } else {
      return NextResponse.json(
        { error: "Database file missing in backup." },
        { status: 400 }
      );
    }

    const restoredUploadsPath = path.join(extractPath, "uploads");
    if (fs.existsSync(restoredUploadsPath)) {
      if (fs.existsSync(uploadsPath)) {
        fs.rmSync(uploadsPath, { recursive: true, force: true }); 
      }
      fs.mkdirSync(uploadsPath, { recursive: true });
      fs.cpSync(restoredUploadsPath, uploadsPath, { recursive: true }); 
    } else {
      return NextResponse.json(
        { error: "Uploads folder missing in backup." },
        { status: 400 }
      );
    }

    fs.unlinkSync(tempBackupPath);
    fs.rmSync(extractPath, { recursive: true, force: true });

    return NextResponse.json({ success: true, message: "Restore completed." });
  } catch (error) {
    return NextResponse.json(
      { error: "Restore failed.", details: error.message },
      { status: 500 }
    );
  }
}
