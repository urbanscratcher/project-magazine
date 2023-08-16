/* --------------------------------
- Purpose: Load Component
- Author: Hyunjung Joun
-------------------------------- */

// Fetch the template file -----------------
fetch("../../index.html")
  .then((res) => res.text())
  .then((html) => {
    const newHtml = () => `
    <div class="col gap--m">
      <p class="newsletter__description">
      Subscribe our newsletter to get the latest updates all about
      architecture
      </p>
      <form class="newsletter__form col gap--m">
        <div class="newsletter__inputs col gap--s">
          <input
            class="newsletter__input"
            placeholder="Enter your full name"
          />
          <input
            class="newsletter__input"
            placeholder="Enter your email"
          />
        </div>
        <label class="newsletter__consent">
          <input
            type="checkbox"            
            class="newsletter__checkbox"
          />
          By signing up, you agree to our terms and privacy policy
        </label>
        <input
          type="submit"
          class="newsletter__submit btn-primary ts--btn"
          value="subscribe"
        />
      </form>
    </div>
  `;

    const parentEls = document.getElementsByClassName("component-newsletter");

    for (let i = 0; i < parentEls.length; i++) {
      insert(parentEls[i], render(newHtml, {}));
    }
  })
  .catch((err) => {
    console.error("error: ", err);
  });
