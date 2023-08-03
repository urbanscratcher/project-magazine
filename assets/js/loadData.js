console.log("---loading loadData.js---");

function loadJSON(file) {
  return fetch(file).then((res) => res.json());
}

function loadInsights() {
  let b = {};
  const a = loadJSON("../../data/insights/data.json")
    .then((data) => {
      b = data;
    })
    .catch((error) => console.error("error:", error));
  console.log(b);
}

const insights = loadInsights();
