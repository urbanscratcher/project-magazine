/* --------------------------------
- Purpose: Load Component
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

loadComponents();

function loadComponents() {
  loadViewAll();
  loadNewletter();
  loadBookmark();
}

function loadBookmark(higherClass) {
  const newHtml = () => document.getElementById("bookmarkTemplate").innerHTML;
  const parentEls = document.querySelectorAll(
    `${higherClass ? higherClass : ""} .component-bookmark-add`
  );

  console.log(parentEls);
  for (const b of parentEls) {
    insert(b, render(newHtml, {}));
  }
}

function loadNewletter() {
  const newHtml = () => document.getElementById("newsletterTemplate").innerHTML;
  const parentEls = document.getElementsByClassName("component-newsletter");
  for (p of parentEls) {
    insert(p, render(newHtml, {}));
  }
}

function loadViewAll() {
  const newHtml = () => document.getElementById("viewAllTemplate").innerHTML;
  const parentEls = document.getElementsByClassName("component-viewAll");
  for (let i = 0; i < parentEls.length; i++) {
    insert(parentEls[i], render(newHtml, {}));
  }
}
