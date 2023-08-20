/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

fetch("/index.html")
  .then((html) => {
    fetch("/data/videos/data.json")
      .then((res) => res.json())
      .then((data) => {
        const list = data.videos.slice(1, 5);
        insertAfterTemplate("videoCoverTemplate", data.videos[0]);
        insertAfterTemplate("videoListTemplate", { data: list });
      })
      .catch((err) => console.error("error: ", err));
  })
  .catch((err) => console.error("error: ", err));
