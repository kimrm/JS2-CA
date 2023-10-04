import { posts, follow, unfollow, react } from "../utils/API/api.js";
import { isFollowing } from "../utils/auth/user.js";
import postComponent from "../components/posts/post.mjs";

function createObserver(element) {
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 0.1, // 50% visibility required to trigger callback
  };

  const observer = new IntersectionObserver(handleIntersection, options);

  observer.observe(element);
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      loadPosts();
    }
  });
}

let nextOffset = 0;

function loadPosts() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  posts(userData, 10, nextOffset).then((data) => {
    const container = document.querySelector("#posts");
    data.forEach((post, index, arr) => {
      post = { ...post, isFollowingAuthor: isFollowing(post.author.name) };

      const postElement = postComponent(post.id, post);
      postElement.id = `post_${post.id}`;
      container.appendChild(postElement);

      if (index === arr.length - 1) {
        createObserver(postElement);
      }
    });
  });

  nextOffset += 10;
}

export function main() {
  loadPosts();
}
