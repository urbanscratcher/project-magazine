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

    // rendering
    insertAfterTemplate("videoCoverTemplate", lowerCasedData[0]);
    insertAfterTemplate("videoListTemplate", { data: list });

    // events
    onClickVideo();
    onClickOverlay();
  })
  .catch((err) => console.error("error: ", err));

async function renderVideo() {
  try {
  } catch (err) {
    console.error(err);
  }
}

function onClickVideo() {
  const videoBtns = document.getElementsByClassName("btn-video");

  for (const btn of videoBtns) {
    btn.addEventListener("click", playVideoHandler);
    document.removeEventListener("click", onClickVideo);
  }
}

function onClickOverlay() {
  const overlay = document.getElementsByClassName("modal__overlay")[0];
  overlay.addEventListener("click", overlayCloseHandler);
  document.removeEventListener("click", onClickOverlay);
}
