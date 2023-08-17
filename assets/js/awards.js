/* --------------------------------
- Purpose: Get data and render
- Author: Hyunjung Joun
-------------------------------- */

// Fetch Data
fetch("../../data/awards/data.json")
  .then((res) => res.json())
  .then((data) => {
    // Fetch the template file -----------------
    fetch("../../index.html")
      .then((res) => res.text())
      .then((html) => {
        const newHtml = () => `
        {{#each awards}}
          <li class="awards__item col tc--white">
          <div
            class="awards__bg bg--img"
            style="--img-url: url({{thumbnail}})"
          ></div>
          <div class="awards__wrapper col gap--m">
            <div class="awards__name-box">
              <label class="awards__name">{{awardName}}</label>
            </div>
            <h3 class="awards__project serif">{{project}}</h3>
            <h4 class="awards__receiver">{{architect}}</h4>
            <div
              class="awards__score donutChart"
              style="--donutChart-content: 8.8"
            >
              <svg class="donutChart__circle-box">
                <circle
                  class="donutChart__circle"
                  cx="43"
                  cy="43"
                  r="43"
                ></circle>
                <circle
                  class="donutChart__circle"
                  cx="43"
                  cy="43"
                  r="43"
                ></circle>
              </svg>
              <div class="donutChart__content-box">
                <h4 class="donutChart__content">{{averageRating}}</h4>
              </div>
            </div>
            <q class="awards__comment italic">
              "{{comment}}"
            </q>
          </div>
        </li>   
      {{/each}}      
      `;

        const parentEls = document.getElementsByClassName("awards__list");

        for (parentEl of parentEls) {
          insert(parentEl, render(newHtml, data));
        }
      })

      .catch((err) => {
        console.error("error: ", err);
      });
  })
  .catch((err) => {
    console.error("error: ", err);
  });
