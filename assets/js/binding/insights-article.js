/* --------------------------------
- Purpose: insight article detail
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

renderArticle(1);

async function renderArticle(id) {
  try {
    const insight = await getInsight(id);
    insight.createdAt = printDateDifference(insight.createdAt);
    const detail = await getInsightDetail(insight.id);
    insertAfterTemplate("articleHeaderTemplate", insight);

    const articleTxtEl = document.getElementsByClassName("article__txt")[0];
    articleTxtEl.innerHTML = detail.body;

    const author = await getAuthor(insight.author.id);
    insertAfterTemplate("authorProfileTemplate", author);
  } catch (err) {
    console.error("error: ", err);
  }
}
