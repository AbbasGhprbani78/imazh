export const convertToFarsiDigits = (number) => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number?.toString().replace(/\d/g, (digit) => farsiDigits[digit]);
};

export const convertToPersianDate = (isoDate) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
};
