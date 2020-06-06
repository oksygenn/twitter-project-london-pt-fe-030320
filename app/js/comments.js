import API from "./API.js";
import localStorage from "./localStorage.js";
import checkIfUserLoggedIn from "./loginChecker.js";
import { setUpCounters, setUpReply } from "./common.js";

checkIfUserLoggedIn();

const userId = localStorage.getUserID();
let tweet;
let comments;

const goBackToIndex = () => {
  window.location.replace("./index.html");
};

const loadTweet = async () => {
  const params = new URLSearchParams(document.location.search);
  const tweetID = params.get("id");
  if (tweetID === null) {
    goBackToIndex();
    return;
  }
  try {
    tweet = await API.getTweet(tweetID);
    comments = await API.getCommentsForTweet(tweetID);
  } catch {
    goBackToIndex();
    return;
  }
  populateTweetDiv();
  populateComments();
};

loadTweet();

const populateTweetDiv = () => {
  document.querySelector(".user-full-name").innerHTML = tweet.user.name;
  document.querySelector(".user-pic").src = tweet.user.avatar_url;
  document.querySelector(".tweet-content").innerHTML = tweet.content;
  document.querySelector(".like-quantity").innerHTML = tweet.likes || 0;
  document.querySelector(".retweet-quantity").innerHTML = tweet.retweets || 0;
  const commentQuantityDiv = document.querySelector(".comment-quantity");
  commentQuantityDiv.innerHTML = tweet.comments.length;

  setUpCounters(document);
  setUpReply(document, tweet, commentQuantityDiv, userId);
};

const populateComments = () => {
  const containerDiv = document.querySelector(".comments-wrapper");
  for (const comment of comments) {
    const template = containerDiv.querySelector(".comment");
    const commentDiv = template.cloneNode(true);
    commentDiv.classList.remove("template");
    containerDiv.appendChild(commentDiv);

    commentDiv.querySelector(".user-pic").src = comment.user.avatar_url;
    commentDiv.querySelector(".comment-user-name").innerHTML =
      comment.user.name;
    commentDiv.querySelector(".comment-text").innerHTML = comment.content;
  }
};
