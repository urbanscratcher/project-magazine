/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

renderAuthors();

async function renderAuthors() {
  try {
    // render total
    const allAuthors = await getAuthorList();
    const totalEl = document.querySelector(".authors__total");
    totalEl.textContent = allAuthors.length;

    // load initial list
    let authorsOffset = 0;
    let authorsLimit = 5;
    const initialAuthors = await getAuthorList(authorsOffset, authorsLimit);

    // render initial list
    insertAfterTemplate("authorsTemplate", { data: initialAuthors });

    // render more authors
    const moreAuthorsBtn = document.querySelector(".more-authors");
    moreAuthorsBtn.addEventListener("click", async (e) => {
      await moreAuthorsHandler(e, authorsOffset, authorsLimit, allAuthors);
      authorsOffset = authorsOffset + authorsLimit;
    });
  } catch (err) {
    console.error(err);
  }
}
