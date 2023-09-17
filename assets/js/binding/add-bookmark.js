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

        const savedBtn = document.querySelector(".btn__saved");
        savedBtn.classList.add("btn__saved--moving");
        setTimeout(function () {
          savedBtn.classList.remove("btn__saved--moving");
        }, 500);

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
