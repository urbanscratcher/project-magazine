/* --------------------------------
- Purpose: topics sidebar
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

topicCategories();

async function topicCategories() {
  try {
    const topicsObj = await getTopicCounts();
    let topics = [{ topic: "all" }];
    for (const key in topicsObj) {
      topics.push({ topic: key, count: topicsObj[key] });
    }

    insertAfterTemplate("filterTemplate", { data: topics });

    // select current topic
    selectCurrentTopic();

    // filter event
    const filterItemEls = document.querySelectorAll(".filter__item");
    for (let i = 0; i < filterItemEls.length; i++) {
      filterItemEls.item(i).addEventListener("click", (e) => {
        clearInsightsList();
        renderArticlesByTopic(e.target.textContent, curIsLatest);
        selectCurrentTopic();
      });
    }
  } catch (err) {
    console.error(err);
  }
}

function selectCurrentTopic() {
  const filterButtonEls = document.querySelectorAll(
    ".filter__item .filter__button"
  );
  let topicEls = [];
  for (let i = 0; i < filterButtonEls.length; i++) {
    const parentEl = filterButtonEls.item(i).parentElement;
    if (filterButtonEls.item(i).innerHTML === curTopic) {
      parentEl.classList.add("filter__current");
    } else {
      parentEl.classList.remove("filter__current");
    }
  }
}
