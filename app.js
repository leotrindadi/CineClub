const form = document.querySelector("#searchForm");
const container = document.querySelector("#container");
const containerTwo = document.querySelector("#containerTwo");

window.addEventListener('load', async function () {
    
   makeRequest('John Wick');

});

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    container.innerHTML = '';

    containerTwo.innerHTML = '';
 
    const searchTerm = form.elements.query.value;

    makeRequest(searchTerm);

    form.elements.query.value = ' '; 
});

const makeRequest = async function (request) {

    const config = request;
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=84b0902521d7a8399d3b304738381a97&query=${config}&page=1`);

    //console.log(res.data.results.slice(0, 8));
    makeDivs(res.data.results.slice(0, 6));
    
};

const makeRequestCards = async function (requestTwo) {

    const configTwo = requestTwo;
    const resTwo = await axios.get(`https://api.themoviedb.org/3/movie/${configTwo}?api_key=84b0902521d7a8399d3b304738381a97&language=en-US&page=1&append_to_response=reviews`);

    console.log(resTwo.data);

    makeCards(resTwo.data);
}

const makeCards = (reviews) => {
    
        if(reviews.reviews.results) {
            const div = document.createElement('div');
            const divTwo = document.createElement('div');

            const reviewDataAuthor = document.createElement('h5');
            reviewDataAuthor.innerHTML = `${reviews.reviews.results[0].author_details.username} says...`;
            const reviewDataRating = document.createElement('h5');
            reviewDataRating.innerHTML = `${reviews.reviews.results[0].author_details.rating}/10`;

            const reviewDataImage = document.createElement('img');
            reviewDataImage.src = `http://image.tmdb.org/t/p/w185/${reviews.poster_path}`
            reviewDataImage.classList.add('reviewImage');
            divTwo.append(reviewDataImage);

            if(reviews.reviews.results[0].author_details.rating){
                divTwo.append(reviewDataRating);
            } else{
                divTwo.append('No Rating');
            }
            
            divTwo.classList.add('reviewData');
            div.append(divTwo);

            const reviewContent = document.createElement('p');
            reviewContent.innerHTML = reviews.reviews.results[0].content;
            const divThree = document.createElement('div');
            divThree.append(reviewDataAuthor);
            divThree.append(reviewContent);
            divThree.classList.add('reviewContent')

            div.append(divThree);
            div.classList.add('reviewCard');
            div.setAttribute("data-augmented-ui", "tr-clip tr-clip-y br-2-clip-xy both");

            containerTwo.append(div);
        }
    
};

const makeDivs = (movies) => {
    for(let movie of movies){
       if(movie.poster_path) {

         const div = document.createElement('div');
         const divTwo = document.createElement('div');

         const movieTitle = document.createElement('h5');
         const movieRating = document.createElement('h5');
         movieTitle.innerHTML = movie.title;
         movieRating.innerHTML = `Rating: ${movie.vote_average}`;

         divTwo.append(movieTitle);
         divTwo.append(movieRating);
         divTwo.classList.add('divTwo');
         div.append(divTwo);

         const img = document.createElement('img');
         img.src = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
         img.classList.add('cardImage');
         div.append(img);

         div.classList.add('movieCard');

         container.append(div);

         const movieID = movie.id;
         makeRequestCards(movieID);
        }
   }
};


