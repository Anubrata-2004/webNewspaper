const toggleBtn = document.getElementById("dark-mode-toggle");

// Apply saved mode on load
if (localStorage.getItem("mode") === "dark") {
    enableDarkMode();
    toggleBtn.textContent = " Light Mode";
}

toggleBtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
        disableDarkMode();
        localStorage.setItem("mode", "light");
        toggleBtn.textContent = "Dark Mode";
    } else {
        enableDarkMode();
        localStorage.setItem("mode", "dark");
        toggleBtn.textContent = " Light Mode";
    }
});

function enableDarkMode() {
    document.body.classList.add("dark-mode");
    document.querySelector("nav").classList.add("dark-mode");
    document.querySelector(".news-input").classList.add("dark-mode");
    document.querySelector(".search-button").classList.add("dark-mode");
    document.querySelectorAll(".card").forEach(card => {
        card.classList.add("dark-mode");
    });
}

function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    document.querySelector("nav").classList.remove("dark-mode");
    document.querySelector(".news-input").classList.remove("dark-mode");
    document.querySelector(".search-button").classList.remove("dark-mode");
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("dark-mode");
    });
}


// The main api function...

const API_KEY ="4208f996d6124780b921ca316d1277db";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});









