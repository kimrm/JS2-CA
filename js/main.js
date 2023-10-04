import "./bootstrap.bundle.min.js";
import { isLoggedIn } from "./utils/auth/auth.js";

/**
 * Initializes the main function for the application
 * @returns {void}
 */
function initializeApp() {
  const selectedModulePath = determineModulePathForCurrentPagePath();
  invokeModule(selectedModulePath);
}

/**
 * Determines the module path based on the current page path.
 * @returns {string | null}
 * @description This function is used to determine which module to import and invoke based on the current page path.
 */
function determineModulePathForCurrentPagePath() {
  const currentPagePath = window.location.pathname;

  switch (currentPagePath) {
    case "/":
    case "/index.html":
      return "./pages/index.js";
    case "/register/":
    case "/register/index.html":
      return "./pages/register.js";
    default:
      if (!isLoggedIn()) {
        console.log("Not logged in");
        return;
      }
      return loggedInRoutes(currentPagePath);
  }
}

function loggedInRoutes(currentPagePath) {
  switch (currentPagePath) {
    case "/profile/":
    case "/profile/index.html":
      return "./pages/profile.js";
    case "/feed/":
    case "/feed/index.html":
      return "./pages/feed.js";
    default:
      return null;
  }
}

/**
 * Imports and invokes module from a given path.
 * @param {string} path
 * @returns {void}
 */
function invokeModule(path) {
  import(path).then((module) => module.main());
}

initializeApp();
