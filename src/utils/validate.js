export const isRequired = (value) => {
  if (typeof value === "string") {
    return value.trim().length > 0; 
  }
  return value !== null && value !== undefined && value !== ""
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? true : false;
};

export const validateNationalCode = (code) => {
  if (!/^\d{10}$/.test(code)) {
    return false;
  } else {
    true;
  }

  const digits = code.split("").map(Number);
  const controlDigit = digits[9];

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }

  const remainder = sum % 11;

  if (
    (remainder < 2 && controlDigit === remainder) ||
    (remainder >= 2 && controlDigit === 11 - remainder)
  ) {
    return true;
  }

  return false;
};

export const validateIranianPhoneNumber = (phone) => {
  const iranPhoneRegex = /^09[0-3][0-9]{8}$/;

  if (!iranPhoneRegex.test(phone)) {
    return false;
  }

  return true;
};
