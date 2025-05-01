let allIndianNews = [];
let visibleCount = 0;
const LOAD_COUNT = 5;

function getRecentDate(daysAgo = 10) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
}

function fetchNewsData(query = 'apple') {
    const apiKey = '6e88337ee3e44406bfdea733ec35db74';
    const publishedAfter = getRecentDate(10);
    const url = `https://newsapi.org/v2/everything?q=${query}&from=${publishedAfter}&sortBy=popularity&apiKey=${apiKey}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => data.articles) // Correcting this based on the API structure
        .catch(error => {
            console.error('Fetch error:', error);
            return [];
        });
}

function displayNewsCards(newsList) {
    const container = document.getElementById('card-container');
    const loadMoreBtn = document.getElementById('load-more-btn');

    const nextNews = newsList.slice(visibleCount, visibleCount + LOAD_COUNT);
    nextNews.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <img src="${card.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${card.title}">
            <h2><a href="${card.url}" target="_blank">${card.title}</a></h2>
            <p>${card.description || 'No description available.'}</p>
        `;
        container.appendChild(cardElement);
    });

    visibleCount += LOAD_COUNT;

    // Show or hide the button depending on remaining items
    if (visibleCount >= newsList.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Event listener for the button
document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const home = document.getElementById('home');

    loadMoreBtn.addEventListener('click', () => {
        displayNewsCards(allIndianNews);
    });

    // Fetch default news (e.g., Apple news)
    fetchNewsData().then(news => {
        allIndianNews = news;
        visibleCount = 0;
        document.getElementById('card-container').innerHTML = '';
        displayNewsCards(allIndianNews);
    });

    // Event listener for sports link
    const categories = ['home', 'sports', 'finance', 'international', 'politics', 'regional', 'parliamentary', 'judicial', 'other'];
    categories.forEach(category => {
        document.getElementById(category).addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            fetchNewsData(category).then(news => {
                allIndianNews = news;
                visibleCount = 0;
                document.getElementById('card-container').innerHTML = '';
                displayNewsCards(allIndianNews);
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        // Hide login/signup buttons
        const buttonDiv = document.querySelector(".button");
        if (buttonDiv) {
            buttonDiv.style.display = "none";
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        const buttonDiv = document.querySelector(".button");
        if (buttonDiv) buttonDiv.style.display = "none";

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.style.display = "inline-block";
            logoutBtn.addEventListener("click", () => {
                localStorage.clear();
                window.location.reload();
            });
        }
    }
});