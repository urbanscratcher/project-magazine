/* --------------------------------
- Purpose: Fake API
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

const topicList = {
  topTopics: [
    {
      name: "Design",
    },
    {
      name: "Technology",
    },
    {
      name: "Residential",
    },
    {
      name: "Interior",
    },
    {
      name: "Landscape",
    },
    {
      name: "Urban",
    },
    {
      name: "Cultural",
    },
    {
      name: "Exhibition",
    },
    {
      name: "Narrative",
    },
  ],
};

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
