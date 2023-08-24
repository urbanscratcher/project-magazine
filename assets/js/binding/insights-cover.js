/* --------------------------------
- Purpose: Render cover
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

renderCover();

async function renderCover() {
  try {
    const res = await fetch("/data/insights/data-cover.json");
    const coverData = await res.json();
    const list = [];

    for (const cover of coverData.insightsCover) {
      list.push(await getInsight(cover.id));
    }

    insertAfterTemplate("coverTopicTemplate", list[0]);
    insertAfterTemplate("coverThumbnailTemplate", list[0]);
    insertAfterTemplate("coverTitleTemplate", list[0]);
  } catch (err) {
    console.error("error: ", err);
  }
}
