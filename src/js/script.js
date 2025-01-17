

function showCard() {
    let gamesHtml = "";
    const cardContainer = document.querySelector('.slider-width');

    games.forEach((game) => {
        gamesHtml += `<div class="card" id="${game.id}"><img src="${game.card}" alt="${game.name}"></div>`;
    });

    cardContainer.innerHTML = gamesHtml;
}

function initialize() {
    showCard();

    const cards = document.querySelectorAll('.card');
    const totalCards = cards.length;
    const cardsPerView = 4;
    const totalPages = Math.ceil(totalCards / cardsPerView);
    let currentPage = 0;
    let previousSelectedCard = null;
    

  
    document.querySelector('.slider-width').style.width = `calc(312px * ${totalCards})`;
   
    if (cards.length > 0) {
        previousSelectedCard = cards[0];
        previousSelectedCard.classList.add('selected');
        updateGameDetails(previousSelectedCard.id);
    }

    function selectGame(e) {
        if (previousSelectedCard) {
            previousSelectedCard.classList.remove('selected');
        }

        e.currentTarget.classList.add('selected');
        previousSelectedCard = e.currentTarget;
        updateGameDetails(previousSelectedCard.id);
    }

    function updateGameDetails(cardId) {
        const game = games.find(game => game.id === cardId);
        if (!game) return;

        const backgroundElement = document.querySelector('.background');
        const nomeElement = document.querySelector('.name-game');
        const timeElement = document.querySelector('.time');
        const progressElement = document.querySelector('.progress');
        const lastTrophyElement = document.querySelector('.lastTrophy');
        const labelElement = document.querySelectorAll('.label');

        
        backgroundElement.classList.add('zoom');
        nomeElement.classList.add('blur');
        timeElement.classList.add('blur');
        progressElement.classList.add('blur');
        lastTrophyElement.classList.add('blur');
        labelElement.forEach((c) => c.classList.add('blur'));

        
        setTimeout(() => {
            backgroundElement.src = game.background;
            nomeElement.innerHTML = game.name;
            timeElement.innerHTML = game.time;
            progressElement.innerHTML = game.progress;
            lastTrophyElement.innerHTML = game.lastTrophy;

            backgroundElement.classList.remove('zoom');
            nomeElement.classList.remove('blur');
            timeElement.classList.remove('blur');
            progressElement.classList.remove('blur');
            lastTrophyElement.classList.remove('blur');
            labelElement.forEach((c) => c.classList.remove('blur'));
        }, 500);
    }

    function updateButtonStates() {
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');

        if (currentPage === 0) {
            prevButton.classList.remove('selected');
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
            prevButton.classList.add('selected');
        }

        if (currentPage >= totalPages - 1) {
            nextButton.classList.remove('selected');
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
            nextButton.classList.add('selected');
        }
    }

    function next() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            const widthTela = document.querySelector('.slider').clientWidth;
            document.querySelector('.slider-width').style.marginLeft = `-${currentPage * widthTela}px`;
            updateButtonStates();
        }
    }

    function prev() {
        if (currentPage > 0) {
            currentPage--;
            const widthTela = document.querySelector('.slider').clientWidth;
            document.querySelector('.slider-width').style.marginLeft = `-${currentPage * widthTela}px`;
            updateButtonStates();
        }
    }

    updateButtonStates();

    document.querySelector('.next').addEventListener('click', next);
    document.querySelector('.prev').addEventListener('click', prev);

    cards.forEach((card) => {
        card.addEventListener('click', selectGame);
    });

    setInterval(timer, 1000);
}

window.addEventListener('DOMContentLoaded', initialize);

function timer() {
    let data = new Date();
    let hour = data.getHours();
    let minute = data.getMinutes();

    const formatTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    document.querySelector('.date').innerHTML = formatTime;
}
