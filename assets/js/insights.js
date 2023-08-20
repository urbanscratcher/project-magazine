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

      const mappedEl = {
        ...el,
        createdAt: dateObj,
      };

      return mappedEl;
    });

    // public functions --------------------------
    function renderCover() {
      const coverTopicEl = document.getElementById("coverTopicTemplate");
      const coverThumbnailEl = document.getElementById(
        "coverThumbnailTemplate"
      );
      const coverTitleEl = document.getElementById("coverTitleTemplate");

      fetch("/data/insights/data-cover.json")
        .then((res) => res.json())
        .then((coverData) => {
          const coverId = coverData.insightsCover[0].id;
          const matchedData = insightsData.find((el) => el.id === coverId);

          insertAfter(
            coverTopicEl,
            render(() => coverTopicEl.innerHTML, matchedData)
          );

          insertAfter(
            coverThumbnailEl,
            render(() => coverThumbnailEl.innerHTML, matchedData)
          );

          insertAfter(
            coverTitleEl,
            render(() => coverTitleEl.innerHTML, matchedData)
          );
        })
        .catch((error) => {
          console.error("error: ", error);
        });
    }

    function renderEditorsPick() {
      fetch("/data/insights/data-editorsPick.json")
        .then((res) => res.json())
        .then((editorsPickData) => {
          const list = [];

          for (const item of editorsPickData.insightsEditorsPick) {
            list.push(insightsData.find((el) => el.id === item.id));
          }

          editorsPickCoverImg(list[0]);
          editorsPickTopic(list[0]);
          editorsPickTitle(list[0]);
          eidtorsPickList(list.slice(1, 4));
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

    function renderTrendings() {
      const msOf7Days = 1000 * 60 * 60 * 24 * 7;
      const trendings = [...insightsData]
        .filter(
          (el) =>
            el.createdAt <= Date.now() && el.createdAt > Date.now() - msOf7Days
        )
        .sort((a, b) => b.viewCount - a.viewCount);

      for (let idx = 0; idx < trendings.length; idx++) {
        if (idx !== 0) {
          trendingList(trendings[idx]);
          continue;
        }

        trendingMain(trendings[idx]);
      }
    }

    // private functions --------------------------
    function trendingList(data) {
      const newHtml = () => `
        <li class="trending__item col gap--s">
          <div class="topic__wrapper">
            <a href="#" class="topic ts--btn">{{topic}}</a>
          </div>
          <div class="title-row row gap--s">
            <h4 class="title-row__txt hover--txt serif">{{title}}</h4>
            <div class="title-row__img section__img">
              <img src="{{thumbnail}}" />
              <div class="component-bookmark-add"></div>
            </div>
          </div>
          <p class="author-row ts--body-s text-gray row gap--s">
            By
            <span class="author__name">{{author.name}}</span>
          </p>
        </li>
      `;

      const parentEl = document.querySelector(".trending__list");

      getAuthor(data.author.id).then((author) => {
        data.author.name = author ? author.name : "Anonymous";
        insertFirstChild(parentEl, render(newHtml, data));
      });
    }

    function trendingMain(data) {
      trendingMainImg(data);
      trendingMainTopic(data);
      trendingMainTitle(data);
      trendingMainSummary(data);
      trendingMainCreatedAt(data);
      trendingMainTtr(data);
      trendingMainAuthor(data);
    }

    function trendingMainAuthor(data) {
      getAuthor(data.author.id).then((author) => {
        if (!author) {
          author = { name: "Anonymous" };
        }

        const newHtml = () => `
        {{name}}
      `;
        const parentEl = document.querySelector(
          ".trending__main .author__name"
        );

        insert(parentEl, render(newHtml, author));
      });
    }

    function trendingMainTtr(data) {
      const newHtml = () => `
        {{ttr}}
      `;
      const parentEl = document.querySelector(".trending__main .ttr");

      insert(parentEl, render(newHtml, data));
    }

    function trendingMainCreatedAt(data) {
      const dateDifference = printDateDifference(data.createdAt);
      const newHtml = () => `
       ${printDateDifference(data.createdAt)}
      `;
      const parentEl = document.querySelector(".trending__main .createdAt");
      insert(parentEl, render(newHtml, {}));
    }

    function trendingMainSummary(data) {
      const newHtml = () => `
        {{summary}}
      `;
      const parentEl = document.querySelector(".trending__main .main__summary");
      insert(parentEl, render(newHtml, data));
    }

    function trendingMainTitle(data) {
      const newHtml = () => `
        {{title}}
      `;
      const parentEl = document.querySelector(".trending__main .main__title");
      insertFirstChild(parentEl, render(newHtml, data));
    }

    function trendingMainTopic(data) {
      const newHtml = () => `
      <a href="#" class="topic ts--btn">
        {{topic}}
      </a>
      `;
      const parentEl = document.querySelector(
        ".trending__main .topic__wrapper"
      );
      insert(parentEl, render(newHtml, data));
    }

    function trendingMainImg(data) {
      const newHtml = () => `
        <img src="{{thumbnail}}" class="img--ratio-169" />
      `;
      const parentEl = document.querySelector(".trending__main .section__img");
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
        renderTrendings();
      })

      .catch((err) => {
        console.error("error: ", err);
      });
  })
  .catch((err) => {
    console.error("error: ", err);
  });
