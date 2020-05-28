const API_ENDPOINT = "http://localhost:3000";
const USERS_URL = `${API_ENDPOINT}/users`;
const TWEETS_URL = `${API_ENDPOINT}/tweets?_expand=user&_embed=comments`;

const getTweets = async () => fetch(TWEETS_URL).then((res) => res.json());
const getUsers = async () => fetch(USERS_URL).then((res) => res.json());

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
    }),
  };

  return fetch(`${API_ENDPOINT}/comments`, configObject);
};

export default {
  getTweets,
  getUsers,
  postComment,
};
