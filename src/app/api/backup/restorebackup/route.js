// import fs from "fs";
// import path from "path";
// import { NextResponse } from "next/server";
// import formidable from "formidable";
// import unzipper from "unzipper";

// export const config = {
//   api: {
//     bodyParser: false, // Disable built-in body parsing
//   },
// };

// // Helper function to parse form data using formidable
// const parseForm = (req) => {
//   return new Promise((resolve, reject) => {
//     const form = new formidable.IncomingForm({
//       multiples: false,
//       keepExtensions: true,
//       uploadDir: path.join(process.cwd(), "temp"),
//     });

//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });
//     });
//   });
// };

// // POST method to restore backup
// export async function POST(req) {
//   const dbPath = path.join(process.cwd(), "prisma", "dev.db");
//   const uploadsPath = path.join(process.cwd(), "public", "uploads");

//   try {
//     // Validate Content-Type
//     const contentType = req.headers.get("content-type");
//     if (!contentType || !contentType.startsWith("multipart/form-data")) {
//       return NextResponse.json(
//         { error: "Invalid content-type. Expected multipart/form-data." },
//         { status: 400 }
//       );
//     }

//     // Create temporary directory if it doesn't exist
//     const tempPath = path.join(process.cwd(), "temp");
//     if (!fs.existsSync(tempPath)) {
//       fs.mkdirSync(tempPath, { recursive: true });
//     }

//     // Parse the form data using formidable
//     const { files } = await parseForm(req);
//     if (!files || !files.file) {
//       return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
//     }

//     const uploadedFilePath = files.file.path;

//     // Open and extract the zip file
//     const directory = await unzipper.Open.file(uploadedFilePath);

//     for (const file of directory.files) {
//       if (file.path === "prisma/dev.db") {
//         // Restore database file
//         const buffer = await file.buffer();
//         fs.writeFileSync(dbPath, buffer);
//       } else if (file.path.startsWith("uploads/")) {
//         // Restore uploaded files
//         const uploadDestination = path.join(
//           uploadsPath,
//           file.path.replace("uploads/", "")
//         );
//         const buffer = await file.buffer();
//         fs.mkdirSync(path.dirname(uploadDestination), { recursive: true });
//         fs.writeFileSync(uploadDestination, buffer);
//       }
//     }

//     // Clean up temporary uploaded file
//     fs.unlinkSync(uploadedFilePath);

//     return NextResponse.json({ message: "Backup restored successfully." });
//   } catch (error) {
//     console.error("Restore failed:", error);
//     return NextResponse.json(
//       { error: "Restore failed.", details: error.message },
//       { status: 500 }
//     );
//   }
// }
