import { getPostData } from "../utils/form/formData.js";
import { createPost } from "../utils/API/api.js";

export default function createPostHandler(e) {
  e.preventDefault();

  const form = e.target;
  const formData = getPostData(form);
  console.log(formData);
  createPost(formData, {
    accessToken: JSON.parse(localStorage.getItem("userData")).accessToken,
  }).then((data) => {
    console.log(data);
  });
}
