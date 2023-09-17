/* --------------------------------
- Purpose: Load Reusable UI Components
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
  const templateEl = document.getElementById("viewAllTemplate");

  const newHtml = (path) => `<button
  class="viewAll row gap--s hover--lighter"
  onclick="navigateTo('${path}'); return false;"
>
  <p class="viewAll__txt ts--btn">view all</p>
  <i class="fa-solid fa-chevron-right ts--body-s"></i>
</button>`;

  const parentEls = document.getElementsByClassName(
    "component-viewAll-insights"
  );

  const parentSavedEls = document.getElementsByClassName(
    "component-viewAll-saved"
  );

  const parentAuthorsEls = document.getElementsByClassName(
    "component-viewAll-authors"
  );

  const parentRelatedEls = document.getElementsByClassName(
    "component-viewAll-related"
  );

  if (parentEls.length > 0) {
    for (let i = 0; i < parentEls.length; i++) {
      insert(
        parentEls[i],
        render(() => newHtml("/insights"), {})
      );
    }
  }

  if (parentSavedEls.length > 0) {
    for (let i = 0; i < parentSavedEls.length; i++) {
      insert(
        parentSavedEls[i],
        render(() => newHtml("/"), {})
      );
    }
  }

  if (parentAuthorsEls.length > 0) {
    for (let i = 0; i < parentAuthorsEls.length; i++) {
      insert(
        parentAuthorsEls[i],
        render(() => newHtml("/"), {})
      );
    }
  }
}
