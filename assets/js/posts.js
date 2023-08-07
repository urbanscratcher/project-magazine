/* --------------------------------
- Purpose: Loop Data
- Author: Hyunjung Joun
-------------------------------- */

// Fetch Data
fetch("../../data/insights/data.json")
  .then((res) => res.json())
  .then((data) => {
    // Fetch the template file -----------------
    fetch("../../index.html")
      .then((res) => res.text())
      .then((html) => {
        // Cover -------------------------------
        const newHtml = () => `
          <div class="cover__wrapper-bg col bg--img" style="--img-url: url({{thumbnail}})">
          <div class="cover__wrapper col gap--m tc--white">
            <div class="topic__wrapper">
              <a href="#" class="topic--white ts--btn">{{topic}}</a>
            </div>
            <a href="#" class="cover__headline ts--h1 serif">
              {{title}}
            </a>
            <div class="slider__controller row gap--m">
              <a href="#" class="controller__btn btn--circle-l">
                <i class="fa-solid fa-chevron-left"></i>
              </a>
              <a href="#" class="controller__btn btn--circle-l">
                <i class="fa-solid fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
        `;

        const parentEl = document.getElementById("cover");
        insert(parentEl, render(newHtml, data.insights[0]));
      })
      .catch((err) => {
        console.error("error: ", err);
      });
  })
  .catch((err) => {
    console.error("error: ", err);
  });
