import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData(); // دریافت داده‌ها از فرم
    console.log("FormData:", formData);

    // دریافت فایل‌ها
    const audioFile = formData.get("audioFile");
    const watermark = formData.get("watermark");
    const group1Images = formData.getAll("group1Image"); // دریافت تمامی تصاویر گروه 1
    const group2Images = formData.getAll("group2Image"); // دریافت تمامی تصاویر گروه 2

    console.log("Audio File:", audioFile);
    console.log("Watermark:", watermark);
    console.log("Group 1 Images:", group1Images);
    console.log("Group 2 Images:", group2Images);

    // بررسی اینکه فایل‌ها به درستی ارسال شده باشند
    if (
      !audioFile ||
      !watermark ||
      group1Images.length === 0 ||
      group2Images.length === 0
    ) {
      return new Response("Missing required files", { status: 400 });
    }

    // پردازش و ذخیره تصاویر گروه اول
    for (let index = 0; index < group1Images.length; index++) {
      const imageBuffer = await group1Images[index].arrayBuffer();
      const imagePath = path.join(
        __dirname,
        `./uploads/group1Image${index}.png`
      );
      fs.writeFileSync(imagePath, Buffer.from(imageBuffer));
    }

    // پردازش و ذخیره تصاویر گروه دوم
    for (let index = 0; index < group2Images.length; index++) {
      const imageBuffer = await group2Images[index].arrayBuffer();
      const imagePath = path.join(
        __dirname,
        `./uploads/group2Image${index}.png`
      );
      fs.writeFileSync(imagePath, Buffer.from(imageBuffer));
    }

    // ذخیره فایل صوتی
    const audioBuffer = await audioFile.arrayBuffer();
    const audioPath = path.join(__dirname, "./uploads/audio.mp3");
    fs.writeFileSync(audioPath, Buffer.from(audioBuffer));

    // ذخیره واترمارک
    const watermarkBuffer = await watermark.arrayBuffer();
    const watermarkPath = path.join(__dirname, "./uploads/watermark.png");
    fs.writeFileSync(watermarkPath, Buffer.from(watermarkBuffer));

    return new Response("Video created successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing form data:", error);
    return new Response("Error processing data", { status: 500 });
  }
}
