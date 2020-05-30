const API_ENDPOINT = "http://localhost:3000";
const USERS_URL = `${API_ENDPOINT}/users`;
const TWEETS_URL = `${API_ENDPOINT}/tweets?_expand=user&_embed=comments`;

const getTweets = async () => fetch(TWEETS_URL).then((res) => res.json());
const getUsers = async () => fetch(USERS_URL).then((res) => res.json());

const formattedDate = () => {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yy = date.getFullYear();

  return `${dd}/${mm}/${yy}`;
};

const postComment = async (userID, tweetID, newComment) => {
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId: userID,
      tweetId: tweetID,
      content: newComment,
      date: formattedDate(),
    }),
  };

  return fetch(`${API_ENDPOINT}/comments`, configObject);
};

const postTweet = async (userId, newTweet) => {
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      content: newTweet,
      date: formattedDate(),
      likes: 0,
      retweets: 0,
    }),
  };
  return fetch(`${API_ENDPOINT}/tweets`, configObject);
};

export default {
  getTweets,
  getUsers,
  postComment,
  postTweet,
};
