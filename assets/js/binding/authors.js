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
      const lastItemEl = document.querySelector(".authors__item:last-child");
      authorsOffset = authorsLimit + authorsOffset;
      const nextAuthors = await getAuthorList(authorsOffset, authorsLimit);
      insertAfterElementTemplate(lastItemEl, "authorsTemplate", {
        data: nextAuthors,
      });

      const itemEls = document.querySelectorAll(".authors__item");
      if (itemEls.length === allAuthors.length) {
        e.target.style = `display:none`;
      }
    });
  } catch (err) {
    console.error(err);
  }
}
