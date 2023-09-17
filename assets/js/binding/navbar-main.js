/* --------------------------------
- Purpose: Makae the main navigation bar sticky
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

stickyNavbar();

function stickyNavbar() {
  const section = document.querySelector("#highlights");

  const observer = new IntersectionObserver(function callback(
    entries,
    observer
  ) {
    entries.forEach((entry) => {
      const navEl = document.querySelector(".navbar__wrapper");
      const menuItemEls = document.querySelectorAll(".menu__item");
      const logoEl = document.querySelector(".navbar__logo");

      console.log(menuItemEls);

      if (entry.isIntersecting) {
        navEl.classList.add("navbar__wrapper--transparent");
        navEl.classList.remove("navbar__wrapper--white");
        menuItemEls.forEach((el) =>
          el.classList.add("menu__item--transparent")
        );
        logoEl.classList.add("logo--white");
      } else {
        navEl.classList.remove("navbar__wrapper--transparent");
        navEl.classList.add("navbar__wrapper--white");
        menuItemEls.forEach((el) =>
          el.classList.remove("menu__item--transparent")
        );
        logoEl.classList.remove("logo--white");
      }
    });
  });

  observer.observe(section);
}
