/* --------------------------------
- Purpose: Routing
- Author: Hyunjung Joun
-------------------------------- */
// Declare global variable
let curTopic;
let curIsLatest;
let fontSizePercentage = 62.5;
let isGrayscale = false;

// Lists of scripts for each page to be loaded
const commonScripts = ["topics", "components", "navbar"].map(
  (el) => `/assets/js/${el}.js`
);
const mainScripts = [
  "insights-trending",
  "insights-cover",
  "insights-editorsPick",
  "insights-latest",
  "awards",
  "authors-featured",
  "videos",
  "inspirations",
  "add-bookmark",
  "saved-main",
].map((el) => completeBindingPath(el));
const insightScripts = ["insights-article"].map((el) =>
  completeBindingPath(el)
);
const insightListScripts = [
  "topics-sidebar",
  "insights-trending",
  "inspirations",
].map((el) => completeBindingPath(el));
const authorListScripts = ["authors", "insights-trending", "inspirations"].map(
  (el) => completeBindingPath(el)
);
const authorScripts = ["authors-featured"].map((el) => completeBindingPath(el));
const savedScripts = ["saved", "insights-trending", "inspirations"].map((el) =>
  completeBindingPath(el)
);

function completeBindingPath(fileName) {
  return `/assets/js/binding/${fileName}.js`;
}

// When going backward and forward from history, router will work
window.addEventListener("popstate", (e) => {
  const route = window.location.pathname;

  // to change only a part of the insights page
  if (route === "/insights" && curTopic) {
    clearInsightsList();
    renderSortedInsights(e.state.selectedTopic, e.state.selectedSort);
    renderCurrentTopic(e.state.selectedTopic);
  } else if (route === "/insights" && !curTopic) {
    loadPreviousListPage(e.state.selectedTopic, e.state.selectedSort);
  } else {
    handleRouteChange(route);
  }
  window.scrollTo(0, 0);
});

// After the DOM tree loaded, router will work
document.addEventListener("DOMContentLoaded", () => {
  handleRouteChange(window.location.pathname);
  window.scrollTo(0, 0);
});

// Go to the route
function navigateTo(route) {
  handleRouteChange(route);
  window.scrollTo(0, 0);
}

// When the route changes
function handleRouteChange(route) {
  // Remove event listeners
  removeEventListeners();

  // Remove external obj for reset
  let externalEl = document.getElementById("external");
  if (externalEl) {
    externalEl.parentNode.removeChild(externalEl);
  }

  // Remove scripts for reset
  const scriptList = [...commonScripts, ...mainScripts];
  for (m of scriptList) {
    unloadScript(m);
  }

  // (re)create external obj for reset
  const createDoc = document.createElement("object");
  createDoc.id = "external";
  document.body.appendChild(createDoc);
  externalEl = document.getElementById("external");

  // initialize styles
  const footerEl = document.querySelector("#footer");
  footer.style.position = "";
  footer.style.top = "";
  footer.style.zIndex = "";
  curTopic = undefined;
  curIsLatest = undefined;
  const iconSaved = document.querySelector(".icon__saved");
  const iconAccess = document.querySelector(".icon__access");
  iconSaved.classList.remove("fa-solid");
  iconAccess.classList.remove("fa-solid");

  const menuItemEls = document.querySelectorAll(".menu__item");
  menuItemEls.forEach((el) => el.classList.remove("menu__item--current"));

  // routing
  const routes = route.split("/");

  // Error : /error
  if (route === "/error") {
    externalEl.setAttribute("data", "/error.html");
    externalEl.addEventListener("load", (e) => {
      loadHtmlHandler([...commonScripts], true);
    });

    history.pushState(null, null, route);
    return;
  }

  // Saved For Later List : /saved
  if (routes.length === 2 && routes[1] === "saved") {
    externalEl.setAttribute("data", "/saved.html");
    externalEl.addEventListener("load", (e) => {
      loadHtmlHandler([...savedScripts, ...commonScripts], true);

      const iconSaved = document.querySelector(".icon__saved");
      iconSaved.classList.add("fa-solid");
    });

    history.pushState(null, null, route);
    return;
  }

  // One author : /authors/1
  if (routes.length === 3 && routes[1] === "authors") {
    externalEl.setAttribute("data", "/author.html");
    externalEl.addEventListener("load", (e) => {
      loadHtmlHandler([...authorScripts, ...commonScripts], true);

      // after loading the script, data will be rendered from the callback function
      loadScript(completeBindingPath("author"), true, () => {
        const authorId = +routes[2];
        renderAuthor(authorId);
      });

      menuItemEls[2].classList.add("menu__item--current");
    });

    history.pushState(null, null, route);
    return;
  }

  // List of Authors : /authors
  if (routes.length === 2 && routes[1] === "authors") {
    externalEl.setAttribute("data", "/authors.html");
    externalEl.addEventListener("load", (e) => {
      loadHtmlHandler([...authorListScripts, ...commonScripts], true);
      menuItemEls[2].classList.add("menu__item--current");
    });
    history.pushState(null, null, route);
    return;
  }

  // One article : /insights/1
  if (routes.length === 3 && routes[1] === "insights") {
    externalEl.setAttribute("data", "/insight.html");
    externalEl.addEventListener("load", (e) => {
      loadHtmlHandler([...commonScripts], true);

      // after loading the script, data will be rendered from the callback function
      insightScripts.forEach((el) => {
        loadScript(el, true, () => {
          const articleId = +routes[2];
          renderArticle(articleId);
        });
      });

      menuItemEls[0].classList.add("menu__item--current");
    });

    history.pushState(null, null, route);
    return;
  }

  // List of articles : /insights?topic=all&page=1
  if (
    routes.length === 2 &&
    routes[1].match("^insights$|^insights\\?topic=*")
  ) {
    curTopic = routes[1].match("^insights\\?topic=*")
      ? routes[1].split("?")[1].split("=")[1]
      : "all";
    curIsLatest = true;

    externalEl.setAttribute("data", "/insights.html");
    externalEl.addEventListener("load", (e) => {
      loadHtmlHandler([...insightListScripts, ...commonScripts], true);
      loadScript("/assets/js/binding/insights-list.js", true, () => {
        renderArticlesByTopic(curTopic, curIsLatest);
      });

      menuItemEls[0].classList.add("menu__item--current");

      history.pushState(
        { selectedTopic: curTopic, selectedSort: curIsLatest },
        null,
        route
      );
    });
    return;
  }

  // Default & Main : /
  if (routes.length === 2 && (routes[1] === "/" || routes[1] === "")) {
    externalEl.setAttribute("data", "/main.html");
    externalEl.addEventListener("load", (e) => {
      loadHtmlHandler([...mainScripts, ...commonScripts], true);
    });

    history.pushState(null, null, route);
    return;
  }
}

function loadPreviousListPage(previousTopic, previousSort) {
  // Remove external obj for reset
  let externalEl = document.getElementById("external");
  if (externalEl) {
    externalEl.parentNode.removeChild(externalEl);
  }

  // Remove scripts for reset
  const scriptList = [...commonScripts, ...mainScripts];
  for (m of scriptList) {
    unloadScript(m);
  }

  // (re)create external obj for reset
  const createDoc = document.createElement("object");
  createDoc.id = "external";
  document.body.appendChild(createDoc);
  externalEl = document.getElementById("external");

  // initialize
  const footerEl = document.querySelector("#footer");
  footer.style.position = "";
  footer.style.top = "";
  footer.style.zIndex = "";

  externalEl = document.getElementById("external");
  externalEl.setAttribute("data", "/insights.html");
  externalEl.addEventListener("load", (e) => {
    loadHtmlHandler([...insightListScripts, ...commonScripts], true);
    loadScript("/assets/js/binding/insights-list.js", true, () => {
      renderArticlesByTopic(previousTopic, previousSort);
    });
  });
}

function loadHtmlHandler(list, isAsync = false, callback) {
  const externalEl = document.getElementById("external");
  const mainEl = document.getElementById("main");

  const externalDoc = externalEl.contentDocument;

  externalDoc.body.style.display = "none";
  mainEl.innerHTML = externalDoc.body.innerHTML;

  if (list && list.length > 0) {
    loadScripts(list, isAsync, callback);
  }

  externalEl.removeEventListener("load", loadHtmlHandler);
}

function loadScripts(list, isAsync = false, callback) {
  for (const m of list) {
    loadScript(m, isAsync, callback);
  }
}

function loadScript(scriptSrc, isAsync = false, callback) {
  const script = document.createElement("script");
  script.src = scriptSrc;

  if (isAsync) {
    script.async = true;
  } else {
    script.async = false;
    script.defer = true;
  }

  if (callback) {
    script.onload = callback;
  }

  document.head.appendChild(script);

  return script;
}

function unloadScript(scriptSrc) {
  const scriptElements = document.querySelectorAll(
    `script[src="${scriptSrc}"]`
  );
  scriptElements.forEach((script) => {
    script.parentNode.removeChild(script);
  });
}

function removeEventListeners() {
  console.log("removing event listners");

  // remove saved button styling event
  const btnSaved = document.querySelector(".btn__saved");
  btnSaved.removeEventListener("mouseenter", hoverSavedBtnHandler);
  btnSaved.removeEventListener("mouseleave", leaveSavedBtnHandler);

  // remove accessibility event
  const btnAccess = document.querySelector(".btn__access");
  btnAccess.removeEventListener("click", accessibilityHandler);
}
