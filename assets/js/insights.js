/* --------------------------------
- Purpose: Get cover data and render
- Author: Hyunjung Joun
-------------------------------- */

// Fetch Data
fetch("../../data/insights/data.json")
  .then((res) => res.json())
  .then((data) => {
    function coverTxt() {
      const newHtml = () => `
      <div class="cover__bg bg--img" style="--img-url: url({{thumbnail}})"></div>
      <div class="cover__txt col container--m gap--m tc--white">
        <div class="cover__topic">
          <a href="#" class="topic--white ts--btn">{{topic}}</a>
        </div>
        <div class="cover__headline">
          <a href="#" class="ts--h1 serif hover--txt">
            {{title}}
          </a>
        </div>
      </div>          
    `;

      const parentEl = document.getElementById("cover");
      insertFirstChild(parentEl, render(newHtml, data.insights[0]));
    }

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

    // Fetch the template file -----------------
    fetch("../../index.html")
      .then((res) => res.text())
      .then((html) => {
        coverTxt();
        editorsPickCoverImg();
        editorsPickTopic();
        editorsPickTitle();
        eidtorsPickList();
      })
      .catch((err) => {
        console.error("error: ", err);
      });
  })
  .catch((err) => {
    console.error("error: ", err);
  });
