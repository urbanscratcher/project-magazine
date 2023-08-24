/* --------------------------------
- Purpose: Render trending
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

renderTrendingAside();

async function renderTrendingAside() {
  try {
    const res = await fetch("/data/insights/data-trending.json");
    const data = await res.json();
    const trendings = await getTrendings();

    for (t of trendings) {
      t.author = await getAuthorSimple(t.author.id);
    }

    insertAfterTemplate("trendingListTemplate", {
      data: trendings.slice(0, 5),
    });

    // After {{each}} is looped, the dependent component rendering should be executed for each item
    // I do this here because a mutation observer wasn't able to detect the added elements
    loadBookmark(".trending__item");
  } catch (err) {
    console.error("error: ", err);
  }
}
