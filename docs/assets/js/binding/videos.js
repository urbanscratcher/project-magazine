/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

renderVideos();

async function renderVideos() {
  try {
    // get data
    const lowerCasedData = await getVideoList();
    const list = lowerCasedData.slice(1, 5);

    // render
    insertAfterTemplate("videoCoverTemplate", lowerCasedData[0]);
    insertAfterTemplate("videoListTemplate", { data: list });

    // add click events
    onClickVideo();
    onClickOverlay();
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
  const overlayEl = document.querySelector(".modal__overlay");
  overlayEl.addEventListener("click", overlayCloseHandler);
  document.removeEventListener("click", onClickOverlay);
}
