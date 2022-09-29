const newsLoad = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayNews(data.data.news_category))
}

const displayNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newses.forEach(news => {
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsContainer.classList.add('flex', 'justify-around', 'mt-12')
        newsDiv.innerHTML = `
           <button onclick = "newNewsLoad(${news.category_id})" class="btn btn-sm">${news.category_name}</button>
        `;
        newsContainer.appendChild(newsDiv);
    })
}

const newNewsLoad = () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewNewsLoad(data.data))
}

const displayNewNewsLoad = catagories => {
    const newsContainer = document.getElementById('new-container');
    newsContainer.innerHTML = '';
    catagories.forEach(items => {
        console.log(items)
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('card', 'lg:card-side', 'bg-base-100', 'shadow-xl', 'mt-5')
        detailDiv.innerHTML = `
        <figure><img src="${items.thumbnail_url}" alt="Album"/></figure>
        <div class="card-body">
          <h2 class="card-title">${items.title}</h2>
          <p>${items.details}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Listen</button>
          </div>
        </div>
        `;
        newsContainer.appendChild(detailDiv);
    })
}

newsLoad();