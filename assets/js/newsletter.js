/* --------------------------------
- Purpose: Load Component
- Author: Hyunjung Joun
-------------------------------- */

// Fetch the template file -----------------

const newHtml = () => document.getElementById("newsletterTemplate").innerHTML;

const parentEls = document.getElementsByClassName("component-newsletter");

for (let i = 0; i < parentEls.length; i++) {
  insert(parentEls[i], render(newHtml, {}));
}
