/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

fetch("/data/authors/data.json")
  .then((res) => res.json())
  .then((data) => {
    //load external js
    const insightsScript = document.createElement("script");
    insightsScript.src = "/assets/js/insights.js";
    insightsScript.onload();
  })
  .catch((err) => console.error("error: ", err));
