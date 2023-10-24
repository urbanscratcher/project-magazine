/* --------------------------------
- Purpose: Render saved list
- Author: Hyunjung Joun
-------------------------------- */

renderSaved();

async function renderSaved() {
  try {
    await renderSavedList();
    await renderSavedTotal();
  } catch (err) {
    console.error(err);
  }
}

async function removeSavedItemHandler(e) {
  const savedBtn = document.querySelector(".btn__saved");
  savedBtn.classList.add("btn__saved--removing");
  setTimeout(function () {
    savedBtn.classList.remove("btn__saved--removing");
  }, 500);

  const removeTargetId = +e.currentTarget.dataset.id;
  const storedInsights = JSON.parse(localStorage.getItem("myInsights"));

  const filteredInsights = storedInsights.filter((el) => el !== removeTargetId);
  localStorage.setItem("myInsights", JSON.stringify(filteredInsights));

  await renderSavedList();
  await renderSavedTotal();
}

async function renderSavedTotal() {
  const storedInsights = JSON.parse(localStorage.getItem("myInsights"));
  const savedTotal = storedInsights.length;

  const totalEl = document.querySelector(".saved__total");
  totalEl.textContent = savedTotal;
}

async function renderSavedList() {
  // reset list (empty)
  const itemEls = document.querySelectorAll(".saved__item");
  itemEls.forEach((el) => el.remove());

  // get total
  const storedInsights = JSON.parse(localStorage.getItem("myInsights"));
  const savedTotal = storedInsights.length;

  // render list
  if (savedTotal > 0) {
    const allInsights = await getInsightList();
    let savedInsights = [];
    for (const storedId of storedInsights) {
      const insight = await getInsight(storedId);
      savedInsights.push(insight);
    }
    for (const saved of savedInsights) {
      const author = await getAuthorSimple(saved.author.id);
      saved.author = author;
      saved.createdAt = printDateDifference(saved.createdAt);
    }
    insertAfterTemplate("savedItemTemplate", { data: savedInsights });

    // exclude article event
    const bookmarkEls = document.querySelectorAll(".insights__bookmark");
    bookmarkEls.forEach((el) => {
      el.addEventListener("click", removeSavedItemHandler);
    });
  }
}
