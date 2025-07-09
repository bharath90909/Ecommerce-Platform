import { VALIDATION_MESSAGES } from "./constants";

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: VALIDATION_MESSAGES.EMAIL_INVALID };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }

  if (password.length < 6) {
    return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH };
  }

  return { isValid: true };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_MISMATCH };
  }

  return { isValid: true };
};

export const validatePrice = (price: string | number): ValidationResult => {
  if (!price) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }

  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numPrice) || numPrice <= 0) {
    return { isValid: false, message: VALIDATION_MESSAGES.PRICE_INVALID };
  }

  return { isValid: true };
};

export const validateUrl = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, message: VALIDATION_MESSAGES.URL_INVALID };
  }
};

export const validateRequired = (value: any): ValidationResult => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }

  return { isValid: true };
};
