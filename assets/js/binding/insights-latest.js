/* --------------------------------
- Purpose: Render latest
- Author: Hyunjung Joun
-------------------------------- */

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

    loadBookmark(".latest__item");
    addBookmark(".latest__item");
  } catch (err) {
    console.error("error: ", err);
  }
}
