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

newNewsLoad('8');

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
    catagories.sort((a,b) => {
        return b.total_view - a.total_view;
    })
    catagories.forEach(items => {
        console.log(items)
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('card', 'lg:card-side', 'bg-base-100', 'shadow-xl', 'mt-5')
        detailDiv.innerHTML = `
        <figure><img src="${items.thumbnail_url}" alt="Album"/></figure>
        <div class="card-body">
          <h2 class="card-title">${items.title}</h2>
          <p>${items.details.slice(0, 400) + '...'}</p>
          <p>Total View: ${items.total_view}</p>
          <div class = "flex mt-12">
          <img src = "${items.author.img}" class = "h-10 w-10 rounded-full mt-2">
          <div class = "pl-4">
          <h1>${items.author.name}</h1>
          <p>${items.author.published_date}</p>
          </div>
          <h1 class = "ml-32 mt-4"><i class="fa-regular fa-eye"></i> 1.5M</h1>
          <div class = "mt-4 ml-32">
          <p><i class="fa-solid fa-star p-2"></i> <i class="fa-regular fa-star p-2"></i> <i class="fa-regular fa-star p-2"></i> <i class="fa-regular fa-star p-2"></i> <i class="fa-regular fa-star p-2"></i></p>
          </div>
          </div>
          <div class="card-actions justify-end">
            <label onclick="modalDetails('${items._id}')" for="my-modal-6" class=" btn-sm modal-button"><i class=" fa-solid fa-arrow-right"></i></label>
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
    .then(data => displayModalDetail(data.data[0]))
}

const displayModalDetail = data => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <div class="modal-box">
    <figure><img src="${data.thumbnail_url}" alt="Album"/></figure>
    <h3 class="font-bold text-lg mt-4">${data.title}</h3>
    <p class="py-4">${data.details.slice(0, 400) + '...'}</p>
    <p>Total View: ${data.total_view}</p>
    <div class="modal-action">
    <label for="my-modal-6" class="btn">Yay!</label>
    </div>
    </div>
    `
}

newsLoad();