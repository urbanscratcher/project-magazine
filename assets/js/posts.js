/* --------------------------------
- Purpose: Get cover data and render
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
          <div class="cover__bg bg--img" style="--img-url: url({{thumbnail}})"></div>
          <div class="cover__txt col container--m gap--m tc--white">
            <div class="cover__topic">
              <a href="#" class="topic--white ts--btn">{{topic}}</a>
            </div>
            <a href="#" class="cover__headline ts--h1 serif hover--txt">
              {{title}}
            </a>
          </div>          
        `;

        const parentEl = document.getElementById("cover");
        insertFirstChild(parentEl, render(newHtml, data.insights[0]));
      })
      .catch((err) => {
        console.error("error: ", err);
      });
  })
  .catch((err) => {
    console.error("error: ", err);
  });
