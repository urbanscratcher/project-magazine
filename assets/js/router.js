/* --------------------------------
- Purpose: Routing
- Author: Hyunjung Joun
-------------------------------- */
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
];

// After the DOM tree loaded
document.addEventListener("DOMContentLoaded", () => {
  const initialRoute = window.location.pathname;
  handleRouteChange(initialRoute);
});

function handleRouteChange(route) {
  history.pushState(null, null, route);

  // Remove external obj for reset
  if (document.getElementById("external")) {
    document
      .getElementById("external")
      .parentNode.removeChild(document.getElementById("external"));
  }

  // Remove scripts for reset
  unloadScript("/assets/js/insights.js");
  unloadScript("/assets/js/topics.js");
  unloadScript("/assets/js/saved.js");
  unloadScript("/assets/js/awards.js");
  unloadScript("/assets/js/authors.js");
  unloadScript("/assets/js/videos.js");
  unloadScript("/assets/js/components.js");

  // (re)create external obj for reset
  const createDoc = document.createElement("object");
  createDoc.id = "external";
  document.body.appendChild(createDoc);
  let externalEl = document.getElementById("external");

  // (re)load html & js by routes for reset
  switch (route) {
    case "/":
      externalEl.setAttribute("data", "main.html");
      externalEl.addEventListener("load", (e) =>
        loadHtmlHandler(e, loadScriptsForMain)
      );
      break;
    case "/insight":
      externalEl.setAttribute("data", "insight.html");
      externalEl.addEventListener("load", loadHtmlHandler);
      break;
    default:
      break;
  }
}

function loadScriptsForMain() {
  const mains = mainScriptList.map((el) => `/assets/js/main/${el}.js`);

  for (const m of mains) {
    loadScript(m, true);
  }

  const topics = loadScript("/assets/js/topics.js", true);
  const components = loadScript("/assets/js/components.js", true);
}

function loadHtmlHandler(e, loadJsFn) {
  const externalEl = e.target;
  const mainEl = document.getElementById("main");
  const mainDocument = externalEl.contentDocument;

  mainDocument.body.style.display = "none";
  const mEl = mainDocument.body;
  mainEl.innerHTML = mEl.innerHTML;

  if (loadJsFn) {
    loadJsFn();
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
