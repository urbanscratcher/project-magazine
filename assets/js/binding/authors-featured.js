/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

renderFeaturedAuthors();

async function renderFeaturedAuthors() {
  try {
    const allAuthors = await getAuthorList();
    const data = allAuthors.slice(0, 4);
    insertAfterTemplate("featuredAuthorsTemplate", { data: data });
  } catch (err) {
    console.error(err);
  }
}
