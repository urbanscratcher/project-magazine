/* --------------------------------
- Purpose: Makae the navigation bar sticky
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

  if (section) {
    observer.observe(section);
  }

  // btn styling
  const btnSaved = document.querySelector(".btn__saved");
  const iconSaved = document.querySelector(".icon__saved");
  btnSaved.addEventListener("mouseenter", () => {
    iconSaved.classList.add("fa-solid");
  });
  btnSaved.addEventListener("mouseleave", () => {
    if (window.location.pathname === "/saved") {
      iconSaved.classList.add("fa-solid");
    } else {
      iconSaved.classList.remove("fa-solid");
    }
  });

  const btnAccess = document.querySelector(".btn__access");
  const iconAccess = document.querySelector(".icon__access");
  btnAccess.addEventListener("mouseenter", () => {
    iconAccess.classList.add("fa-solid");
  });
  btnAccess.addEventListener("mouseleave", () => {
    if (window.location.pathname === "/access") {
      iconSaved.classList.add("fa-solid");
    } else {
      iconAccess.classList.remove("fa-solid");
    }
  });
}
