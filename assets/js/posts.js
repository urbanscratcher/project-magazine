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
          {{#each insights}}
            <li>
              <a href="#">
                <h1>{{title}}</h1>
              </a>
            </li>
          {{/each}}
        `;

        console.log(data);

        // const parentEls = document.getElementsByClassName("topics-list");

        // for (parentEl of parentEls) {
        //   insert(parentEl, render(newHtml, data));
        // }
      })
      .catch((err) => {
        console.error("error: ", err);
      });
  })
  .catch((err) => {
    console.error("error: ", err);
  });
