/* --------------------------------
- Purpose: Loop Data
- Author: Hyunjung Joun
-------------------------------- */

// Fetch the template file -----------------
fetch("../../index.html")
  .then((res) => res.text())
  .then((html) => {
    const newHtml = () => `
      {{#each topTopics}}
        <li>
          <a href="#">
            <p>{{name}}</p>
            <div><p>{{count}}</p></div>
          </a>
        </li>
      {{/each}}
    `;

    const parentEl = document
      .getElementById("topTopics-content")
      .querySelector("ul");

    insert(parentEl, render(newHtml, data));
  })
  .catch((err) => {
    console.error("error: ", err);
  });

// Data ------------------------------------
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
