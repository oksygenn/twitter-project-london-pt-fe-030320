const localStorage = window.localStorage;
const userIDKey = "userID";

const getUserID = () => {
  return parseInt(localStorage.getItem(userIDKey));
};

const setUserID = (userId) => {
  localStorage.setItem(userIDKey, userId);
};

const clearUserID = () => {
  localStorage.removeItem(userIDKey);
};

const isUserLoggedIn = () => {
  const userId = getUserID();
  if (userId >= 0) {
    return true;
  } else {
    return false;
  }
};

export default {
  getUserID,
  setUserID,
  clearUserID,
  isUserLoggedIn,
};
