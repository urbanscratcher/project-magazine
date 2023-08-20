/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

fetch("/data/authors/data.json")
  .then((res) => res.json())
  .then((data) => {
    const authors = [...data.authors]
      .sort((a, b) => b.id - a.id)
      .slice(0, 4)
      .map((el) => {
        el.topicsOneline = el.topics.join("&nbsp;·&nbsp;");
        return el;
      });

    insertAfterTemplate("featuredAuthorsTemplate", { data: authors });
  })
  .catch((err) => console.error("error: ", err));
