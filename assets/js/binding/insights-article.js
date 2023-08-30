/* --------------------------------
- Purpose: insight article detail
- Author: Hyunjung Joun
-------------------------------- */
console.log(`Loading ${document.currentScript.src.split("/js")[1]}`);

renderArticle(1);

async function renderArticle(id) {
  try {
    // insight
    const insight = await getInsight(id);
    insight.createdAt = printDateDifference(insight.createdAt);
    const detail = await getInsightDetail(insight.id);
    const body = detail.body;
    insertAfterTemplate("articleHeaderTemplate", insight);

    // adjust position;
    const headerGroupEl = document.querySelector(".article__header-group");
    const headerGroupHeight = headerGroupEl.clientHeight;
    const contentWrapperEl = document.querySelector(
      ".article__content-wrapper"
    );
    contentWrapperEl.style.top = `${headerGroupHeight}px`;

    // outline
    const articleTxtEl = document.getElementsByClassName("article__txt")[0];
    articleTxtEl.innerHTML = body;

    // change h2 title to h1 for root
    const titleEl = document.querySelector(".article__title h2");
    const newTitleEl = document.createElement("h1");
    for (const attr of titleEl.attributes) {
      newTitleEl.setAttribute(attr.name, attr.value);
    }
    newTitleEl.innerHTML = titleEl.innerHTML;

    // make a tree
    const headings = articleTxtEl.querySelectorAll("h2, h3, h4");
    const headingsArr = [newTitleEl, ...headings];
    const outlineRoot = buildTree(headingsArr, 0);

    // render outline
    let outline = getOutline(outlineRoot);
    const outlineEl = document.getElementsByClassName("outline__content");
    insert(outlineEl[0], outline);

    // scroll event
    for (let i = 0; i < headings.length; i++) {
      document
        .getElementById(`ol_${headings[i].id}`)
        .addEventListener("click", function () {
          const el = document.getElementById(headings[i].id);
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
    }

    // author
    const author = await getAuthor(insight.author.id);
    insertAfterTemplate("authorProfileTemplate", author);

    // related
    const related = await getInsightsByTopic(insight.topic);
    for (const r of related) {
      r.author = await getAuthorSimple(r.author.id);
    }
    insertAfterTemplate("relatedTemplate", { data: related });

    // adjust related position
    const contentEl = document.querySelector(".article__content");
    const contentHeight = contentEl.clientHeight;
    const relatedEl = document.getElementById("related");
    relatedEl.style.top = `${contentHeight + headerGroupHeight}px`;

    // adjust footer position
    const footerEl = document.querySelector("#footer");
    const relatedHeight = relatedEl.clientHeight;
    footer.style.position = "absolute";
    footer.style.top = `${contentHeight + headerGroupHeight + relatedHeight}px`;
    footer.style.zIndex = "999";
  } catch (err) {
    console.error("error: ", err);
  }
}

function getOutline(node) {
  let result = getOutlineText(node);
  for (const child of node.children) {
    result += getOutline(child);
  }
  return result;
}

function getOutlineText(el) {
  const level = +el.level;
  if (level === 1) {
    return "";
  }
  const text = `<li id="ol_${
    el.node.id
  }" class="ts--body-s tc--gray hover--darker" style="padding-left:${
    (level - 2) * 1.5
  }rem;font-size:${2.5 / level + 0.8}rem">${el.node.textContent}</li>`;
  return text;
}

function buildTree(list, i) {
  const currLevel = +list[i].tagName[1];

  const node = {
    level: currLevel,
    node: list[i],
    children: [],
  };

  let nextIndex = i + 1;

  while (nextIndex < list.length) {
    const nextLevel = +list[nextIndex].tagName[1];

    // go to parent
    if (nextLevel <= currLevel) {
      break;
    }

    // children
    if (nextLevel === currLevel + 1) {
      const childNode = buildTree(list, nextIndex);
      node.children.push(childNode);
      nextIndex++;
    } else {
      nextIndex++;
    }
  }

  return node;
}
