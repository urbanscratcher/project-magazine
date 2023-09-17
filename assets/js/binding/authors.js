/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

renderAuthors();

async function renderAuthors() {
  try {
    const authors = await getAuthorList();

    // render total authors
    const totalEl = document.querySelector(".authors__total");
    totalEl.textContent = authors.length;

    // render list
    insertAfterTemplate("authorsTemplate", { data: authors });
  } catch (err) {
    console.error(err);
  }
}
