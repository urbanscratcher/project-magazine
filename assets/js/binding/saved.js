fetch("/data/insights/data-saved.json")
  .then((res) => res.json())
  .then((data) => {
    fetch("/data/insights/data.json")
      .then((res) => res.json())
      .then((insightsData) => {
        fetch("/data/authors/data.json")
          .then((res) => res.json())
          .then((authorsData) => {
            const list = data.insightsSaved
              .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
              .slice(0, 4);
            const savedList = list.map((el) => {
              const insight = insightsData.insights.find(
                (insight) => insight.id === el.id
              );

              insight.author = authorsData.authors.find(
                (author) => author.id === insight.author.id
              );

              const mappedEl = { ...el, ...insight };

              return mappedEl;
            });

            insertAfterTemplate("savedTemplate", { data: savedList });
          });
      });
  });
