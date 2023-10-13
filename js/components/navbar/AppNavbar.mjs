import { auth } from "../../utils/auth/auth.js";

/**
 * A navbar component
 * @description A reusable navbar custom HTML element component.
 * @example
 * <app-navbar active-link="feed"></app-navbar>
 */
class AppNavbar extends HTMLElement {
  connectedCallback() {
    this.activeLink = this.getAttribute("active-link");
    if (this.activeLink) {
      this.querySelector(`#${this.activeLink}Link`).classList.add("active");
    }
    this.querySelector("#logOutButton").addEventListener("click", () => {
      localStorage.removeItem("userData");
      localStorage.removeItem("profileData");
      window.location.href = "/";
    });
  }

  constructor() {
    super();
    const user = auth();
    this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand fs-3" href="/feed">Social/app</a>

        <form class="col col-sm-6 ms-md-3 d-flex" action="/feed/" method="get">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="term"
            id="searchTermInput"
          />
          <button class="btn btn-primary d-none d-sm-block">Search</button>
        </form>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarToggler"
        >
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a id="profileLink" class="nav-link" href="/profile" role="button">
                <div class="d-flex align-center">
                  <div class="profile-icon-container">
                    <img
                      class="object-fit-cover rounded w-100 h-100 fadeable"
                      src="${user.avatar}"
                      alt="Profile picture icon"
                      id="navbarProfileIcon"
                    />
                  </div>
                  <span class="ms-2">Profile</span>
                </div>
              </a>
            </li>
            <li class="nav-item">
              <a id="feedLink" href="/feed" class="nav-link" aria-current="page"
                >Feed</a
              >
            </li>
            <li class="nav-item">
              <button id="logOutButton" class="nav-link">Log out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        `;

    const userProfileIcon = this.querySelector("#navbarProfileIcon");
    userProfileIcon.addEventListener("load", () => {
      userProfileIcon.classList.add("fade-in");
    });
    userProfileIcon.addEventListener("error", () => {
      userProfileIcon.src = `https://ui-avatars.com/api/?name=${user.name.substring(
        0,
        5
      )}&background=random&size=64`;
    });
  }
}

customElements.define("app-navbar", AppNavbar);
