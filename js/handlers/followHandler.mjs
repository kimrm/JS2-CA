import { follow } from "../utils/API/api.js";
import { auth } from "../utils/auth/auth.js";

export default function followHandler({ target, user, following, callback }) {
  const userData = auth();
  follow(user, !following, userData).then((data) => {
    if (data.errors) {
      console.log(data.errors);
      return;
    }
    const profileData = JSON.parse(localStorage.getItem("profileData"));
    profileData.following = data.following;
    localStorage.setItem("profileData", JSON.stringify(profileData));
    callback(!following);
  });
}
