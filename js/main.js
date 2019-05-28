let search = document.getElementById("search");

search.addEventListener('click', function () {
    let photos = [];
    let nrequest;
    let nreceived,
        api_key = "39417c145483a7fb3ee91c5fe5bc93fe",
        searchText = document.getElementById("searchterm").value;


    let tennisStr = "https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" + searchText + "&per_page=15&format=json&nojsoncallback=1&api_key=" + api_key;
    fetch(tennisStr)
        .then((r) => {
            return r.json()

        })
        .then((r) => {
            console.log('fetch ok', r);
            fetchPhoto(r);
        })

        .catch((error) => {
            console.log(JSON.stringify(error));
        });

    function fetchPhoto(data) {
        nrequest = data.photos.photo.length;
        nreceived = 10;
        for (let i = 0; i < nrequest; i++) {
            let photoObj = {
                id: data.photos.photo[i].id,
                title: data.photos.photo[i].title
            };
            photos.push(photoObj);
            display(photos);
        }
    }


});


function display(photos) {
    var image = "";
    console.log('photos.items', photos);
    photos.forEach(function (element) {
        image += "<img src=\"" + element.photos + "\"/>";
    });
    document.getElementById("results").innerHTML = image;
};

