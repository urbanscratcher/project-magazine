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
        const selectedTopic = e.target.textContent;
        const route = `?topic=${selectedTopic}`;
        history.pushState(
          { selectedTopic: selectedTopic, selectedSort: curIsLatest },
          null,
          route
        );
        clearInsightsList();
        renderArticlesByTopic(selectedTopic, curIsLatest);
        selectCurrentTopic();
      });
    }
  } catch (err) {
    console.error(err);
  }
}

function selectCurrentTopic(topic) {
  if (!topic) {
    topic = curTopic;
  }

  console.log(topic);

  const filterButtonEls = document.querySelectorAll(
    ".filter__item .filter__button"
  );
  let topicEls = [];
  for (let i = 0; i < filterButtonEls.length; i++) {
    const parentEl = filterButtonEls.item(i).parentElement;

    if (filterButtonEls.item(i).innerHTML === topic) {
      parentEl.classList.add("filter__current");
    } else {
      parentEl.classList.remove("filter__current");
    }
  }
}
