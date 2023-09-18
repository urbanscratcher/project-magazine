/* --------------------------------
- Purpose: Load Reusable UI Components
- Author: Hyunjung Joun
-------------------------------- */
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

  for (const b of parentEls) {
    insert(b, render(newHtml, {}));
  }
}

function loadNewletter() {
  // render newsletter form
  const newHtml = () => document.getElementById("newsletterTemplate").innerHTML;
  const parentEls = document.getElementsByClassName("component-newsletter");
  for (p of parentEls) {
    insert(p, render(newHtml, {}));
  }

  // add submit event to all newsletter forms
  const forms = document.querySelectorAll(".newsletter__form");
  forms.forEach((el) => el.addEventListener("submit", submitNewsletterHandler));
}

function loadViewAll() {
  loadViewAllByClass("component-viewAll-insights", "/insights");
  loadViewAllByClass("component-viewAll-saved", "/saved");
  loadViewAllByClass("component-viewAll-authors", "/authors");
}

function viewAllHtml(path) {
  return `<button
  class="viewAll row gap--s hover--lighter"
  onclick="navigateTo('${path}'); return false;"
>
  <p class="viewAll__txt ts--btn">view all</p>
  <i class="fa-solid fa-chevron-right ts--body-s"></i>
</button>`;
}

function loadViewAllByClass(className, path) {
  const els = document.getElementsByClassName(className);
  if (els.length > 0) {
    for (let i = 0; i < els.length; i++) {
      insert(
        els[i],
        render(() => viewAllHtml(path), {})
      );
    }
  }
}
