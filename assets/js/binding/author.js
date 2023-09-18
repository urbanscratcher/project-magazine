/* --------------------------------
- Purpose: render one detailed author page
- Author: Hyunjung Joun
-------------------------------- */

async function renderAuthor(id) {
  try {
    // render author info
    const author = await getAuthor(id);
    console.log(author);
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
    loadBookmark(".author__works");

    // email copy event
    const emailEl = document.querySelector(".author__email");
    emailEl.addEventListener(
      "click",
      async (e) => await copyAuthorEmailHandler(author)
    );
  } catch (err) {
    console.error(err);
  }
}
