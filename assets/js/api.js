/* --------------------------------
- Purpose: Fake API
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

async function getInsightList() {
  return await fetch("/data/insights/data.json")
    .then((res) => res.json())
    .then((rawData) =>
      rawData.insights.map((el) => ({
        ...el,
        createdAt: new Date(el.createdAt),
      }))
    )
    .catch((err) => console.error("error: ", err));
}

async function getInsight(id) {
  return await fetch("/data/insights/data.json")
    .then((res) => res.json())
    .then((rawData) =>
      rawData.insights.map((el) => ({
        ...el,
        createdAt: new Date(el.createdAt),
      }))
    )
    .then((data) => data.find((el) => el.id === id))
    .catch((err) => console.error("error: ", err));
}

async function getAuthorList() {
  return await fetch("/data/authors/data.json")
    .then((res) => res.json())
    .then((data) =>
      data.authors.map((el) => ({
        id: el.id,
        name: el.name,
        topics: el.topics,
        avatar: el.avatar,
        topicsOneline: el.topics.join("&nbsp;·&nbsp;"),
      }))
    )
    .catch((err) => console.error("error: ", err));
}

async function getAuthorSimple(id) {
  return await fetch("/data/authors/data.json")
    .then((res) => res.json())
    .then((data) => data.authors.find((el) => el.id === id))
    .then((el) => ({
      id: el.id,
      name: el.name,
      topics: el.topics,
      avatar: el.avatar,
      topicsOneline: el.topics.join("&nbsp;·&nbsp;"),
    }))
    .catch((err) => console.error("error: ", err));
}
