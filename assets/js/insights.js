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

function getAuthorSimple(authorsData, id) {
  return authorsData.authors.find((el) => el.id === id);
}

function renderAllInsights(data, insightsData, authorsData) {
  renderTrendings(authorsData, insightsData);
  renderLatest();
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
}

function renderLatest() {
  const latestList = [...insightsData]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4);

  latestList.map((el) => (el.createdAt = printDateDifference(el.createdAt)));

  insertAfterTemplate("latestTemplate", { data: latestList });
}
