export const convertToFarsiDigits = (number) => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number?.toString().replace(/\d/g, (digit) => farsiDigits[digit]);
};

export function toEnglishNumber(number) {
  return number
    ?.toString()
    .replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
}

export const convertToPersianDate = (isoDate) => {
  if (!isoDate || isNaN(new Date(isoDate).getTime())) {
    return "";
  }
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
};

export function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export const isImageUrl = (url) => {
  const imageRegex = /\.(jpeg|jpg|webp|png|data:image)/i;
  return imageRegex.test(url);
};

export const isImageFile = (file) => file.type.startsWith("image/");
