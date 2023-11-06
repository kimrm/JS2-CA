import { login, profile } from "../utils/API/api.js";
import { getLoginData } from "../utils/form/formData.js";
import {
  validate,
  emailValidator,
  passwordEnteredValidator,
} from "../utils/form/formValidator.js";

/**
 * Initializes the main function for the module
 */
export function main() {
  const loginForm = document.querySelector("#login_form");
  loginForm.addEventListener("submit", handleSubmit);
}

async function attemptLogin(userData) {
  return await login(userData);
}

function validateFormData(data) {
  const validators = [
    { element: "email", validator: () => emailValidator(data.email) },
    {
      element: "password",
      validator: () => passwordEnteredValidator(data.password),
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

/**
 * Handles the form submission
 * @param {Event} e
 * @returns {void}
 */
function handleSubmit(e) {
  e.preventDefault();

  const data = getLoginData(e.target);

  if (validateFormData(data) === false) {
    return;
  }

  attemptLogin(data).then((userData) => {
    if (userData.errors) {
      const loginFeedback = document.querySelector("#loginFeedback");
      loginFeedback.textContent =
        "Could not log in: " +
        userData.errors.map((e) => e.message).join(",<br> ");
      loginFeedback.classList.add("d-block");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(userData));

    profile(userData.name, userData).then((profileData) => {
      localStorage.setItem("profileData", JSON.stringify(profileData));
      window.location.href = "/profile";
    });
  });
}
