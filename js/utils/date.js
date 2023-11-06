export function timeAgo(timestamp) {
  const timeNow = new Date();
  const timePosted = new Date(timestamp);
  const timeDifferenceInSeconds = Math.floor((timeNow - timePosted) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds} sec${
      timeDifferenceInSeconds !== 1 ? "s" : ""
    } ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
}
