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
