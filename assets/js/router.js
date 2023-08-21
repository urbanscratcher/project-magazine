/* --------------------------------
- Purpose: Routing
- Author: Hyunjung Joun
-------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const initialRoute = window.location.pathname;
  handleRouteChange(initialRoute);
});

function handleRouteChange(route) {
  history.pushState(null, null, route);

  // remove external obj
  if (document.getElementById("external")) {
    document
      .getElementById("external")
      .parentNode.removeChild(document.getElementById("external"));
  }

  unloadScript("/assets/js/insights.js");
  unloadScript("/assets/js/topics.js");
  unloadScript("/assets/js/saved.js");
  unloadScript("/assets/js/awards.js");
  unloadScript("/assets/js/authors.js");
  unloadScript("/assets/js/videos.js");
  unloadScript("/assets/js/components.js");

  // (re)create external obj
  const createDoc = document.createElement("object");
  createDoc.id = "external";
  document.body.appendChild(createDoc);
  let externalEl = document.getElementById("external");

  // (re)load html & js

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
      console.log("aaaa");
      break;
  }
}

function loadScriptsForMain() {
  const insights = loadScript("/assets/js/insights.js", null, "defer");
  const topics = loadScript("/assets/js/topics.js", null, "defer");
  const saved = loadScript("/assets/js/saved.js", null, "defer");
  const awards = loadScript("/assets/js/awards.js", null, "defer");
  const authors = loadScript("/assets/js/authors.js", null, "defer");
  const videos = loadScript("/assets/js/videos.js", null, "defer");
  const components = loadScript("/assets/js/components.js", null, "async");
}

function observeLoadChildren(targetEl, fn) {
  const observer = new MutationObserver(function (mutationsList) {
    for (let m of mutationsList) {
      if (m.type === "childList") {
        fn();
      }
    }
  });
  observer.observe(targetEl, { childList: true });
}

function loadHtmlHandler(e, fn) {
  const externalEl = e.target;
  const mainEl = document.getElementById("main");
  const mainDocument = externalEl.contentDocument;

  mainDocument.body.style.display = "none";
  const mEl = mainDocument.body;
  mainEl.innerHTML = mEl.innerHTML;

  if (fn) {
    fn();
  }

  externalEl.removeEventListener("load", loadHtmlHandler);
}

function loadScript(scriptSrc, callback, mode) {
  const script = document.createElement("script");
  script.src = scriptSrc;

  if (callback) {
    script.onload = callback;
  }

  if (mode) {
    script[mode] = true;
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
