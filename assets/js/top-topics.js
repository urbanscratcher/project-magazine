/* --------------------------------
- Purpose: data looping
- Author: Hyunjung Joun
-------------------------------- */

// Fetch the template file -----------------
fetch("../../index.html")
  .then((res) => res.text())
  .then((html) => {
    const topTopicsListEl = document
      .getElementById("topTopics-content")
      .querySelector("ul");

    insert(topTopicsListEl, render(createTopTopics, data));
  })
  .catch((err) => {
    console.error("error: ", err);
  });

// Create New HTML -----------------------------
function createTopTopics() {
  return `
        {{#each topTopics}}
          <li>
            <a href="#">
              <p>{{name}}</p>
              <div><p>{{count}}</p></div>
            </a>
          </li>
        {{/each}}
  `;
}

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
