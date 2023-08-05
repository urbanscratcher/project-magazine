// Refactored functions for HandleBars Template
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
