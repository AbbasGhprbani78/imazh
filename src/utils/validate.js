export const isRequired = (value) => {
  return value ? true : false;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : "Invalid email address";
};

export const validateNationalCode = (code) => {
  if (!/^\d{10}$/.test(code)) {
    return 'National code must be exactly 10 digits';
  }

  const digits = code.split('').map(Number);
  const controlDigit = digits[9];

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }

  const remainder = sum % 11;

  if ((remainder < 2 && controlDigit === remainder) || (remainder >= 2 && controlDigit === 11 - remainder)) {
    return null; 
  }

  return 'Invalid national code';
};


export const validateIranianPhoneNumber = (phone) => {
  const iranPhoneRegex = /^09[0-3][0-9]{8}$/;

  if (!iranPhoneRegex.test(phone)) {
    return 'Invalid phone number. It should be 11 digits and start with 09.';
  }

  return null;
};
