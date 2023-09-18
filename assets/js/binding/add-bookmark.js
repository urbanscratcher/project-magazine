/* --------------------------------
- Purpose: Add bookmark event
- Author: Hyunjung Joun
-------------------------------- */
async function addBookmark(upperClassName) {
  try {
    const className = `${
      upperClassName ? upperClassName + " " : ""
    } .component-bookmark-add`;
    const bookmarkEls = document.querySelectorAll(className);

    bookmarkEls.forEach((el) =>
      el.addEventListener("click", clickBookmarkBtnHandler)
    );
  } catch (err) {
    console.error(err);
  }
}
