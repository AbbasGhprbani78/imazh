export const convertToFarsiDigits = (number) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return number?.toString().replace(/\d/g, (digit) => farsiDigits[digit]);
};