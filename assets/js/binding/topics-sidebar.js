/* --------------------------------
- Purpose: topics sidebar
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

topicsInSidebar();

async function topicsInSidebar() {
  try {
    // render topic categories in the sidebar
    const topicsObj = await getTopicCounts();
    let topics = [{ topic: "all" }];
    for (const key in topicsObj) {
      topics.push({ topic: key, count: topicsObj[key] });
    }
    insertAfterTemplate("filterTemplate", { data: topics });

    // render current topic selection
    renderCurrentTopic();

    // next and prev slider
    const prevBtnEl = document.querySelector(".filter__left");
    const nextBtnEl = document.querySelector(".filter__right");
    const containerEl = document.querySelector(".filter__list-container");
    const containerWidth =
      +getComputedStyle(containerEl).getPropertyValue("width").split("px")[0] -
      +getComputedStyle(containerEl)
        .getPropertyValue("padding-left")
        .split("px")[0] -
      +getComputedStyle(containerEl)
        .getPropertyValue("padding-right")
        .split("px")[0];
    const listEl = document.querySelector(".filter__list");

    const slideAmount = (containerWidth / topics.length) * 2;

    let scrollPosition = 0;
    prevBtnEl.addEventListener("click", (e) => {
      if (scrollPosition < 0) {
        scrollPosition += slideAmount;
        listEl.style.transform = `translateX(${scrollPosition}px)`;
      }
    });

    nextBtnEl.addEventListener("click", (e) => {
      const arrowX = nextBtnEl.getBoundingClientRect().x;
      const lastItemEl = document.querySelector(".filter__item:last-child");
      const lastItemX =
        lastItemEl.getBoundingClientRect().x +
        lastItemEl.getBoundingClientRect().width;
      if (lastItemX > arrowX) {
        scrollPosition -= slideAmount;
      }
      listEl.style.transform = `translateX(${scrollPosition}px)`;
    });

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

        // initalize sorting
        curIsLatest = true;
        clearInsightsList();
        renderSortedInsights(selectedTopic, curIsLatest);
        renderCurrentTopic();
      });
    }
  } catch (err) {
    console.error(err);
  }
}

function renderCurrentTopic(topic) {
  if (!topic) {
    topic = curTopic;
  }

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
