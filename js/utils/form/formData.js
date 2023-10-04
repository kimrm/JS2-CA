/**
 * Gets the data from the form
 * @param {HTMLFormElement} form
 * @returns {object}
 * @description This function is used to get the data from the form.
 */
function getData(form) {
  return {
    ...Object.fromEntries(new FormData(form).entries()),
  };
}

/**
 * Get the data from the login form
 * @param {HTMLFormElement} form
 * @returns {object}
 * @description This function is used to get the data from the login form.
 */
export function getLoginData(form) {
  return getData(form);
}

/**
 * Get the data from the register form
 * @param {HTMLFormElement} form
 * @returns {object}
 * @description This function is used to get the data from the register form.
 */
export function getRegisterData(form) {
  return {
    ...getData(form),
    ...{ avatar: "", banner: "" },
  };
}
