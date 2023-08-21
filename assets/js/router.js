document.addEventListener("DOMContentLoaded", () => {
  const currentRoute = window.location.pathname;
  console.log("current path: ", currentRoute);
  handleRouteChange(currentRoute);
});

function handleRouteChange(route) {
  switch (route) {
    case "/":
      const createDoc = document.createElement("object");
      createDoc.data = "main.html";
      createDoc.id = "external__main";
      document.body.appendChild(createDoc);
      onLoadMainHtml();
      observeLoadChildren(loadScriptsForMain);
      break;
    default:
      console.log("aaaa");
  }
}

function observeLoadChildren(fn) {
  const mainEl = document.getElementById("main");
  const observer = new MutationObserver(function (mutationsList) {
    for (let m of mutationsList) {
      console.log(m);
      if (m.type === "childList") {
        fn();
      }
    }
  });
  observer.observe(mainEl, { childList: true });
}

function onLoadMainHtml() {
  document
    .getElementById("external__main")
    .addEventListener("load", (e) => loadMainHtmlHandler(e));
  document.removeEventListener("load", onLoadMainHtml);
}

function loadMainHtmlHandler(e) {
  const mainDocument =
    document.getElementById("external__main").contentDocument;

  if (mainDocument) {
    mainDocument.body.style.display = "none";
    const mEl = mainDocument.body;
    document.getElementById("main").innerHTML = mEl.innerHTML;
  }
}

function loadScriptsForMain() {
  const util = document.createElement("script");
  util.src = "/assets/js/util.js";
  document.head.appendChild(util);

  util.onload = function () {
    const topics = document.createElement("script");
    const insights = document.createElement("script");
    const saved = document.createElement("script");
    const awards = document.createElement("script");
    const authors = document.createElement("script");
    const videos = document.createElement("script");
    const components = document.createElement("script");

    topics.src = "/assets/js/topics.js";
    insights.src = "/assets/js/insights.js";
    saved.src = "/assets/js/saved.js";

    awards.src = "/assets/js/awards.js";
    awards.async = true;

    authors.src = "/assets/js/authors.js";
    authors.async = true;

    videos.src = "/assets/js/videos.js";
    videos.async = true;

    components.src = "/assets/js/components.js";
    components.defer = true;

    document.head.appendChild(insights);
    document.head.appendChild(topics);
    document.head.appendChild(saved);
    document.head.appendChild(awards);
    document.head.appendChild(authors);
    document.head.appendChild(videos);
    document.head.appendChild(components);
  };
}
