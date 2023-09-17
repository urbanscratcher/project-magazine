/* --------------------------------
- Purpose: Add bookmark event
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

async function addBookmark(upperClassName) {
  try {
    const className = `${
      upperClassName ? upperClassName + " " : ""
    } .component-bookmark-add`;
    const bookmarkEls = document.querySelectorAll(className);

    bookmarkEls.forEach((el) =>
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const storedInsights = localStorage.getItem("myInsights");
        if (!storedInsights) {
          localStorage.setItem("myInsights", JSON.stringify([]));
        }

        const insightId = +e.currentTarget.dataset.id;
        if (insightId) {
          const myInsights = JSON.parse(localStorage.getItem("myInsights"));

          // remove repetition
          const myInsightsSet = new Set();
          myInsights.push(insightId);
          myInsights.forEach((i) => myInsightsSet.add(i));
          localStorage.setItem(
            "myInsights",
            JSON.stringify(Array.from(myInsightsSet))
          );
        } else {
          console.log("not able to get insight id");
        }
      })
    );
  } catch (err) {
    console.error(err);
  }
}
