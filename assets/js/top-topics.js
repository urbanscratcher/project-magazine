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
        },
        {
          name: "Technology",
        },
        {
          name: "Residential",
        },
        {
          name: "Interior",
        },
        {
          name: "Landscape",
        },
        {
          name: "Urban",
        },
        {
          name: "Cultural",
        },
        {
          name: "Exhibition",
        },
        {
          name: "Narrative",
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
