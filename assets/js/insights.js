/* --------------------------------
- Purpose: Get data and render
- Author: Hyunjung Joun
-------------------------------- */

// trending
// the latest
// featured authors
// fetch("/data/authors/data.json")
//   .then((res) => res.json())
//   .then((authorsData) => {
//     const insightsData = data.insights.map((el) => {
//       const mappedEl = { ...el };
//       mappedEl.createdAt = new Date(el.createdAt);

//       mappedEl.author = authorsData.authors.find(
//         (ael) => ael.id === el.author.id
//       );
//       return mappedEl;
//     });

//     // renderAllInsights(data, insightsData, authorsData);
//   })
//   .catch((err) => {
//     console.error("error: ", err);
//   });

function getAuthor(authorsData, id) {
  return authorsData.authors.find((el) => el.id === id);
}

function renderAllInsights(data, insightsData, authorsData) {
  renderTopicCounts(data);
  renderTrendings(authorsData, insightsData);
  renderLatest();

  // components
  loadBookmark();
}

// public functions --------------------------

function renderTrendings(authorsData, insightsData) {
  const msOf7Days = 1000 * 60 * 60 * 24 * 7;
  const trendings = [...insightsData]
    .filter(
      (el) =>
        el.createdAt <= Date.now() && el.createdAt > Date.now() - msOf7Days
    )
    .sort((a, b) => b.viewCount - a.viewCount);

  trendingMain(trendings[0], getAuthor(authorsData, trendings[0].author.id));
  trendingList(trendings.slice(1, trendings.length));
}

function renderLatest() {
  const latestList = [...insightsData]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4);

  latestList.map((el) => (el.createdAt = printDateDifference(el.createdAt)));

  insertAfterTemplate("latestTemplate", { data: latestList });
}

// private functions --------------------------
function trendingList(list) {
  insertAfterTemplate("trendingListTemplate", { data: list });
}

function trendingMain(data, authorsData) {
  insertAfterTemplate("trendingMainImgTemplate", data);
  insertAfterTemplate("trendingMainTopicTemplate", data);
  insertAfterTemplate("trendingMainTitle", data);
  insertAfterTemplate("trendingMainSummary", data);
  insertAfterTemplate("trendingMainTtrTemplate", data);
  trendingMainCreatedAt(data);

  insertAfterTemplate(
    "trendingMainAuthor",
    getAuthor(authorsData, data.author.id)
  );
}

function trendingMainCreatedAt(data) {
  const dateDifference = printDateDifference(data.createdAt);
  const newHtml = () => `
       ${printDateDifference(data.createdAt)}
      `;
  const parentEl = document.querySelector(".trending__main .createdAt");
  insert(parentEl, render(newHtml, {}));
}

function editorsPickImgTemplate(data) {
  const editorsPickImg = document.getElementById("editorsPickImg");
  insertAfter(
    editorsPickImg,
    render(() => editorsPickImg.innerHTML, data)
  );
}
