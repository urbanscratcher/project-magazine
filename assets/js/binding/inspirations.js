/* --------------------------------
- Purpose: Render inspirations
- Author: Hyunjung Joun
-------------------------------- */
renderInspiration();

async function renderInspiration() {
  try {
    const data = await getInsightList();

    // render random images
    const shuffledArr = shuffle(data, 6);
    insertAfterTemplate("inspirationsTemplate", { data: shuffledArr });

    // add shuffle event
    const button = document.getElementById("shuffleImage");
    await button.addEventListener("click", shuffleHandler);
  } catch (err) {
    console.error("error: ", err);
  }
}
