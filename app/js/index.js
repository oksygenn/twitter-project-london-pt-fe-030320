import API from "./API.js";
import localStorage from "./localStorage.js";

let userId;
let tweets = [];

const loadTweets = async () => {
  if (localStorage.isUserLoggedIn()) {
    userId = localStorage.getUserID();
    tweets = await API.getTweets();
  } else {
    window.location.replace("./login.html");
  }
};
loadTweets();

const tweet = () => {};
