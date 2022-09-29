
const newsLoad = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayNews(data.data.news_category))
}

const displayNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newses.forEach(news => {
        console.log(news);
        const newsDiv = document.createElement('div');
        newsContainer.classList.add('flex', 'justify-around', 'mt-12')
        newsDiv.innerHTML = `
           <button class="btn btn-sm">${news.category_name}</button>
        `;
        newsContainer.appendChild(newsDiv);
    })
}

newsLoad();