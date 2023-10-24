/* --------------------------------
- Purpose: Loop data and render
- Author: Hyunjung Joun
-------------------------------- */

renderTopics();
renderTopicCountLabel();

function renderTopics() {
  const newHtml = () => `
      {{#each topTopics}}
        <li class="topics__item">
          <div class="topics__item-wrapper" onclick="navigateTo('/insights?topic={{name}}'.toLowerCase()); return false;">
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
    const counts = await getTopicCounts();
    renderTopicCounts(counts);
  } catch (err) {
    console.error(err);
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
