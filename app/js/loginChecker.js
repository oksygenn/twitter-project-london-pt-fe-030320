import localStorage from "./localStorage.js";

const checkIfUserLoggedIn = () => {
  if (!localStorage.isUserLoggedIn()) {
    window.location.replace("./login.html");
  }
};

export default checkIfUserLoggedIn;
