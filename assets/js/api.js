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

async function getInsightsByTopic(topic) {
  const insights = await getInsightList();
  return insights
    .filter((el) => el.topic === topic)
    .map((el) => ({
      ...el,
      createdAt: printDateDifference(el.createdAt),
    }));
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

async function getAuthor(id) {
  return await fetch("/data/authors/data.json")
    .then((res) => res.json())
    .then((data) => data.authors.find((el) => el.id === id))
    .then((el) => ({
      ...el,
      topicsOneline: el.topics.join("&nbsp;·&nbsp;"),
    }))
    .catch((err) => console.error("error: ", err));
}

async function getInsightDetail(id) {
  return await fetch("/data/insights/data-detail.json")
    .then((res) => res.json())
    .then((data) => data.insightsDetail.find((el) => el.id === id))
    .catch((err) => console.error("error: ", err));
}

async function getTrendings() {
  try {
    const insights = await getInsightList();
    const msOf30Days = 1000 * 60 * 60 * 24 * 30;

    const trendings = [...insights]
      .sort((a, b) => {
        const isAWithin30Days =
          a.createdAt <= Date.now() && a.createdAt > Date.now() - msOf30Days;
        const isBWithin30Days =
          b.createdAt <= Date.now() && b.createdAt > Date.now() - msOf30Days;

        if (isBWithin30Days && isAWithin30Days) {
          return b.viewCount - a.viewCount;
        }

        if (!isBWithin30Days && isAWithin30Days) {
          return -1;
        }

        if (isBWithin30Days && !isAWithin30Days) {
          return 1;
        }

        if (!isBWithin30Days && !isAWithin30Days) {
          return b.viewCount - a.viewCount;
        }
      })
      .slice(0, 6);

    return trendings;
  } catch (err) {
    console.error("error: ", err);
  }
}
