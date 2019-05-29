let search = document.getElementById("search");
let show_more = document.getElementById("show-more");
let container = document.getElementById("container");
let page_count = 1;
let images = '';

show_more.addEventListener('click', function () {
    getNextImages();
});

search.addEventListener('click', function () {
    getNextImages()
        .then(() => {
            show_more.disabled = false;
        })
});

function getNextImages() {
    let searchText = document.getElementById("searchterm").value.trim();
    let apiflickr = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dd4a16666bdf3c2180b43bec8dd1534a&tags=" + searchText + "&sort=relevance&safe_search=10&per_page=10&page=" + page_count + "&format=json&nojsoncallback=1";

    return fetch(apiflickr)
        .then((r) => {
            return r.json()
        })
        .then((r) => {
            console.log('fetch ok', r);
            createImg(r);
            page_count++;
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            return new Promise.reject();
        });

    function createImg(data) {
        data.photos.photo.forEach(function (item, n) {
            let url = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
            images += '<img src="' + url + '"/>';
        });
        container.innerHTML = images;
    }
}