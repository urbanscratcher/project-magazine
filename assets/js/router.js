/* --------------------------------
- Purpose: Routing
- Author: Hyunjung Joun
-------------------------------- */
// Declare global variable
let curTopic;
let curIsLatest;

// Lists of scripts for each page to be loaded
const commonScripts = ["topics", "components"].map(
  (el) => `/assets/js/${el}.js`
);
const mainScripts = [
  "insights-trending",
  "insights-cover",
  "insights-editorsPick",
  "insights-latest",
  "saved",
  "awards",
  "authors",
  "videos",
  "inspirations",
].map((el) => `/assets/js/binding/${el}.js`);
const insightScripts = ["insights-article"].map(
  (el) => `/assets/js/binding/${el}.js`
);
const insightListScripts = [
  "topics-sidebar",
  "insights-trending",
  "inspirations",
].map((el) => `/assets/js/binding/${el}.js`);

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
  curTopic = undefined;
  curIsLatest = undefined;

  // One article : /insights/1
  const routes = route.split("/");
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

      history.pushState(
        { selectedTopic: curTopic, selectedSort: curIsLatest },
        null,
        route
      );
    });

    return;
  }

  // Default & Main : /
  history.pushState(null, null, route);
  externalEl.setAttribute("data", "/main.html");
  externalEl.addEventListener("load", (e) =>
    loadHtmlHandler([...mainScripts, ...commonScripts], true)
  );

  return;
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

function loadHtmlHandler(list, isAsync = false) {
  const externalEl = document.getElementById("external");
  const mainEl = document.getElementById("main");

  const externalDoc = externalEl.contentDocument;

  externalDoc.body.style.display = "none";
  mainEl.innerHTML = externalDoc.body.innerHTML;

  if (list && list.length > 0) {
    loadScripts(list, isAsync);
  }

  externalEl.removeEventListener("load", loadHtmlHandler);
}

function loadScripts(list, isAsync = false) {
  for (const m of list) {
    loadScript(m, isAsync);
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
