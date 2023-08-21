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

      const externalMainEl = document.getElementById("external__main");
      externalMainEl.addEventListener("load", (e) => loadMainHtmlHandler(e));
      observeLoadChildren(loadScriptsForMain);
      break;
    case "/insight":
      console.log("i");
    default:
      console.log("aaaa");
  }
}

function observeLoadChildren(fn) {
  const mainEl = document.getElementById("main");
  const observer = new MutationObserver(function (mutationsList) {
    for (let m of mutationsList) {
      if (m.type === "childList") {
        fn();
      }
    }
  });
  observer.observe(mainEl, { childList: true });
}

function loadMainHtmlHandler(e) {
  const externalMainEl = document.getElementById("external__main");
  const mainDocument = externalMainEl.contentDocument;

  mainDocument.body.style.display = "none";
  const mEl = mainDocument.body;
  document.getElementById("main").innerHTML = mEl.innerHTML;

  externalMainEl.removeEventListener("load", loadMainHtmlHandler);
}

function loadScriptsForMain() {
  const insights = document.createElement("script");
  insights.src = "/assets/js/insights.js";
  insights.defer = true;

  const topics = document.createElement("script");
  topics.src = "/assets/js/topics.js";
  topics.defer = true;

  const saved = document.createElement("script");
  saved.src = "/assets/js/saved.js";
  saved.defer = true;

  const awards = document.createElement("script");
  awards.src = "/assets/js/awards.js";
  awards.defer = true;

  const authors = document.createElement("script");
  authors.src = "/assets/js/authors.js";
  authors.defer = true;

  const videos = document.createElement("script");
  videos.src = "/assets/js/videos.js";
  videos.defer = true;

  const components = document.createElement("script");
  components.src = "/assets/js/components.js";
  components.defer = true;

  document.head.appendChild(insights);
  document.head.appendChild(topics);
  document.head.appendChild(saved);
  document.head.appendChild(awards);
  document.head.appendChild(authors);
  document.head.appendChild(videos);
  document.head.appendChild(components);
}
