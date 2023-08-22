/* --------------------------------
- Purpose: Render inspirations
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

renderInspiration();

async function renderInspiration() {
  try {
    const data = await getInsightList();

    // rendering
    const shuffledArr = shuffle(data, 6);
    insertAfterTemplate("inspirationsTemplate", { data: shuffledArr });

    // events
    const button = document.getElementById("shuffleImage");
    await button.addEventListener("click", onClickShuffle);
  } catch (err) {
    console.error("error: ", err);
  }
}

async function onClickShuffle(e) {
  e.preventDefault();

  const imgList = document.getElementsByClassName("inspirations__list");
  const imgItems = document.querySelectorAll(".inspirations__list > li");
  const insights = await getInsightList();
  const shuffledArr = shuffle(insights, 6);
  for (i of imgItems) {
    imgList[0].removeChild(i);
  }
  insertAfterTemplate("inspirationsTemplate", { data: shuffledArr });

  e.target.removeEventListener("click", onClickShuffle);
}
