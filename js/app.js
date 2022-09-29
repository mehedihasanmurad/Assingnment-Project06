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

const newNewsLoad = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewNewsLoad(data.data))
}

const displayNewNewsLoad = catagories => {
    const displayNewsContainer = document.getElementById('new-container');
    displayNewsContainer.innerHTML = '';
    const countContainer = document.getElementById('detail-news');
    countContainer.innerHTML = '';
    const div = document.createElement('div')
    div.innerHTML = `
        <h1>${catagories.length} items found for category Entertainment</h1>
    `;
    countContainer.appendChild(div);
    catagories.forEach(items => {
        // console.log(items)
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('card', 'lg:card-side', 'bg-base-100', 'shadow-xl', 'mt-5')
        detailDiv.innerHTML = `
        <figure><img src="${items.thumbnail_url}" alt="Album"/></figure>
        <div class="card-body">
          <h2 class="card-title">${items.title}</h2>
          <p>${items.details.slice(0, 400) + '...'}</p>
          <p></p>
          <div class="card-actions justify-end">
            <button onclick="modalDetails('${items._id}')" class="btn btn-primary btn-sm">Details</button>
          </div>
        </div>
        `;
        displayNewsContainer.appendChild(detailDiv);
    })
}

const modalDetails = (id) => {
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => console.log(data.data[0]))
}


newsLoad();