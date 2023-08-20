/* --------------------------------
- Purpose: Load data
- Author: Hyunjung Joun
-------------------------------- */

const getAuthors = async () =>
  fetch("/data/authors/data.json")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error("error: ", err));

const getAuthor = async (id) =>
  fetch("/data/authors/data.json")
    .then((res) => res.json())
    .then((data) => {
      return data.authors.find((el) => el.id === id);
    })
    .catch((err) => console.error("error: ", err));
