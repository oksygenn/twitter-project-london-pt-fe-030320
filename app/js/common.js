import API from "./API.js";

export const setUpCounters = (tweetDiv) => {
  const buttons = tweetDiv.querySelectorAll(".counter-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const quantity = button.querySelector(".quantity");

      if (button.classList.contains("filled")) {
        quantity.innerText = parseInt(quantity.innerText) - 1;
        toggling(quantity, "purple");
      } else {
        quantity.innerText = parseInt(quantity.innerText) + 1;
        toggling(quantity, "purple");
      }
      toggling(button, "filled");
    });
  });
};

export const toggling = (elem, classToToggle) => {
  elem.classList.toggle(classToToggle);
};

export const setUpReply = (tweetDiv, obj, commentQuantityDiv, userId) => {
  const commentBtn = tweetDiv.querySelector(".comment-button");
  const commentField = tweetDiv.querySelector("div .tweet-comment-field");
  commentBtn.addEventListener("click", () => {
    toggling(commentField, "hidden");
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
        toggling(commentField, "hidden");
        commentQuantityDiv.innerText =
          parseInt(commentQuantityDiv.innerText) + 1;
      } catch {
        alert("Oops! Tweet failed to post :( Please try again");
      }
    }
  });
};
