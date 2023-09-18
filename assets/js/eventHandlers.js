/* --------------------------------
- Purpose: All event handlers
- Author: Hyunjung Joun
-------------------------------- */

async function shuffleHandler(e) {
  e.preventDefault();

  const imgList = document.getElementsByClassName("inspirations__list");
  const imgItems = document.querySelectorAll(".inspirations__list > li");
  const insights = await getInsightList();
  const shuffledArr = shuffle(insights, 6);
  for (i of imgItems) {
    imgList[0].removeChild(i);
  }
  insertAfterTemplate("inspirationsTemplate", { data: shuffledArr });

  e.target.removeEventListener("click", shuffleHandler);
}

function toggleSortHandler(e) {
  curIsLatest = !curIsLatest;
  history.replaceState(
    {
      selectedTopic: curTopic,
      selectedSort: curIsLatest,
    },
    null,
    `${window.location.pathname}?topic=${curTopic}`
  );
  renderSortedInsights(curTopic, curIsLatest);
}

async function copyArticleLinkHandler(e) {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert(`This article's link is copied!\n${window.location.href}`);
  } catch (err) {
    console.error(err);
  }
}

async function moreAuthorsHandler(e, offset, limit, allAuthors) {
  const lastItemEl = document.querySelector(".authors__item:last-child");

  // render next authors
  const nextAuthors = await getAuthorList(offset + limit, limit);
  insertAfterElementTemplate(lastItemEl, "authorsTemplate", {
    data: nextAuthors,
  });

  // hide button if all are loaded
  const itemEls = document.querySelectorAll(".authors__item");
  if (itemEls.length === allAuthors.length) {
    e.target.style = `display:none`;
  }
}

async function copyAuthorEmailHandler(author) {
  try {
    await navigator.clipboard.writeText(author.email);
    alert(`${author.name}'s email< ${author.email} > is copied!`);
  } catch (err) {
    console.error(err);
  }
}

function clickBookmarkBtnHandler(e) {
  e.stopPropagation();

  const insightId = +e.currentTarget.dataset.id;
  if (insightId) {
    // Load user's saved insight list from local storage
    let storedInsights = localStorage.getItem("myInsights");
    if (!storedInsights) {
      storedInsights = JSON.stringify([]);
      localStorage.setItem("myInsights", storedInsights);
    }
    const myInsights = JSON.parse(storedInsights);

    // Remove repeated article before saving
    const newSet = new Set();
    myInsights.push(insightId);
    myInsights.forEach((i) => newSet.add(i));
    const newArray = Array.from(newSet);

    // Do action only if it is not repeated article
    if (
      myInsights.length === 0 ||
      JSON.parse(storedInsights).length < newArray.length
    ) {
      localStorage.setItem("myInsights", JSON.stringify(newArray));

      // Animation Effect : when an article is added, saved button in the navbar moves
      const savedBtn = document.querySelector(".btn__saved");
      savedBtn.classList.add("btn__saved--moving");
      setTimeout(function () {
        savedBtn.classList.remove("btn__saved--moving");
      }, 500);
    }
  }
}

function submitNewsletterHandler(e) {
  e.preventDefault();

  const name = e.target.children[0].children[0].value;
  const email = e.target.children[0].children[1].value;
  const isConsent = e.target.children[1].children[0].checked;
  let messsage;

  switch (true) {
    case !name || !email:
      messsage = `Please enter your name and email.`;
      break;
    case name && email && isConsent:
      messsage = `${name}, you successfully subscribed :)\nOur weekly newsletter will be sent to your email < ${email} >`;
      e.target.children[0].children[0].value = "";
      e.target.children[0].children[1].value = "";
      e.target.children[1].children[0].checked = false;
      break;
    case name && email && !isConsent:
      messsage = `You need to agree to our terms and privacy policy.`;
      break;
    default:
      messsage = "";
      break;
  }

  alert(messsage);
}

function hoverAccessBtnHandler(e) {
  const iconAccess = document.querySelector(".icon__access");
  iconAccess.classList.add("fa-solid");
}

function leaveAccessBtnHandler(e) {
  const iconAccess = document.querySelector(".icon__access");
  if (window.location.pathname === "/access") {
    iconSaved.classList.add("fa-solid");
  } else {
    iconAccess.classList.remove("fa-solid");
  }
}

function hoverSavedBtnHandler(e) {
  const iconSaved = document.querySelector(".icon__saved");
  iconSaved.classList.add("fa-solid");
}

function leaveSavedBtnHandler(e) {
  const iconSaved = document.querySelector(".icon__saved");
  if (window.location.pathname === "/saved") {
    iconSaved.classList.add("fa-solid");
  } else {
    iconSaved.classList.remove("fa-solid");
  }
}

function accessibilityHandler(e) {
  const modalAccessibility = document.querySelector(".modal__accessibility");
  const modalOverlay = document.querySelector(".modal__overlay");

  modalOverlay.classList.remove("invisible");
  modalAccessibility.classList.remove("invisible");

  // add grayscale event
  const switchGrayEl = document.querySelector(".switch__grayscale");
  switchGrayEl.addEventListener("click", switchGrayscaleHandler);

  // add font size decrease event
  const decSizeBtn = document.querySelector(".decrement__size");
  decSizeBtn.addEventListener("click", decreaseFontSizeHandler);

  // add font size increase event
  const incSizeBtn = document.querySelector(".increment__size");
  incSizeBtn.addEventListener("click", increaseFontSizeHandler);

  // add font size default event
  const defaultSizeBtn = document.querySelector(".btn__default--size");
  defaultSizeBtn.addEventListener("click", defaultFontSizeHandler);

  // add line height decrease event
  const decHeightBtn = document.querySelector(".decrement__height");
  decHeightBtn.addEventListener("click", decreaseLineHeightHandler);

  // add line height increase event
  const incHeightBtn = document.querySelector(".increment__height");
  incHeightBtn.addEventListener("click", increaseLineHeightHandler);

  // add line height default event
  const defaultHeightBtn = document.querySelector(".btn__default--height");
  defaultHeightBtn.addEventListener("click", defaultLineHeightHandler);
}

function switchGrayscaleHandler(e) {
  const switchBoxEl = document.querySelector(".switch__grayscale .switch__box");

  switchBoxEl.checked = !isGrayscale;
  isGrayscale = !isGrayscale;
  if (isGrayscale) {
    changeGrayscale();
  } else {
    defaultTheme();
  }
}

function decreaseFontSizeHandler(e) {
  const htmlEl = document.querySelector("html");
  const sizeValueEl = document.querySelector(".size__value");
  fontSizePercentage -= 62.5 * 0.08;
  htmlEl.style.fontSize = `${fontSizePercentage}%`;
  sizeValueEl.textContent -= 5;
}

function increaseFontSizeHandler(e) {
  const htmlEl = document.querySelector("html");
  const sizeValueEl = document.querySelector(".size__value");
  fontSizePercentage += 62.5 * 0.08;
  htmlEl.style.fontSize = `${fontSizePercentage}%`;
  sizeValueEl.textContent = +sizeValueEl.textContent + 5;
}

function defaultFontSizeHandler(e) {
  const htmlEl = document.querySelector("html");
  const sizeValueEl = document.querySelector(".size__value");
  fontSizePercentage = 62.5;
  htmlEl.style.fontSize = `${fontSizePercentage}%`;
  sizeValueEl.textContent = 100;
}

function decreaseLineHeightHandler(e) {
  const targetEls = document.querySelectorAll(
    "body, h1, h2, h3, h4, p, a, i, button, label, span, q"
  );
  const heightValueEl = document.querySelector(".height__value");
  targetEls.forEach((el) => {
    const computedStyle = getComputedStyle(el);
    const currentLineHeight = parseFloat(computedStyle.lineHeight);
    if (!isNaN(currentLineHeight)) {
      el.style.lineHeight = currentLineHeight * 0.95 + "px";
    }
  });
  heightValueEl.textContent = +heightValueEl.textContent - 5;
}

function increaseLineHeightHandler(e) {
  const targetEls = document.querySelectorAll(
    "body, h1, h2, h3, h4, p, a, i, button, label, span, q"
  );
  const heightValueEl = document.querySelector(".height__value");
  targetEls.forEach((el) => {
    const computedStyle = getComputedStyle(el);
    const currentLineHeight = parseFloat(computedStyle.lineHeight);
    if (!isNaN(currentLineHeight)) {
      el.style.lineHeight = currentLineHeight * 1.05 + "px";
    }
  });
  heightValueEl.textContent = +heightValueEl.textContent + 5;
}

function defaultLineHeightHandler(e) {
  const heightValueEl = document.querySelector(".height__value");
  const offset = +heightValueEl.textContent - 100;
  if (offset > 0) {
    const count = Math.round(offset / 5);
    for (let i = 0; i < count; i++) {
      decreaseLineHeightHandler();
    }
  } else if (offset < 0) {
    const count = -Math.round(offset / 5);
    for (let i = 0; i < count; i++) {
      increaseLineHeightHandler();
    }
  }
}
