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

function onClickVideo() {
  const buttons = document.getElementsByClassName("btn-video");

  for (const button of buttons) {
    button.addEventListener("click", (e) => videoPlayHandler(e));
    document.removeEventListener("click", onClickVideo);
  }
}

function videoPlayHandler(e) {
  e.preventDefault();
  const parentEl = e.currentTarget.parentNode.parentNode;
  const id = +parentEl.getAttribute("data-id");
  const overlay = document.getElementsByClassName("modal__overlay")[0];
  const video = document.getElementsByClassName("modal__video")[0];
  video.classList.remove("invisible");
  overlay.classList.remove("invisible");
  video.src = `/data/videos/media/${id}.webm`;
  video.autoplay = true;
}

function onClickOverlay() {
  const overlay = document.getElementsByClassName("modal__overlay")[0];
  overlay.addEventListener("click", (e) => overlayCloseHandler(e));
  document.removeEventListener("click", onClickOverlay);
}

function overlayCloseHandler(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    const video = document.getElementsByClassName("modal__video")[0];
    video.pause();
    video.src = "";
    video.autoplay = false;

    video.classList.add("invisible");
    e.target.classList.add("invisible");

    // remove grayscale event
    const switchGrayEl = document.querySelector(".switch__grayscale");
    switchGrayEl.removeEventListener("click", switchGrayscaleHandler);

    // remove font size decrease event
    const decSizeBtn = document.querySelector(".decrement__size");
    decSizeBtn.removeEventListener("click", decreaseFontSizeHandler);

    // remove font size increase event
    const incSizeBtn = document.querySelector(".increment__size");
    incSizeBtn.removeEventListener("click", increaseFontSizeHandler);

    // remove font size default event
    const defaultSizeBtn = document.querySelector(".btn__default--size");
    defaultSizeBtn.removeEventListener("click", defaultFontSizeHandler);

    // remove line height decrease event
    const decHeightBtn = document.querySelector(".decrement__height");
    decHeightBtn.removeEventListener("click", decreaseLineHeightHandler);

    // remove line height increase event
    const incHeightBtn = document.querySelector(".increment__height");
    incHeightBtn.removeEventListener("click", increaseLineHeightHandler);

    // remove line height default event
    const defaultHeightBtn = document.querySelector(".btn__default--height");
    defaultHeightBtn.removeEventListener("click", defaultLineHeightHandler);
  }
}
