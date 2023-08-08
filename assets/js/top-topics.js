/* --------------------------------
- Purpose: Loop Data
- Author: Hyunjung Joun
-------------------------------- */

// Fetch the template file -----------------
fetch("../../index.html")
  .then((res) => res.text())
  .then((html) => {
    const data = {
      topTopics: [
        {
          name: "Design",
          count: 15,
        },
        {
          name: "Technology",
          count: 8,
        },
        {
          name: "Residential",
          count: 6,
        },
        {
          name: "Interior",
          count: 9,
        },
        {
          name: "Landscape",
          count: 4,
        },
        {
          name: "Urban",
          count: 15,
        },
        {
          name: "Cultural",
          count: 10,
        },
        {
          name: "Exhibition",
          count: 12,
        },
        {
          name: "Narrative",
          count: 15,
        },
      ],
    };

    const newHtml = () => `
        {{#each topTopics}}
          <li class="topics__item">
            <a class="topics__item-wrapper" href="#">
              <h1 class="topics__name ts--h1">{{name}}</h1>
              <div class="topics__count-box">
                <p class="topics__count tc--white">0</p>
              </div>
            </a>
          </li>
        {{/each}}
      `;

    const parentEls = document.getElementsByClassName("topics__list");

    for (parentEl of parentEls) {
      insert(parentEl, render(newHtml, data));
    }
  })
  .catch((err) => {
    console.error("error: ", err);
  });
