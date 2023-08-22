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

function renderAllInsights(data, insightsData, authorsData) {
  renderTrendings(authorsData, insightsData);
  renderLatest();
}

// public functions --------------------------
function renderLatest() {
  const latestList = [...insightsData]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4);

  latestList.map((el) => (el.createdAt = printDateDifference(el.createdAt)));

  insertAfterTemplate("latestTemplate", { data: latestList });
}
