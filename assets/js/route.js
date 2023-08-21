document.addEventListener("DOMContentLoaded", () => {
  const currentRoute = window.location.pathname;
  console.log("current path: ", currentRoute);
  handleRouteChange(currentRoute);
});

function handleRouteChange(route) {
  const mainEl = document.getElementById("main");

  switch (route) {
    case "/":
      document
        .getElementById("external__main")
        .addEventListener("load", (e) => {
          const mainDocument =
            document.getElementById("external__main").contentDocument;
          const mEl = mainDocument.getElementById("m");
          document.getElementById("main").innerHTML = mEl.innerHTML;
        });

      break;
    default:
      main.innerHTML = "<p> default </p>";
  }

  loadScripts();
}

function loadScripts() {
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
    authors.src = "/assets/js/authors.js";
    videos.src = "/assets/js/videos.js";
    components.src = "/assets/js/components.js";

    document.head.appendChild(insights);
    document.head.appendChild(topics);
    document.head.appendChild(saved);
    document.head.appendChild(awards);
    document.head.appendChild(authors);
    document.head.appendChild(videos);
    document.head.appendChild(components);
  };
}
