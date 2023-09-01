/* --------------------------------
- Purpose: render insight list
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

sortEvent();

function sortEvent() {
  const sortEl = document.querySelector(".sort");
  sortEl.addEventListener("click", onToggleSort);
}

async function renderArticlesByTopic(topic, isLatest) {
  try {
    curTopic = topic;
    curIsLatest = isLatest;

    const insights = await getInsightsByTopic(topic, isLatest);
    for (const i of insights) {
      i.author = await getAuthorSimple(i.author.id);
    }

    insertAfterTemplate("insightsItemThumbnail", { data: insights });
    loadBookmark(".insights__item");
  } catch (err) {
    console.error(err);
  }
}

function clearInsightsList() {
  const listsEl = document.querySelector(".insights__list");

  let childElements = listsEl.children;

  for (let i = childElements.length - 1; i >= 0; i--) {
    let child = childElements[i];
    if (child.id !== "insightsItemThumbnail") {
      listsEl.removeChild(child);
    }
  }
}

function onToggleSort() {
  curIsLatest = !curIsLatest;
  history.replaceState(
    {
      selectedTopic: curTopic,
      selectedSort: curIsLatest,
    },
    null,
    `${window.location.pathname}?topic=${curTopic}`
  );
  renderSortedInsights(curTopic, curIsLatest);
}

function renderSortedInsights(topic, isLatest) {
  const sortArrowEl = document.querySelector(".sort__arrow");
  sortArrowEl.innerHTML = isLatest ? "&darr;" : "&uarr;";

  clearInsightsList();
  renderArticlesByTopic(topic, isLatest);

  const sortEl = document.querySelector(".sort");
}
