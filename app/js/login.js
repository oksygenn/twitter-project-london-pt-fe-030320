import API from "./API.js";
import localStorage from "./localStorage.js";

const inputForm = document.querySelector(".login-form");
const userName = document.querySelector(".username");

const Q = () => {
  inputForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let users = await API.getUsers();

    let user = users.find((obj) => obj.name === userName.value);
    if (user) {
      localStorage.setUserID(user.id);
      window.location.replace("./index.html");
    } else {
      alert("User not found!");
    }
  });
};

Q();
