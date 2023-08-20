/* --------------------------------
- Purpose: Load Component
- Author: Hyunjung Joun
-------------------------------- */

document.addEventListener("DOMContentLoaded", (e) => {
  const newHtml = () => document.getElementById("bookmarkTemplate").innerHTML;

  const parentEls = document.getElementsByClassName("component-bookmark-add");

  for (let i = 0; i < parentEls.length; i++) {
    insert(parentEls[i], render(newHtml, {}));
  }
});
