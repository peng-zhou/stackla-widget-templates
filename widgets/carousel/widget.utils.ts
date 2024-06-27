export function getTimephrase(timestamp: number) {
  if (!timestamp) {
    return "just now";
  }
  const now = Math.round(new Date().getTime() / 1000);
  const then = Math.round(timestamp);
  if (isNaN(then)) {
    return "a while ago";
  }
  const diff = now - then;
  let timeNumber = diff;
  let timeWord = "";

  if (diff >= 2592000) {
    timeNumber = Math.round(diff / 2592000);
    timeWord = "month";
  } else if (diff >= 604800) {
    timeNumber = Math.round(diff / 604800);
    timeWord = "week";
  } else if (diff >= 86400) {
    timeNumber = Math.round(diff / 86400);
    timeWord = "day";
  } else if (diff >= 3600) {
    timeNumber = Math.round(diff / 3600);
    timeWord = "hour";
  } else if (diff >= 60) {
    timeNumber = Math.round(diff / 60);
    timeWord = "minute";
  } else if (diff > 0) {
    timeNumber = diff;
    timeWord = "second";
  } else {
    return "just now";
  }

  if (timeNumber !== 1) {
    timeWord += "s";
  }
  return timeNumber + " " + timeWord + " ago";
}
