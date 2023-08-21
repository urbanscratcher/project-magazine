/* --------------------------------
- Purpose: Load Component
- Author: Hyunjung Joun
-------------------------------- */

loadComponents();

function loadComponents() {
  loadNewletter();
  loadViewAll();
}

function loadBookmark() {
  const newHtml = () => document.getElementById("bookmarkTemplate").innerHTML;
  const parentEls = document.getElementsByClassName("component-bookmark-add");
  for (let i = 0; i < parentEls.length; i++) {
    insert(parentEls[i], render(newHtml, {}));
  }
}

function loadNewletter() {
  const newHtml = () => document.getElementById("newsletterTemplate").innerHTML;
  const parentEls = document.getElementsByClassName("component-newsletter");
  for (p of parentEls) {
    insertFirstChild(p, render(newHtml, {}));
  }
}

function loadViewAll() {
  const newHtml = () => document.getElementById("viewAllTemplate").innerHTML;
  const parentEls = document.getElementsByClassName("component-viewAll");
  for (let i = 0; i < parentEls.length; i++) {
    insert(parentEls[i], render(newHtml, {}));
  }
}
