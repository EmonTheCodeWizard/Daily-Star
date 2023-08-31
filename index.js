const loadData = async () => {
    const newsData = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const res = await newsData.json();
    const data = res.data.news_category;
    dataLoading(data);
}

const dataLoading = (data) => {
    const divContainer = document.getElementById('div-container');
    data.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="newsCategory('${category?.category_id}')" class="tab text-base font-medium text-black hover:text-white bg-white hover:bg-purple-800 transition duration-300 ease-in-out rounded-lg">${category?.category_name}</a>
        `
        divContainer.appendChild(div)
    });
}

const newsCategory = async (category_id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await res.json();
    newsCard(data);
}

const newsCard = (data) => {
    console.log(data);
    const divCardContainer = document.getElementById('divCardContainer');
    divCardContainer.innerHTML = "";
    if (data.data.length === 0) {
        alert("No Content Available Right Now 📭");
        return; // Exit the function
    }
    data.data.forEach(card => {
        console.log(card);
        const div = document.createElement('div');
        div.innerHTML = `<div class="card bg-base-100 shadow-xl">
        <figure><img class="w-4/5" src="${card?.thumbnail_url}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">
                ${card?.title.slice(0, 50)}
                <div class="btn bg-pink-500 text-white hover:bg-pink-700 rounded-[50px]">${card.rating?.badge}</div>
            </h2>
            <p>${card?.details.slice(0, 150)}</p>
            <div class="flex justify-between">
                <div class=" flex items-center gap-x-4">
                    <div class="avatar online">
                        <div class="w-16 rounded-full">
                            <img src="${card.author?.img}" />
                        </div>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-600">${card.author?.name}</h4>
                        <p>${card.author?.published_date}</p>
                    </div>
                </div>
                <div>
                    <button class="btn bg-slate-800 hover:bg-slate-900 text-white">Details</button>
                </div>
            </div>
        </div>
    </div>`

        divCardContainer.appendChild(div);
    });




}



loadData();
newsCategory('01')













// Clock Section 
function updateDate() {
    const currentDateElement = document.getElementById("clock");
    const now = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formattedDate = now.toLocaleDateString(undefined, options);

    currentDateElement.textContent = formattedDate;
}


// Update the date initially
updateDate();

  // Update the date every second (1000 milliseconds)