/* --------------------------------
- Purpose: Render editor's pick
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

renderEditorsPick();

async function renderEditorsPick() {
  try {
    const res = await fetch("/data/insights/data-editorsPick.json");
    const data = await res.json();
    const list = [];

    for (const item of data.insightsEditorsPick) {
      list.push(await getInsight(item.id));
    }

    // render editor's pick cover
    insertAfterTemplate("editorsPickImgTemplate", list[0]);
    loadBookmark(".editorsPick__main");
    insertAfterTemplate("editorsPickTopicTemplate", list[0]);
    insertAfterTemplate("editorsPickTitleTemplate", list[0]);

    // render editor's pick list
    insertAfterTemplate("editorsPickListTemplate", { data: list.slice(1, 5) });
    loadViewAllByClass(
      "component-viewAll-editorsPick",
      `/insights?topic=${list[0].topic}`
    );

    // add bookmark
    addBookmark(".editorsPick__img");
  } catch (err) {
    console.error("error: ", err);
  }
}
