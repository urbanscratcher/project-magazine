/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

fetch("/data/videos/data.json")
  .then((res) => res.json())
  .then((data) => {
    const lowerCasedData = data.videos.map((el) => {
      el.title = el.title.toLowerCase();
      return el;
    });

    const list = lowerCasedData.slice(1, 5);

    fetch("/index.html")
      .then((res) => res.text)
      .then((html) => {
        // rendering
        insertAfterTemplate("videoCoverTemplate", lowerCasedData[0]);
        insertAfterTemplate("videoListTemplate", { data: list });

        // events
        onClickVideo();
        onClickOverlay();
      })
      .catch((err) => console.error("error: ", err));
  })
  .catch((err) => console.error("error: ", err));

function onClickVideo() {
  const buttons = document.getElementsByClassName("btn-video");

  for (const button of buttons) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const parentEl = e.currentTarget.parentNode.parentNode;
      const id = +parentEl.getAttribute("data-id");
      const overlay = document.getElementsByClassName("modal__overlay")[0];
      const video = document.getElementsByClassName("modal__video")[0];
      console.log(video);
      video.style.display = "initial";
      overlay.style.display = "initial";
      video.src = `/data/videos/media/${id}.webm`;
      video.autoplay = true;
    });
  }
}

function onClickOverlay() {
  const overlay = document.getElementsByClassName("modal__overlay")[0];

  overlay.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target === overlay) {
      const video = document.getElementsByClassName("modal__video")[0];
      video.pause();
      video.src = "";
      video.autoplay = false;
      video.style.display = "none";
      overlay.style.display = "none";
    }
  });
}
