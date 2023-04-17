const form = document.querySelector("#searchForm");
const container = document.querySelector("#container");
const containerTwo = document.querySelector("#containerTwo");
const arrowIcons = document.querySelectorAll("#wrapper button");
const arrowIconsTwo = document.querySelectorAll('#wrapperTwo button');
const divFade = document.querySelector('#divFade');

window.addEventListener('load', async function () {
    makeRequest('Avengers');
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

   
    makeDivs(res.data.results);

};

const makeRequestCards = async function (requestTwo) {
    const configTwo = requestTwo;
    const resTwo = await axios.get(`https://api.themoviedb.org/3/movie/${configTwo}?api_key=84b0902521d7a8399d3b304738381a97&language=en-US&page=1&append_to_response=reviews`);

    makeCards(resTwo.data);
};

const makeCards = (reviews) => {

    if (reviews.reviews.results) {
        const div = document.createElement('div');
        const divTwo = document.createElement('div');
        const divThree = document.createElement('div');

        const reviewDataAuthor = document.createElement('h5');
        reviewDataAuthor.innerHTML = `${reviews.reviews.results[0].author_details.username} says...`;
        const reviewContent = document.createElement('p');
        reviewContent.innerHTML = reviews.reviews.results[0].content;

        const reviewDataRating = document.createElement('h5');
        reviewDataRating.innerHTML = `${reviews.reviews.results[0].author_details.rating}/10`;
        const reviewDataNoRating = document.createElement('h5');
        reviewDataNoRating.innerHTML = 'No Rating';

        const reviewDataImage = document.createElement('img');
        reviewDataImage.src = `http://image.tmdb.org/t/p/w185/${reviews.poster_path}`;
        reviewDataImage.classList.add('reviewImage');
        divTwo.append(reviewDataImage);

        if (reviews.reviews.results[0].author_details.rating) {
            divTwo.append(reviewDataRating);
        } else {
            divTwo.append(reviewDataNoRating);
        }
        divTwo.classList.add('reviewData');

        div.append(divTwo);
        divThree.append(reviewDataAuthor);
        divThree.append(reviewContent);
        divThree.classList.add('reviewContent')

        div.append(divThree);
        div.classList.add('reviewCard');
        div.setAttribute("data-augmented-ui", "tr-clip tr-clip-y br-2-clip-xy both");
        containerTwo.append(div);
    }
    let containerReviews = Array.from(containerTwo.children);
    const firstReview = containerReviews[0];
    let firstReviewWidth = firstReview.clientWidth + 101;

    arrowIconsTwo.forEach(icon => {
        icon.addEventListener('click', () => {
            if (icon.id == "leftTwo") {
                containerTwo.scrollLeft -= firstReviewWidth;
            } else {
                containerTwo.scrollLeft += firstReviewWidth;
            }
        })
    })
};

const makeDivs = (movies) => {
    for (let movie of movies) {

        if (movie.poster_path) {
            const div = document.createElement('div');
            const divTwo = document.createElement('div');
            const movieTitle = document.createElement('h5');
            const movieRating = document.createElement('h5');
            const movieModal = document.createElement('dialog');
            const movieMore = document.createElement('button');
            const movieLess = document.createElement('button');

            movieTitle.innerHTML = movie.title;
            movieRating.innerHTML = `Rating: ${Math.round(movie.vote_average)}/10`;
            movieMore.innerHTML = "MORE";
            movieLess.innerHTML = "X";
            movieMore.id = "movieMoreButton";
            movieMore.setAttribute("data-augmented-ui", " ");
            movieLess.id = "movieLessButton";
            movieLess.setAttribute("data-augmented-ui", " ")

            divTwo.append(movieTitle);
            divTwo.append(movieRating);
            divTwo.append(movieMore);
            divTwo.classList.add('divTwo');
            div.append(divTwo);

            const img = document.createElement('img');
            img.src = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
            img.classList.add('cardImage');
            div.append(img);
            div.classList.add('movieCard');
            container.append(div);
            const movieID = movie.id;
            makeRequestCards(movieID)

            movieMore.addEventListener('click', () => {
                if(movieModal.classList.contains('modalGoing')){
                    movieModal.classList.remove('modalGoing');
                    movieModal.classList.add('modalComing');
                } else{
                    movieModal.classList.add('modalComing'); 
                }
                divFade.classList.toggle('fade');
                movieModal.showModal();
            });

            movieModal.id = "modal";
            movieModal.setAttribute("data-augmented-ui", "br-clip bl-clip both");

            const movieModalTitle = document.createElement('h5');
            const movieModalRating = document.createElement('h5');
            const movieModalOverview = document.createElement('p');
            const movieModalImage = document.createElement('img');
            const reviewForm = document.createElement('form');
            const reviewTitle = document.createElement('h1');
            const usernameInput = document.createElement('input');
            const ratingInput = document.createElement('input');
            const reviewInput = document.createElement('input');
            const reviewBox = document.createElement('div');
            const submitButton = document.createElement('button');

            reviewForm.id = "reviewForm";
            reviewTitle.id = "reviewTitle";
            usernameInput.id = "usernameInput";
            ratingInput.id = "ratingInput";
            reviewInput.id = "reviewInput";
            reviewBox.id = "reviewBox";
            submitButton.id = "submitButton";
            submitButton.setAttribute("data-augmented-ui", " ");
            reviewTitle.innerHTML = "Make Your Review!";
            submitButton.innerHTML = "SEND";
            reviewForm.append(reviewTitle);
            reviewForm.append(usernameInput);
            reviewForm.append(ratingInput);
            reviewBox.append(reviewInput);
            reviewForm.append(reviewBox);
            reviewForm.append(submitButton);

            const divThree = document.createElement('div');
            const divFour = document.createElement('div');
            const divFive = document.createElement('div');
            const divSix = document.createElement('div');
            const divSeven = document.createElement('div');

            movieModalTitle.innerHTML = movie.title;
            movieModalRating.innerHTML = `Rating: ${Math.round(movie.vote_average)}/10`;
            movieModalOverview.innerHTML = movie.overview;
            movieModalImage.src = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`;
            movieModalImage.classList.add('modalImage');

            movieModal.append(divSeven);
            divSeven.classList.add('modalContainer');
            divThree.append(movieModalImage);
            divThree.classList.add('modalData');
            divFour.append(movieModalTitle);
            divFour.append(movieModalOverview);
            divFour.classList.add('modalContent');
            divFive.append(divThree);
            divFive.append(divFour);
            divFive.append(movieLess);
            divFive.classList.add('modalPattern');
            divSix.append(reviewForm);
            divSix.classList.add('modalFormPattern');
            divSeven.append(divFive);
            divSeven.append(divSix);
            movieModal.append(divSeven);
            container.append(movieModal);


            movieLess.addEventListener('click', () => {
                if(movieModal.classList.contains('modalComing')){
                    movieModal.classList.remove('modalComing');
                    movieModal.classList.add('modalGoing');
                } else{
                    movieModal.classList.add('modalGoing'); 
                }
                movieModal.onanimationend = () => {
                    movieModal.close();
                    divFade.classList.toggle('fade');
                }

            });

        }
    }
    let containerCards = Array.from(container.children);
    const firstCard = containerCards[0];
    let firstCardWidth = firstCard.clientWidth + 900;

    arrowIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            if (icon.id == "left") {
                container.scrollLeft -= firstCardWidth;
            } else {
                container.scrollLeft += firstCardWidth;
            }
        })
    })
}
