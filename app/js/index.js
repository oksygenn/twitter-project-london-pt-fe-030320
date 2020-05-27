import API from "./API.js";
import localStorage from "./localStorage.js";
const tweetsContainer = document.querySelector(".tweets-container");

let userId;
let tweets = [];

const loadTweets = async () => {
  if (localStorage.isUserLoggedIn()) {
    userId = localStorage.getUserID();
    tweets = await API.getTweets();
    createTweet();
  } else {
    window.location.replace("./login.html");
  }
};
loadTweets();

const renderTweets = () => {};

const createTweet = () => {
  for (let obj of tweets) {
    const tweetDiv = document.createElement("div");
    tweetDiv.className = "tweet";
    tweetDiv.innerHTML = `
    <div class="tweet-header">
    <h4 class="tweet-name">${obj.userId}</h4>
    <p class="tweet-date">
    ${obj.date}</p>
  </div>
  <div class="tweet-body">
    <p class="tweet-content">${obj.content}
    </p>
    <div class="tweet-line"></div>
  </div>
  <div class="tweet-footer">
    <div class="tweet-buttons">
      <div class="like-button">
        <img src="images/heart.svg" alt="like icon" />
        <p class="like-quantity">${obj.likes}</p>
      </div>
      <div class="retweet-button">
        <img src="images/retweet.svg" alt="retweet icon" />
        <p class="retweet-quantity">${obj.retweets}</p>
      </div>
      <div class="comment-button">
        <img src="images/comment.svg" alt="comment icon" />
        <p class="comment-quantity">0</p>
      </div>
    </div>
  </div>

  <div class="tweet-comment-field hidden">
    <div class="comment-line"></div>
    <textarea
      type="text"
      cols="34"
      rows="5"
      placeholder="Leave your comment here"
    ></textarea
    ><br />
    <div class="tweet-comment-buttons">
      <img src="images/back-arrow.svg" alt="" />
      <input type="submit" value="Reply" />
    </div>
  </div>
`;
    tweetsContainer.appendChild(tweetDiv);

    const commentBtn = tweetDiv.querySelector(".comment-button");
    const commentField = tweetDiv.querySelector("div .tweet-comment-field");
    commentBtn.addEventListener("click", () => {
      commentField.classList.toggle("hidden");
    });
  }
};
