/* --------------------------------
- Purpose: to manage helper functions in one place. Mostly comes from refactoring.
- Author: Hyunjung Joun
-------------------------------- */

// Refactored functions for HandleBars -------------
function compile(fn) {
  return Handlebars.compile(fn);
}

function render(fn, data) {
  const template = compile(fn());
  const renderedHtml = template(data);
  return renderedHtml;
}

function insert(el, html) {
  el.innerHTML = html;
}

function insertFirstChild(el, html) {
  el.insertAdjacentHTML("afterbegin", html);
}

function insertAfter(el, html) {
  el.insertAdjacentHTML("afterend", html);
}

function insertAfterTemplate(templateId, data) {
  const el = document.getElementById(templateId);
  insertAfter(
    el,
    render(() => el.innerHTML, data)
  );
}

function insertAfterElementTemplate(el, templateId, data) {
  insertAfter(
    el,
    render(() => document.getElementById(templateId).innerHTML, data)
  );
}

// Util Functions ----------------------------------
function printDateDifference(startedAt) {
  const now = new Date();
  const difference = now - startedAt;

  const msPerSec = 1000;
  const msPerMin = 60 * msPerSec;
  const msPerHour = 60 * msPerMin;
  const msPerDay = 24 * msPerHour;
  const msPerWeek = 7 * msPerDay;

  const daysDiff = difference / msPerDay;

  if (difference / msPerMin < 1 && difference / msPerMin > 0) {
    const secondsDifference = Math.floor((difference % msPerMin) / msPerSec);
    return `${secondsDifference} sec ago`;
  }

  if (difference / msPerHour < 1) {
    const minutesDifference = Math.floor((difference % msPerHour) / msPerMin);
    return `${minutesDifference} min ago`;
  }

  if (difference / msPerDay < 1) {
    const hoursDifference = Math.floor((difference % msPerDay) / msPerHour);
    return `${hoursDifference} hour${hoursDifference === 1 ? "" : "s"} ago`;
  }

  if (difference / msPerWeek < 1) {
    const daysDifference = Math.floor((difference % msPerWeek) / msPerDay);
    return `${daysDifference} day${daysDifference === 1 ? "" : "s"} ago`;
  }

  const startedYear = startedAt.getFullYear();
  const currentYear = now.getFullYear();

  const options = {
    month: "short",
    day: "numeric",
    year: startedYear !== currentYear ? "numeric" : undefined,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    startedAt
  );

  return formattedDate;
}

function shuffle(originalArray, cnt) {
  if (cnt <= originalArray.length) {
    const arr = [...originalArray];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.slice(0, cnt);
  }
}

// change css theme ------------------------
function changeGrayscale() {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", "#b9b9b9");
  root.style.setProperty("--color-primary-light", "#d7d7d7");
  root.style.setProperty("--color-primary-lightest", "#ececec");
  root.style.setProperty("--color-primary-filter", "#53535393");

  root.style.setProperty("--color-secondary-light", "#e7e7e7");
  root.style.setProperty("--color-secondary", "#636363");
  root.style.setProperty("--color-secondary-dark", "#454545");

  root.style.setProperty("--color-mint-light", "#ececec");

  const logoEls = document.querySelectorAll(".navbar__logo, .footer__logo-img");
  logoEls.forEach((el) => el.classList.add("img--gray"));
}

function defaultTheme() {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", "#d4ef69");
  root.style.setProperty("--color-primary-light", "#edf4a5");
  root.style.setProperty("--color-primary-lightest", "#f0f5e0");
  root.style.setProperty("--color-primary-filter", "#606d2b93");

  root.style.setProperty("--color-secondary-light", "#dfe3f3");
  root.style.setProperty("--color-secondary", "#1743d1");
  root.style.setProperty("--color-secondary-dark", "#28396e");

  root.style.setProperty("--color-mint-light", "#e0f5ef");

  const logoEls = document.querySelectorAll(".navbar__logo, .footer__logo-img");
  logoEls.forEach((el) => el.classList.remove("img--gray"));
}

// event handlers ---------------------------------------------------
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
