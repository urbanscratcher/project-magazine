/* --------------------------------
- Purpose: Get data and render
- Author: Hyunjung Joun
-------------------------------- */

// Fetch Data
fetch("/data/insights/data.json")
  .then((res) => res.json())
  .then((data) => {
    // inspirations
    const shuffledArr = shuffle(data.insights, 6);
    insertAfterTemplate("inspirationsTemplate", { data: shuffledArr });

    // cover, editorspick, trending, the latest, featured authors
    fetch("/data/authors/data.json")
      .then((res) => res.json())
      .then((authorsData) => {
        function getAuthor(id) {
          return authorsData.authors.find((el) => el.id === id);
        }

        const insightsData = data.insights.map((el) => {
          const mappedEl = { ...el };
          mappedEl.createdAt = new Date(el.createdAt);
          mappedEl.author = getAuthor(el.author.id);
          return mappedEl;
        });

        // public functions --------------------------
        function renderCover() {
          fetch("/data/insights/data-cover.json")
            .then((res) => res.json())
            .then((coverData) => {
              const coverId = coverData.insightsCover[0].id;
              const matchedData = insightsData.find((el) => el.id === coverId);

              insertAfterTemplate("coverTopicTemplate", matchedData);
              insertAfterTemplate("coverThumbnailTemplate", matchedData);
              insertAfterTemplate("coverTitleTemplate", matchedData);
            })
            .catch((err) => {
              console.error("error: ", err);
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

              insertAfterTemplate("editorsPickImgTemplate", list[0]);
              insertAfterTemplate("editorsPickTopicTemplate", list[0]);
              insertAfterTemplate("editorsPickTitleTemplate", list[0]);
              eidtorsPickList(list.slice(1, 5));
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
                el.createdAt <= Date.now() &&
                el.createdAt > Date.now() - msOf7Days
            )
            .sort((a, b) => b.viewCount - a.viewCount);

          trendingMain(trendings[0]);
          trendingList(trendings.slice(1, trendings.length));
        }

        function renderLatest() {
          const latestList = [...insightsData]
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 4);

          latestList.map(
            (el) => (el.createdAt = printDateDifference(el.createdAt))
          );

          insertAfterTemplate("latestTemplate", { data: latestList });
        }

        // private functions --------------------------
        function trendingList(list) {
          insertAfterTemplate("trendingListTemplate", { data: list });
        }

        function trendingMain(data) {
          insertAfterTemplate("trendingMainImgTemplate", data);
          insertAfterTemplate("trendingMainTopicTemplate", data);
          insertAfterTemplate("trendingMainTitle", data);
          insertAfterTemplate("trendingMainSummary", data);
          insertAfterTemplate("trendingMainTtrTemplate", data);
          trendingMainCreatedAt(data);

          insertAfterTemplate("trendingMainAuthor", getAuthor(data.author.id));
        }

        function trendingMainCreatedAt(data) {
          const dateDifference = printDateDifference(data.createdAt);
          const newHtml = () => `
       ${printDateDifference(data.createdAt)}
      `;
          const parentEl = document.querySelector(".trending__main .createdAt");
          insert(parentEl, render(newHtml, {}));
        }

        function editorsPickImgTemplate(data) {
          const editorsPickImg = document.getElementById("editorsPickImg");
          insertAfter(
            editorsPickImg,
            render(() => editorsPickImg.innerHTML, data)
          );
        }

        function eidtorsPickList(list) {
          const newHtml = () =>
            document.getElementById("editorsPickListTemplate").innerHTML;

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
            // events
            onClickShuffle(data);

            // render
            renderCover();
            renderEditorsPick();
            renderTopicCounts();
            renderTrendings();
            renderLatest();

            // components
            loadBookmark();
          })
          .catch((err) => {
            console.error("error: ", err);
          });
      });
  })
  .catch((err) => {
    console.error("error: ", err);
  });

function onClickShuffle(data) {
  const button = document.getElementById("shuffleImage");
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const imgList = document.getElementsByClassName("inspirations__list");
    const imgItems = document.querySelectorAll(".inspirations__list > li");
    const shuffledArr = shuffle(data.insights, 6);
    for (i of imgItems) {
      imgList[0].removeChild(i);
    }
    insertAfterTemplate("inspirationsTemplate", { data: shuffledArr });
  });
}
