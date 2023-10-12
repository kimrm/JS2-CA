import { posts } from "../utils/API/api.js";
import { isFollowing } from "../utils/auth/user.js";
import postComponent from "../components/posts/post.mjs";
import createPost from "../components/posts/createPost.mjs";
import "../components/navbar/AppNavbar.mjs";

let currentFilterBy;
let currentSearchTerm;
let nextOffset = 0;
let limit = 100;

/**
 * Starting point for the feed page
 * @returns {void}
 */
export function main() {
  currentSearchTerm = new URLSearchParams(window.location.search).get("term");
  const searchInput = document.querySelector("#searchTermInput");
  if (currentSearchTerm) {
    searchInput.value = currentSearchTerm;
  }
  displayPosts();
  createPostCreationForm();
  createFilterActions();
}

async function displayPosts() {
  startLoader();

  const postsToDisplay = await processPosts();

  renderPosts(postsToDisplay);
  stopLoader();
}

async function processPosts() {
  const postsData = await getPaginatedPosts();

  let processedPosts = postsData;
  if (currentSearchTerm !== null || currentFilterBy !== null) {
    processedPosts = await filterLogic(postsData);
  }
  nextOffset += limit;
  return processedPosts;
}

async function filterLogic(postsData) {
  let searchedPosts = postsData;
  if (currentSearchTerm !== null) {
    searchedPosts = filterOnSearchTerm(searchedPosts);
  }
  if (currentFilterBy !== null) {
    searchedPosts = filterOnFilterOption(searchedPosts);
  }
  do {
    nextOffset += limit;
    const nextPosts = await getPaginatedPosts();

    if (nextPosts.length === 0) {
      break;
    }
    let nextSearchedPosts = nextPosts;
    if (currentSearchTerm !== null) {
      nextSearchedPosts = filterOnSearchTerm(nextSearchedPosts);
    }
    if (currentFilterBy !== null) {
      nextSearchedPosts = filterOnFilterOption(nextSearchedPosts);
    }

    searchedPosts = [...searchedPosts, ...nextSearchedPosts];
  } while (searchedPosts.length < limit);

  return searchedPosts;
}

function filterOnSearchTerm(postsData) {
  return postsData.filter((post) => {
    const postBody = post.body === null ? "" : post.body.toLowerCase();
    const postTitle = post.title === null ? "" : post.title.toLowerCase();
    const postAuthor =
      post.author.name === null ? "" : post.author.name.toLowerCase();

    return (
      postBody.includes(` ${currentSearchTerm.toLowerCase()} `) ||
      postBody.includes(`${currentSearchTerm.toLowerCase()} `) ||
      postBody === currentSearchTerm.toLowerCase() ||
      postTitle.includes(` ${currentSearchTerm.toLowerCase()} `) ||
      postTitle.includes(`${currentSearchTerm.toLowerCase()} `) ||
      postTitle === currentSearchTerm.toLowerCase() ||
      postAuthor.includes(currentSearchTerm.toLowerCase())
    );
  });
}

function createFilterActions() {
  const checkboxNewest = document.querySelector("#checkNewest");
  const checkboxFollowing = document.querySelector("#checkFollowing");
  const checkboxActive = document.querySelector("#checkActive");
  checkboxNewest.addEventListener("change", (e) => {
    if (!e.target.checked) {
      console.log("unchecked");
      return;
    }
    currentFilterBy = "newest";
    const container = document.querySelector("#posts");
    container.innerHTML = "";
    nextOffset = 0;
    startLoader();

    processPosts().then((data) => {
      renderPosts(data);
      stopLoader();
    });
  });
  checkboxFollowing.addEventListener("change", (e) => {
    if (!e.target.checked) {
      console.log("unchecked");
      return;
    }
    currentFilterBy = "following";
    const container = document.querySelector("#posts");
    container.innerHTML = "";
    nextOffset = 0;
    startLoader();

    processPosts().then((data) => {
      renderPosts(data);
      stopLoader();
    });
  });
  checkboxActive.addEventListener("change", (e) => {
    if (!e.target.checked) {
      console.log("unchecked");
      return;
    }
    currentFilterBy = "active";
    const container = document.querySelector("#posts");
    container.innerHTML = "";
    nextOffset = 0;
    startLoader();

    processPosts().then((data) => {
      renderPosts(data);
      stopLoader();
    });
  });
}

async function renderPosts(postsData) {
  const container = document.querySelector("#posts");
  postsData.forEach((post, index, arr) => {
    post = { ...post, isFollowingAuthor: isFollowing(post.author.name) };

    const postElement = postComponent(post.id, post);
    postElement.id = `post_${post.id}`;
    container.appendChild(postElement);

    if (index === arr.length - 3) {
      createPostElementObserver(postElement);
    }
  });
}

function stopLoader() {
  const loader = document.querySelector("#feedLoaderSpinner");
  loader.classList.add("d-none");
  const text = document.querySelector("#feedLoaderText");
  text.textContent = "No more posts to display";
}

function startLoader() {
  const loader = document.querySelector("#feedLoaderSpinner");
  loader.classList.remove("d-none");
  const text = document.querySelector("#feedLoaderText");
  text.textContent = "Loading more posts...";
}

async function getPaginatedPosts() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const postsData = await posts(userData, limit, nextOffset);
  return postsData;
}

function filterOnFilterOption(postsData) {
  let filteredPosts = [];
  switch (currentFilterBy) {
    case "newest":
      console.log("newest");
      filteredPosts = filterNewest(postsData);
      break;
    case "following":
      console.log("following");
      filteredPosts = filterFollowing(postsData);
      break;
    case "active":
      console.log("Filter: active");
      filteredPosts = filterActive(postsData);
      break;
    default:
      filteredPosts = postsData;
  }

  return filteredPosts;
}

function filterNewest(postsData) {
  currentFilterBy = "newest";
  return postsData.sort((a, b) => {
    return b.created - a.created;
  });
}

function filterFollowing(postsData) {
  currentFilterBy = "following";
  return postsData.filter((post) => {
    return isFollowing(post.author.name);
  });
}

function filterActive(postsData) {
  currentFilterBy = "active";
  return postsData
    .filter((post) => {
      return post._count.comments > 0 || post._count.reactions > 0;
    })
    .sort((a, b) => {
      return b._count.comments - a._count.comments;
    })
    .sort((a, b) => {
      return b._count.reactions - a._count.reactions;
    });
}

function createPostCreationForm() {
  const container = document.querySelector("#createPostContainer");
  const postElement = createPost();
  container.append(postElement);
}

function createPostElementObserver(element) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(handleIntersection, options);

  observer.observe(element);
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      displayPosts();
    }
  });
}
