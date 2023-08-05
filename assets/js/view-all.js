/* --------------------------------
- Purpose: component
- Author: Hyunjung Joun
-------------------------------- */

// Fetch the template file -----------------
fetch("../../index.html")
  .then((res) => res.text())
  .then((html) => {
    const viewAllEls = document.getElementsByClassName("component-viewAll");

    for (let i = 0; i < viewAllEls.length; i++) {
      insert(viewAllEls[i], render(createHTML, {}));
    }
  })
  .catch((err) => {
    console.error("error: ", err);
  });

// Create New HTML -----------------------------
function createHTML() {
  return `
    <a href="#" class="viewAll">
      <p>view all</p>
      <div class="button-circle-24">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </a>
  `;
}
