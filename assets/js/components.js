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
  // render newsletter form
  const newHtml = () => document.getElementById("newsletterTemplate").innerHTML;
  const parentEls = document.getElementsByClassName("component-newsletter");
  for (p of parentEls) {
    insert(p, render(newHtml, {}));
  }

  // submit event (main)
  function submitHandler(e) {
    e.preventDefault();

    const name = e.target.children[0].children[0].value;
    const email = e.target.children[0].children[1].value;
    const isConsent = e.target.children[1].children[0].checked;

    if (name && email) {
      if (isConsent) {
        alert(
          `${name}, you successfully subscribed :)\nOur weekly newsletter will be sent to your email - ${email}`
        );
      } else {
        alert(`You need to agree to our terms and privacy policy.`);
      }
    } else {
      alert(`Please enter your name and email.`);
    }
  }
  const forms = document.querySelectorAll(".newsletter__form");
  forms.forEach((el) => el.addEventListener("submit", (e) => submitHandler(e)));
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

function loadViewAll() {
  loadViewAllByClass("component-viewAll-insights", "/insights");
  loadViewAllByClass("component-viewAll-saved", "/");
  loadViewAllByClass("component-viewAll-authors", "/authors");
}
