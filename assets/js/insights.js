/* --------------------------------
- Purpose: Get data and render
- Author: Hyunjung Joun
-------------------------------- */

// Fetch Data
fetch("/data/insights/data.json")
  .then((res) => res.json())
  .then((data) => {
    const insightsData = data.insights.map((el) => {
      const dateObj = new Date(el.createdAt);

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        dateObj
      );

      const mappedEl = {
        ...el,
        createdAt: dateObj,
      };

      return mappedEl;
    });

    // public functions --------------------------
    function renderCover() {
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
          const matchedData = insightsData.find((el) => el.id === coverId);
          insertFirstChild(parentEl, render(newHtml, matchedData));
        })
        .catch((error) => {
          console.error("error: ", err);
        });
    }

    function renderEditorsPick() {
      fetch("/data/insights/data-editorsPick.json")
        .then((res) => res.json())
        .then((editorsPickData) => {
          const coverId = editorsPickData.insightsEditorsPick?.cover ?? 1;
          const sub1Id = editorsPickData.insightsEditorsPick?.sub1 ?? 1;
          const sub2Id = editorsPickData.insightsEditorsPick?.sub2 ?? 1;
          const sub3Id = editorsPickData.insightsEditorsPick?.sub3 ?? 1;

          const editorsPick = {
            cover: insightsData.find((el) => el.id === coverId),
            list: [
              insightsData.find((el) => el.id === sub1Id),
              insightsData.find((el) => el.id === sub2Id),
              insightsData.find((el) => el.id === sub3Id),
            ],
          };

          editorsPickCoverImg(editorsPick.cover);
          editorsPickTopic(editorsPick.cover);
          editorsPickTitle(editorsPick.cover);
          eidtorsPickList(editorsPick.list);
        })
        .catch((err) => console.error("error: " + err));
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

    function renderTrending() {
      fetch("/data/insights/data-trending.json")
        .then((res) => res.json())
        .then((trendingData) => {
          const trendingIds = trendingData?.insightsTrending ?? [{ id: 1 }];
          const trendings = [];

          for (trendingId of trendingIds) {
            const trending = insightsData.find((el) => el.id === trendingId.id);
            trendings.push(trending);
          }

          trendings.sort((a, b) => b.createdAt - a.createdAt);

          trendingMainImg(trendings[0]);
        })
        .catch((err) => console.error("error: " + err));
    }

    // private functions --------------------------
    function trendingMainImg(data) {
      const newHtml = () => `
        <img src="{{thumbnail}}" class="img--ratio-169" />
      `;
      const parentEl = document.querySelector(".trending__main .main__img");
      insertFirstChild(parentEl, render(newHtml, data));
    }

    function editorsPickCoverImg(data) {
      const newHtml = () => `
      <img
        src="{{thumbnail}}"
        class="img--ratio-169"
      />         
    `;

      const parentEl = document.querySelector(".editorsPick__img");

      insertFirstChild(parentEl, render(newHtml, data));
    }

    function editorsPickTopic(data) {
      const newHtml = () => `
      <a href="#" class="topic ts--btn">{{topic}}</a>
      `;

      const parentEl = document.querySelector(".editorsPick__topic");

      insertFirstChild(parentEl, render(newHtml, data));
    }

    function editorsPickTitle(data) {
      const newHtml = () => `
      <a class="serif hover--txt ts--h3" href="#">{{title}}</a>
      `;
      const parentEl = document.querySelector(".editorsPick__title");
      insertFirstChild(parentEl, render(newHtml, data));
    }

    function eidtorsPickList(list) {
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
          insights: list,
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
    fetch("/index.html")
      .then((res) => res.text())
      .then((html) => {
        renderCover();
        renderEditorsPick();
        renderTopicCounts();
        renderTrending();
      })

      .catch((err) => {
        console.error("error: ", err);
      });
  })
  .catch((err) => {
    console.error("error: ", err);
  });
