/* --------------------------------
- Purpose: Get data and render
- Author: Hyunjung Joun
-------------------------------- */

// Fetch Data
fetch("/index.html")
  .then(() => {
    fetch("/data/awards/data.json")
      .then((res) => res.json())
      .then((data) => {
        const newHtml = () =>
          document.getElementById("awardsListTemplate").innerHTML;
        const parentEls = document.getElementsByClassName("awards__list");
        for (parentEl of parentEls) {
          insert(parentEl, render(newHtml, data));
        }
      })
      .catch((err) => {
        console.error("error: ", err);
      });
  })
  .catch((err) => {
    console.error("error: ", err);
  });
