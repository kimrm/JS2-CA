import { react } from "../utils/API/api.js";

export default function followHandler(postId, reaction, callback) {
  react(postId, reaction, {
    accessToken: JSON.parse(localStorage.getItem("userData")).accessToken,
  }).then((data) => {
    callback(data);
  });
}
