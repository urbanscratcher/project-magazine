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
    eidtorsPickList(list.slice(1, 5));
  } catch (err) {
    console.error("error: ", err);
  }
}

function eidtorsPickList(list) {
  const newHtml = () =>
    document.getElementById("editorsPickListTemplate").innerHTML;

  const parentEl = document.querySelector(".editorsPick__list");
  insert(
    parentEl,
    render(newHtml, {
      insights: list,
    })
  );
}
