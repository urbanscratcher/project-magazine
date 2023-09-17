/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

renderFeaturedAuthors();

async function renderFeaturedAuthors() {
  try {
    const data = await getAuthorList(0, 4);

    insertAfterTemplate("featuredAuthorsTemplate", { data: data });
  } catch (err) {
    console.error(err);
  }
}
