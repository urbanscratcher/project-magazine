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
