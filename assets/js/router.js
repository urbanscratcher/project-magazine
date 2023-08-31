/* --------------------------------
- Purpose: Routing
- Author: Hyunjung Joun
-------------------------------- */

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
const insightListScripts = ["insights-list"].map(
  (el) => `/assets/js/binding/${el}.js`
);

// When going backward and forward from history, router will work
window.addEventListener("popstate", (e) => {
  handleRouteChange(window.location.pathname);
});

// After the DOM tree loaded, router will work
document.addEventListener("DOMContentLoaded", () => {
  handleRouteChange(window.location.pathname);
});

// Go to the route
function navigateTo(route) {
  history.pushState(null, null, route);
  handleRouteChange(route);
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

  // initialize styling
  const footerEl = document.querySelector("#footer");
  footer.style.position = "";
  footer.style.top = "";
  footer.style.zIndex = "";

  // (re)load html & js by routes for reset
  // Main : /
  if (route === "/") {
    externalEl.setAttribute("data", "/main.html");
    externalEl.addEventListener("load", (e) =>
      loadHtmlHandler([...mainScripts, ...commonScripts], true)
    );
    window.scrollTo(0, 0);
    return;
  }

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
    window.scrollTo(0, 0);
    return;
  }

  // List of articles : /insights?topic=all&page=1
  if (routes.length === 2 && routes[1] === "insights") {
    externalEl.setAttribute("data", "/insights.html");
    externalEl.addEventListener("load", (e) => {
      loadHtmlHandler([...commonScripts, ...insightListScripts], true);
    });

    window.scrollTo(0, 0);
    return;
  }
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
