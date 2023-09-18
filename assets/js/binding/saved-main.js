/* --------------------------------
- Purpose: Render saved list
- Author: Hyunjung Joun
-------------------------------- */
renderSavedMain();

async function renderSavedMain() {
  try {
    const storedInsights = JSON.parse(localStorage.getItem("myInsights"));

    if (storedInsights.length > 0) {
      let insights = [];
      for (const i of storedInsights) {
        const insight = await getInsight(i);
        insight.author = await getAuthorSimple(insight.author.id);
        insights.push(insight);
      }
      insertAfterTemplate("savedTemplate", { data: insights });
    } else {
      insertAfterTemplate("savedNothingTemplate", {});
    }
  } catch (err) {
    console.error(err);
  }
}
