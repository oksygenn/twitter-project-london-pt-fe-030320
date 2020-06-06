import API from "./API.js";
import localStorage from "./localStorage.js";
import checkIfUserLoggedIn from "./loginChecker.js";
import { setUpCounters, toggling, setUpReply } from "./common.js";

checkIfUserLoggedIn();

const tweetsContainer = document.querySelector(".tweets-container");

const userId = localStorage.getUserID();
let tweets = [];

const loadTweets = async () => {
  tweets = await API.getTweets();
  tweets = tweets.reverse();
  createTweetDiv();
};

const createTweetDiv = () => {
  for (let obj of tweets) {
    const template = document.querySelector(".tweet");
    const tweetDiv = template.cloneNode(true);
    tweetDiv.classList.remove("template");
    tweetDiv.querySelector(".tweet-name").innerHTML = obj.user.name;
    tweetDiv.querySelector(".tweet-date").innerHTML = obj.date;
    const tweetContentDiv = tweetDiv.querySelector(".tweet-content");
    tweetContentDiv.innerHTML = obj.content;
    tweetDiv.querySelector(".like-quantity").innerHTML = obj.likes || 0;
    tweetDiv.querySelector(".retweet-quantity").innerHTML = obj.retweets || 0;
    const commentQuantityDiv = tweetDiv.querySelector(".comment-quantity");
    commentQuantityDiv.innerHTML = obj.comments.length;

    tweetsContainer.appendChild(tweetDiv);

    setUpReply(tweetDiv, obj, commentQuantityDiv, userId);
    setUpCounters(tweetDiv);

    tweetContentDiv.addEventListener("click", () => {
      window.location.replace(`./comments.html?id=${obj.id}`);
    });
  }
};

const setUserName = async () => {
  let users = await API.getUsers();
  const userNameDiv = document.querySelector(".user-full-name");
  const name = document.createElement("h3");
  name.className = "full-name";
  const user = users.find((user) => user.id === userId);
  name.innerHTML = `${user.name}`;
  userNameDiv.appendChild(name);

  const userImg = document.querySelector(".user-pic");
  userImg.src = user.avatar_url;
};

const setUpNewTweet = () => {
  const newTweetBtn = document.querySelector(".new-tweet-icon");
  newTweetBtn.addEventListener("click", () => {
    window.location.replace("./new_tweet.html");
  });
};

const setupImageUpload = () => {
  const avatarImg = document.querySelector(".user-pic");
  const input = document.querySelector("input[type=file]");
  avatarImg.addEventListener("click", () => {
    input.click();
  });
  input.addEventListener("change", () => {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload;
    reader.onload = (function (aImg) {
      return function (e) {
        avatarImg.src = e.target.result;
      };
    })(file);
    reader.readAsDataURL(file);
  });
};

loadTweets();
setUserName();
setUpNewTweet();
setupImageUpload();
