const API_ENDPOINT = "http://localhost:3000";
const USERS_URL = `${API_ENDPOINT}/users`;
const TWEETS_URL = `${API_ENDPOINT}/tweets?_expand=user&_embed=comments`;

const getTweets = async () => fetch(TWEETS_URL).then((res) => res.json());
const getUsers = async () => fetch(USERS_URL).then((res) => res.json());

export default {
  getTweets,
  getUsers,
};
