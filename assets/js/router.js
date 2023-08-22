/* --------------------------------
- Purpose: Routing
- Author: Hyunjung Joun
-------------------------------- */
const commonScriptList = ["topics", "components"].map(
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
].map((el) => `/assets/js/main/${el}.js`);

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
  const scriptList = [...commonScriptList, ...mainScriptList];
  for (m of scriptList) {
    unloadScript(m);
  }

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
        loadHtmlHandler(e, [...commonScriptList, ...mainScriptList])
      );
      break;
    case "/insights":
      externalEl.setAttribute("data", "insights.html");
      externalEl.addEventListener("load", (e) =>
        loadHtmlHandler(e, [...commonScriptList])
      );
      break;
    default:
      break;
  }
}

function loadScripts(list) {
  for (const m of list) {
    loadScript(m, true);
  }
}

function loadHtmlHandler(e, list) {
  const externalEl = e.target;
  const mainEl = document.getElementById("main");
  const mainDocument = externalEl.contentDocument;

  mainDocument.body.style.display = "none";
  const mEl = mainDocument.body;
  mainEl.innerHTML = mEl.innerHTML;

  if (list && list.length > 0) {
    loadScripts(list);
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
