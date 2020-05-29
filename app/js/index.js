import API from "./API.js";
import localStorage from "./localStorage.js";
const tweetsContainer = document.querySelector(".tweets-container");

const userId = localStorage.getUserID();
let tweets = [];

const loadTweets = async () => {
  if (localStorage.isUserLoggedIn()) {
    tweets = await API.getTweets();
    createTweetDiv();
  } else {
    window.location.replace("./login.html");
  }
};

const createTweetDiv = () => {
  for (let obj of tweets) {
    const template = document.querySelector(".tweet");
    const tweetDiv = template.cloneNode(true);
    tweetDiv.classList.remove("template");
    tweetDiv.querySelector(".tweet-name").innerHTML = obj.user.name;
    tweetDiv.querySelector(".tweet-date").innerHTML = obj.date;
    tweetDiv.querySelector(".tweet-content").innerHTML = obj.content;
    tweetDiv.querySelector(".like-quantity").innerHTML = obj.likes;
    tweetDiv.querySelector(".retweet-quantity").innerHTML = obj.retweets;
    const commentQuantityDiv = tweetDiv.querySelector(".comment-quantity");
    commentQuantityDiv.innerHTML = obj.comments.length;

    tweetsContainer.appendChild(tweetDiv);

    const commentBtn = tweetDiv.querySelector(".comment-button");
    const commentField = tweetDiv.querySelector("div .tweet-comment-field");
    commentBtn.addEventListener("click", () => {
      commentField.classList.toggle("hidden");
    });

    const commentBody = tweetDiv.querySelector(".comment-body");
    const replyButton = tweetDiv.querySelector(".reply-to-tweet");

    replyButton.addEventListener("click", async () => {
      if (commentBody.value === "") {
        return;
      } else {
        try {
          await API.postComment(userId, obj.id, commentBody.value);
          commentBody.value = "";
          commentField.classList.toggle("hidden");
          commentQuantityDiv.innerText =
            parseInt(commentQuantityDiv.innerText) + 1;
        } catch {
          /*reject*/
        }
      }
    });

    setUpCounters(tweetDiv);
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
};

const setUpCounters = (tweetDiv) => {
  const buttons = tweetDiv.querySelectorAll(".counter-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const quantity = button.querySelector(".quantity");

      if (button.classList.contains("filled")) {
        quantity.innerText = parseInt(quantity.innerText) - 1;
      } else {
        quantity.innerText = parseInt(quantity.innerText) + 1;
      }
      button.classList.toggle("filled");
    });
  });
};

loadTweets();
setUserName();
