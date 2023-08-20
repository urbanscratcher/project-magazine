/* --------------------------------
- Purpose: Load Component
- Author: Hyunjung Joun
-------------------------------- */

// Fetch the template file -----------------
fetch("/index.html")
  .then((res) => res.text())
  .then((html) => {
    const newHtml = () => document.getElementById("viewAllTemplate").innerHTML;

    const parentEls = document.getElementsByClassName("component-viewAll");

    for (let i = 0; i < parentEls.length; i++) {
      insert(parentEls[i], render(newHtml, {}));
    }
  })
  .catch((err) => {
    console.error("error: ", err);
  });
