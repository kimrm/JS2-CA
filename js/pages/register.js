import { register } from "../utils/API/api.js";
import { getRegisterData } from "../utils/form/formData.js";
import {
  validate,
  emailValidator,
  nameValidator,
  passwordValidator,
  passwordConfirmedValidator,
} from "../utils/form/formValidator.js";

const SUCCESS_MODULE = "../components/registrationSuccess.js";
const TOAST_MODULE = "../utils/showToastMessage.js";

/**
 * Staring point for the register page
 */
export function main() {
  const registerForm = document.querySelector("#register_form");
  registerForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const data = getRegisterData(form);

  if (validateFormData(data) === false) {
    return;
  }

  const submitBtn = document.querySelector("button[type=submit]");
  submitBtn.disabled = true;

  register(data)
    .then((data) => {
      handleUserFeedback(data);
    })
    .catch((err) => {
      const feedback = {
        heading: "Registration failed",
        body: "Something unexpected happened. Please try again later.",
      };
      handleRegistrationErrors(feedback);
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
}

function handleUserFeedback(data) {
  if (data.errors) {
    handleRegistrationErrors({
      heading: "Registration failed",
      body: "We could not register you. Please check the errors below.",
      errors: data.errors ? data.errors : null,
    });
  } else {
    handleRegistrationSuccess(data);
  }
}

function showToast(toastMessage) {
  import(TOAST_MODULE).then((module) => {
    module.default(toastMessage);
  });
}

/**
 * Shows the register success modal
 * @returns {void}
 * @description This function is used to show the register success modal.
 */
function handleRegistrationSuccess(data) {
  import(SUCCESS_MODULE).then((module) => {
    const container = document.querySelector("#register_col");
    container.innerHTML = module.default(data);
  });
  showToast({
    heading: "Registration successful",
    body: "Hi! You're registered. Go ahead and log in!",
    link: "/login",
  });
}

/**
 * Handles registration errors and gives feedback to the user
 * @param {object} messageObject
 * @returns {void}
 */
function handleRegistrationErrors(messageObject) {
  const parent = document.querySelector("body");
  import("../components/errorModal.js").then((module) => {
    parent.insertAdjacentHTML("beforeend", module.default(messageObject));
    const modal = new bootstrap.Modal(document.querySelector("#errorModal"));
    modal.show();
  });
}

function validateFormData(data) {
  const validators = [
    { element: "name", validator: () => nameValidator(data.name) },
    { element: "email", validator: () => emailValidator(data.email) },
    { element: "password", validator: () => passwordValidator(data.password) },
    {
      element: "confirm_password",
      validator: () =>
        passwordConfirmedValidator(data.password, data.confirm_password),
    },
  ];

  const validations = validate(validators);

  const isValid = validations.reduce((acc, { element, isValid }) => {
    const errorLbl = document.querySelector(
      "#" + element + " + .invalid-feedback"
    );
    errorLbl.style.display = isValid ? "none" : "block";
    return acc && isValid;
  }, {});

  return isValid;
}
