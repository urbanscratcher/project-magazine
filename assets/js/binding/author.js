/* --------------------------------
- Purpose: render one detailed author page
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

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

    // email copy event
    const emailEl = document.querySelector(".author__email");
    emailEl.addEventListener("click", (e) => {
      navigator.clipboard
        .writeText(author.email)
        .then(() => {
          alert(`${author.name}'s email< ${author.email} > is copied!`);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  } catch (err) {
    console.error(err);
  }
}
