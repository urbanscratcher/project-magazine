/* --------------------------------
- Purpose: Get data and render
- Author: Hyunjung Joun
-------------------------------- */
renderAwards();

async function renderAwards() {
  try {
    const data = await getAwardList();
    const newHtml = () =>
      document.getElementById("awardsListTemplate").innerHTML;
    const parentEls = document.getElementsByClassName("awards__list");
    for (parentEl of parentEls) {
      insert(parentEl, render(newHtml, data));
    }
  } catch (err) {
    console.error(err);
  }
}
