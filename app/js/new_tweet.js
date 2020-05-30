import API from "./API.js";
import localStorage from "./localStorage.js";

const userId = localStorage.getUserID();
const tweetButton = document.querySelector(".tweet-btn");
const tweetText = document.querySelector("textarea.new-tweet-text");

const createNewTweet = () => {
  tweetButton.addEventListener("click", async () => {
    if (tweetText.value === "") {
      return;
    } else {
      try {
        await API.postTweet(userId, tweetText.value);
        window.location.replace("./index.html");
      } catch {
        alert("Sorry, your tweet failed to post... Please try again later");
      }
    }
  });
};

createNewTweet();
