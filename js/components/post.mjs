import { isFollowing } from "../utils/auth/user.js";
import { formatTimeAgo } from "../utils/date.js";

export default function post(post, user = null) {
  const html = `
<div class="row mt-5 py-3 bg-light rounded">
    <div class="col">
        <div class="d-flex justify-content-between mb-1">
            <div class="d-flex">
                <div class="profile-icon-container">
                    <a href="/profile"
                    ><img
                    data-name="post_author_image"
                    data-value="${
                      post.author.avatar !== null && post.author.avatar !== ""
                        ? post.author.avatar
                        : `https://ui-avatars.com/api/?name=${post.author.name}&background=random&size=64`
                    }"
                        class="object-fit-cover rounded w-100 h-100"                        
                    /></a>
                </div>
                <div>
                    <a class="btn" href="/profile/?name=${post.author.name}"
                    ><strong data-name="post_author" data-value="${
                      post.author.name
                    }"></strong>
                    </a>
                    <span data-name="post_date" data-value="${formatTimeAgo(
                      post.created
                    )}"></span>
                </div>
            </div>
            <div>
                <button class="btn" data-action="followClicked" data-value="${
                  post.author.name
                }">${follows(post.author)}
                </button>
            </div>
        </div>       
        <p class="w-75" data-name="post_body" data-value="${post.body}"></p>
        ${mediaTag(post.media)}
        <div class="d-flex mt-3">
            <button class="me-3 btn btn-outline-secondary" data-action="reactionClicked">
                <i class="bi bi-heart"></i>
                <span data-name="post_reactions" data-value="${
                  post._count.reactions
                }"></span>
            </button>
            <button class="me-3 btn btn-outline-secondary" data-action="commentsClicked">
                <i class="bi bi-chat-left"></i>
                <span data-name="post_comments" data-value="${
                  post._count.comments
                }"></span>
            </button>           
        </div>
    </div>    
</div> 
<div class="col">
        <p>commenrts</p>
    </div>
`;

  return render(html);
}

function render(html) {
  const componentContainer = document.createElement("div");
  componentContainer.innerHTML = html;
  const data = componentContainer.querySelectorAll("[data-name]");
  data.forEach((el) => {
    const value = el.dataset.value;
    if (el.tagName === "IMG") {
      loadImage(value).then((image) => {
        el.src = value;
      });
    } else {
      el.textContent = value;
    }
  });

  const buttons = componentContainer.querySelectorAll("[data-action]");
  buttons.forEach((button) => {
    const action = button.dataset.action;
    const username = button.dataset.value;
    if (action === "followClicked") {
      button.addEventListener("click", function (e) {
        const followedEvent = new CustomEvent(
          isFollowing(!username) ? "followed" : "unfollowed",
          {
            bubbles: true,
            detail: { username: username },
          }
        );
        this.dispatchEvent(followedEvent);
      });
    }
  });

  return componentContainer;
}

function mediaExists(media) {
  return media !== null && media !== "";
}

function mediaTag(media) {
  if (mediaExists(media)) {
    return `<div class="ratio ratio-16x9 d-flex justify-content-start placeholder-glow">    
    <span class="placeholder col-12"></span>            
    <img data-name="post_media" data-value="${media}" class="object-fit-cover rounded w-100 h-100"/>
    </div>`;
  } else {
    return "";
  }
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (error) => {
      console.log(error);
      reject(new Error(error));
    };
  });
}

function follows(author) {
  const userData = JSON.parse(localStorage.getItem("profileData"));
  if (userData === null) {
    return "";
  }

  if (userData.following.some((u) => u.name === author.name)) {
    return "Unfollow";
  } else {
    return "Follow";
  }
}
