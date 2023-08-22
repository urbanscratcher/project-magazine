/* --------------------------------
- Purpose: Loop data and render
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

// Fetch the template file -----------------

presentTopics();
renderTopicCountLabel();

function presentTopics() {
  const newHtml = () => `
      {{#each topTopics}}
        <li class="topics__item">
          <div class="topics__item-wrapper">
            <h1 class="topics__name ts--h1">{{name}}</h1>
            <div class="topics__count-box">
              <p class="topics__count tc--white">0</p>
            </div>
          </div>
        </li>
      {{/each}}
    `;

  const parentEls = document.getElementsByClassName("topics__list");

  for (parentEl of parentEls) {
    insert(parentEl, render(newHtml, topicList));
  }
}

async function renderTopicCountLabel() {
  try {
    const res = await fetch("/data/insights/data.json");
    const data = await res.json();
    renderTopicCounts(countsByTopic(data.insights));
  } catch (err) {
    console.error("error: ", err);
  }
}

function renderTopicCounts(counted) {
  const topicNameEls = document.querySelectorAll(
    ".topTopics__list .topics__name"
  );

  for (const t of topicNameEls) {
    const newHtml = () => `
        <p class="topics__count tc--white">
          ${counted[t.textContent.toLowerCase()] ?? 0}
        </p>
        `;

    const parentEl = t.nextElementSibling;
    insert(parentEl, render(newHtml, {}));
  }
}

function countsByTopic(insightList) {
  // Create an object to store category counts
  const result = {};

  // Iterate through the array
  for (const i of insightList) {
    const category = i.topic;
    // If category doesn't exist in the object, initialize it with a count of 1
    if (!result[category]) {
      result[category] = 1;
    } else {
      // Increment the count if category already exists
      result[category]++;
    }
  }
  return result;
}
