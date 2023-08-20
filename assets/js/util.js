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
