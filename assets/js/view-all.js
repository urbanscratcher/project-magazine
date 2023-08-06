/* --------------------------------
- Purpose: Load Component
- Author: Hyunjung Joun
-------------------------------- */

// Fetch the template file -----------------
fetch("../../index.html")
  .then((res) => res.text())
  .then((html) => {
    const newHtml = () => `
    <a href="#" class="viewAll">
      <p>view all</p>
      <div class="button-circle-24">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </a>
  `;

    const parentEls = document.getElementsByClassName("component-viewAll");

    for (let i = 0; i < parentEls.length; i++) {
      insert(parentEls[i], render(newHtml, {}));
    }
  })
  .catch((err) => {
    console.error("error: ", err);
  });
