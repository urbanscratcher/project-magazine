/* --------------------------------
- Purpose: render one detailed author page
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

async function renderAuthor(id) {
  try {
    // render author info
    const author = await getAuthor(id);
    insertAfterTemplate("authorDescriptionTemplate", author);

    // render title
    insertAfterTemplate("authorTitleTemplate", author);

    // render articles written by the author
    const insights = await getInsightsByAuthor(id);
    insights.map((el) => {
      el.author.id = author.id;
      el.author.name = author.name;
      el.author.avatar = author.avatar;
    });
    insertAfterTemplate("authorWorksTemplate", { data: insights });

    console.log(insights);
  } catch (err) {
    console.error(err);
  }
}
