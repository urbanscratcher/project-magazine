fetch("/data/insights/data.json")
  .then((res) => res.json())
  .then((data) => {
    // rendering
    const shuffledArr = shuffle(data.insights, 6);
    insertAfterTemplate("inspirationsTemplate", { data: shuffledArr });

    // events
    const button = document.getElementById("shuffleImage");
    button.addEventListener("click", onClickShuffle);
  })
  .catch((err) => console.error("error: ", err));

function onClickShuffle(e) {
  e.preventDefault();
  const imgList = document.getElementsByClassName("inspirations__list");
  const imgItems = document.querySelectorAll(".inspirations__list > li");
  const shuffledArr = shuffle(data.insights, 6);
  for (i of imgItems) {
    imgList[0].removeChild(i);
  }
  insertAfterTemplate("inspirationsTemplate", { data: shuffledArr });

  e.target.removeEventListener("click", onClickShuffle);
}
