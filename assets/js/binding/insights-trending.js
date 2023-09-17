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

    // render trending main
    const trendingMain = document.querySelector("#trendingMainImgTemplate");
    if (trendingMain) {
      await renderTrendingMain(trendings[0]);
      loadBookmark(".trending__main");
      addBookmark(".trending__main");
    }

    // render trending list
    insertAfterTemplate("trendingListTemplate", {
      data: trendings.slice(1, 5),
    });

    const existBookmarkEls = document.querySelectorAll(
      ".trending__item .component-bookmark-add"
    );

    if (existBookmarkEls.length > 0) {
      loadBookmark(".trending__item");
      addBookmark(".trending__item");
    }
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
