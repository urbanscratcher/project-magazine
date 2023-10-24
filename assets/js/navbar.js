/* --------------------------------
- Purpose: sticky nav bar, acccess & saved menu event
- Author: Hyunjung Joun
-------------------------------- */
stickyNavbar();
addAccessBtnEvents();
addSavedBtnEvents();

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
}

function addAccessBtnEvents() {
  // add accessibility button styling event
  const btnAccess = document.querySelector(".btn__access");
  btnAccess.addEventListener("mouseenter", hoverAccessBtnHandler);
  btnAccess.addEventListener("mouseleave", leaveAccessBtnHandler);

  // add accessibility event
  const modalAccessibility = document.querySelector(".modal__accessibility");
  btnAccess.addEventListener("click", accessibilityHandler);
}

function addSavedBtnEvents() {
  // add saved button styling event
  const btnSaved = document.querySelector(".btn__saved");
  btnSaved.addEventListener("mouseenter", hoverSavedBtnHandler);
  btnSaved.addEventListener("mouseleave", leaveSavedBtnHandler);
}
