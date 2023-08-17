/* --------------------------------
- Purpose: Get data and render
- Author: Hyunjung Joun
-------------------------------- */

// Fetch Data
fetch("/data/insights/data.json")
  .then((res) => res.json())
  .then((data) => {
    // public functions --------------------------
    function cover() {
      const newHtml = () => `
      <div class="cover__bg bg--img" style="--img-url: url({{thumbnail}})"></div>
      <div class="cover__txt col container--m gap--m tc--white">
        <div class="cover__topic">
          <a href="#" class="topic--white ts--btn">{{topic}}</a>
        </div>
        <div class="cover__headline">
          <h1 href="#" class="serif hover--txt">
            {{title}}
          </h1>
        </div>
      </div>          
    `;

      const parentEl = document.getElementById("cover");

      fetch("/data/insights/data-cover.json")
        .then((res) => res.json())
        .then((coverData) => {
          const coverId = coverData.insightsCover[0].id;
          const matchedData = data.insights.find((el) => el.id === coverId);
          insertFirstChild(parentEl, render(newHtml, matchedData));
        })
        .catch((error) => {
          console.error("error: ", err);
        });
    }

    function editorsPick() {
      // fetch("/data/insights/data-editorsPick.json")
      editorsPickCoverImg();
      editorsPickTopic();
      editorsPickTitle();
      eidtorsPickList();
    }

    function renderTopicCounts() {
      const topicNameEls = document.querySelectorAll(
        ".topTopics__list .topics__name"
      );
      const counted = countTopics();

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

    // private functions --------------------------
    function editorsPickCoverImg() {
      const newHtml = () => `
      <img
        src="{{thumbnail}}"
        class="img--ratio-169"
      />         
    `;

      const parentEl = document.querySelector(".editorsPick__img");

      insertFirstChild(parentEl, render(newHtml, data.insights[1]));
    }

    function editorsPickTopic() {
      const newHtml = () => `
      <a href="#" class="topic ts--btn">{{topic}}</a>
      `;

      const parentEl = document.querySelector(".editorsPick__topic");

      insertFirstChild(parentEl, render(newHtml, data.insights[1]));
    }

    function editorsPickTitle() {
      const newHtml = () => `
      <a class="serif hover--txt ts--h3" href="#">{{title}}</a>
      `;
      const parentEl = document.querySelector(".editorsPick__title");
      insertFirstChild(parentEl, render(newHtml, data.insights[1]));
    }

    function eidtorsPickList() {
      const newHtml = () => `
      {{#each insights}}
      <li class="editorsPick__list-item ts--h4 serif">
        <a href="#" class="editorsPick__list-txt hover--txt">{{title}}</a>
      </li>
      {{/each}}      
      `;
      const parentEl = document.querySelector(".editorsPick__list");
      insert(
        parentEl,
        render(newHtml, {
          insights: [data.insights[2], data.insights[3], data.insights[4]],
        })
      );
    }

    function countTopics() {
      // Create an object to store category counts
      const result = {};

      // Iterate through the array
      for (const insight of data.insights) {
        const category = insight.topic;
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

    // Fetch the template file -----------------
    fetch("../../index.html")
      .then((res) => res.text())
      .then((html) => {
        cover();
        editorsPick();
        renderTopicCounts();
      })

      .catch((err) => {
        console.error("error: ", err);
      });
  })
  .catch((err) => {
    console.error("error: ", err);
  });
