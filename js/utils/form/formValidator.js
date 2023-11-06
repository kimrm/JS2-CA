const ALLOWED_EMAIL_DOMAINS = ["stud.noroff.no", "noroff.no"];

export function validate(validators) {
  const validations = [];
  validators.forEach(({ element, validator }) => {
    const isValid = validator();
    validations.push({ element, isValid });
  });
  return validations;
}

export function emailValidator(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(email);
  if (isEmail) {
    const emailParts = email.split("@");
    const domain = emailParts[1];
    return ALLOWED_EMAIL_DOMAINS.includes(domain);
  }

  return false;
}

export function passwordEnteredValidator(password) {
  return password.length > 0;
}

/**
 * Validates a name
 * @param {string} name
 * @returns {boolean}
 */
export function nameValidator(name) {
  const nameRegex = /^[\p{L}\p{N}_ ]{1,20}$/u;
  return nameRegex.test(name);
}

/**
 * Validates a password
 * @param {string} password
 * @returns {boolean}
 */
export function passwordValidator(password) {
  return password.length >= 8;
}

/**
 * Validates the confirmed password
 * @param {string} password
 * @param {string} confirmed_password
 * @returns {boolean}
 */
export function passwordConfirmedValidator(password, confirmed_password) {
  return password === confirmed_password;
}
