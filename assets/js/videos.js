/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

fetch("/index.html")
  .then((html) => {
    fetch("/data/videos/data.json")
      .then((res) => res.json())
      .then((data) => {
        const lowerCasedData = data.videos.map((el) => {
          el.title = el.title.toLowerCase();
          return el;
        });

        const list = lowerCasedData.slice(1, 5);

        insertAfterTemplate("videoCoverTemplate", lowerCasedData[0]);
        insertAfterTemplate("videoListTemplate", { data: list });
      })
      .catch((err) => console.error("error: ", err));
  })
  .catch((err) => console.error("error: ", err));
