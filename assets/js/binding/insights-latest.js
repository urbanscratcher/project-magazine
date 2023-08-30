/* --------------------------------
- Purpose: Render latest
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

renderLatest();

async function renderLatest() {
  try {
    const insights = await getInsightList();

    const latestList = [...insights]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 4);

    for (const l of latestList) {
      l.author = await getAuthorSimple(l.author.id);
      l.createdAt = printDateDifference(l.createdAt);
    }

    insertAfterTemplate("latestTemplate", { data: latestList });

    // After {{each}} is looped, the dependent component rendering should be executed for each item
    // I do this here because a mutation observer wasn't able to detect the added elements
    loadBookmark(".latest__item");
  } catch (err) {
    console.error("error: ", err);
  }
}
