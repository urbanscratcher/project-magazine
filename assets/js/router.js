/* --------------------------------
- Purpose: Routing
- Author: Hyunjung Joun
-------------------------------- */
const commonScriptList = ["topics", "components", "insights-article"].map(
  (el) => `/assets/js/${el}.js`
);
const mainScriptList = [
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

// when go backward and forward
window.addEventListener("popstate", (e) => {
  handleRouteChange(window.location.pathname);
});

// After the DOM tree loaded
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
  const scriptList = [...commonScriptList, ...mainScriptList];
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

  // (re)load html & js by routes for reset
  if (route === "/") {
    externalEl.setAttribute("data", "/main.html");
    externalEl.addEventListener("load", (e) =>
      loadHtmlHandler([...mainScriptList, ...commonScriptList])
    );
    return;
  }

  const routes = route.split("/");

  if (routes.length === 3 && routes[1] === "insights") {
    externalEl.setAttribute("data", "/insight.html");
    externalEl.addEventListener("load", (e) => {
      loadHtmlHandler([...commonScriptList]);
      renderArticle(+routes[2]);
    });
    return;
  }

  if (routes.length === 2 && routes[1] === "insights") {
    externalEl.setAttribute("data", "/insights.html");
    return;
  }
}

function loadScripts(list, isAsync = false) {
  for (const m of list) {
    loadScript(m, isAsync);
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
