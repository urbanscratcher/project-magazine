/* --------------------------------
- Purpose: Render trending
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

renderTrending();

async function renderTrending() {
  try {
    const res = await fetch("/data/insights/data-trending.json");
    const data = await res.json();
    const trendings = await getTrendings();

    for (t of trendings) {
      t.author = await getAuthorSimple(t.author.id);
      t.createdAt = await printDateDifference(t.createdAt);
    }

    await renderTrendingMain(trendings[0]);
    insertAfterTemplate("trendingListTemplate", {
      data: trendings.slice(1, 5),
    });

    // After {{each}} is looped, the dependent component rendering should be executed for each item
    // I do this here because a mutation observer wasn't able to detect the added elements
    loadBookmark(".trending__item");
  } catch (err) {
    console.error("error: ", err);
  }
}

async function getTrendings() {
  try {
    const insights = await getInsightList();
    const msOf30Days = 1000 * 60 * 60 * 24 * 30;

    const trendings = [...insights]
      .sort((a, b) => {
        const isAWithin30Days =
          a.createdAt <= Date.now() && a.createdAt > Date.now() - msOf30Days;
        const isBWithin30Days =
          b.createdAt <= Date.now() && b.createdAt > Date.now() - msOf30Days;

        if (isBWithin30Days && isAWithin30Days) {
          return b.viewCount - a.viewCount;
        }

        if (!isBWithin30Days && isAWithin30Days) {
          return -1;
        }

        if (isBWithin30Days && !isAWithin30Days) {
          return 1;
        }

        if (!isBWithin30Days && !isAWithin30Days) {
          return b.viewCount - a.viewCount;
        }
      })
      .slice(0, 6);

    return trendings;
  } catch (err) {
    console.error("error: ", err);
  }
}

async function renderTrendingMain(main) {
  insertAfterTemplate("trendingMainImgTemplate", main);
  insertAfterTemplate("trendingMainTopicTemplate", main);
  insertAfterTemplate("trendingMainTitle", main);
  insertAfterTemplate("trendingMainSummary", main);
  insertAfterTemplate("trendingMainCreatedAt", main);
  insertAfterTemplate("trendingMainTtrTemplate", main);
  insertAfterTemplate(
    "trendingMainAuthor",
    await getAuthorSimple(main.author.id)
  );
}
