
// Função para mostrar os cards dinamicamente
function showCard() {
    let gamesHtml = "";
    const cardContainer = document.querySelector('.slider-width');

    games.forEach((game) => {
        gamesHtml += `<div class="card" id="${game.id}"><img src="${game.card}" alt=""></div>`;
    });

    cardContainer.innerHTML = gamesHtml;
}

showCard();

// Definições iniciais
const cards = document.querySelectorAll('.card'); // Seleciona todos os cards
const totalCards = cards.length; // Define o total de cards
const cardsPerView = 4; // Define quantos cards serão exibidos por vez
const totalPages = Math.ceil(totalCards / cardsPerView); // Calcula o número total de páginas
let currentPage = 0; // Inicializa a página atual

// Define a largura total do container de slides
document.querySelector('.slider-width').style.width = `calc(312px * ${totalCards})`;

let previousSelectedCard = null; // Variável para armazenar o card previamente selecionado

// Evento para selecionar o primeiro card ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    if (cards.length > 0) {
        previousSelectedCard = cards[0];
        previousSelectedCard.classList.add('selected');

        // Atualiza o background de acordo com o primeiro card
        let game = games.find((game) => game.id === previousSelectedCard.id);
        if (game) {
            document.querySelector('.background').src = game.background;
            document.querySelector('.name-game').innerHTML=game.name
            document.querySelector('.time').innerHTML=game.time
            document.querySelector('.progress').innerHTML=game.progress
            document.querySelector('.lastTrophy').innerHTML=game.lastTrophy
        }
    }
    
    setInterval(timer,1000)
});

// Função para selecionar um card ao clicar
  function selectGame(e) {
    if (previousSelectedCard) {
        previousSelectedCard.classList.remove('selected');
    }

    e.currentTarget.classList.add('selected');
    previousSelectedCard = e.currentTarget;

   

    // Atualiza o background de acordo com o card selecionado
    let game = games.find((game) => game.id === previousSelectedCard.id);
  
    const backgroundElement = document.querySelector('.background');
    const nomeElement = document.querySelector('.name-game')
    const timeElement = document.querySelector('.time')
    const progressElement = document.querySelector('.progress')
    const lastTrophyElement = document.querySelector('.lastTrophy')
    const descElemnt = document.querySelectorAll('.desc')
   
    // Adiciona a classe de animação
    backgroundElement.classList.add('zoom');
    nomeElement.classList.add('blur')
    timeElement.classList.add('blur')
    progressElement.classList.add('blur')
    lastTrophyElement.classList.add('blur')
    descElemnt.forEach(c =>c.classList.add('blur'))

    setTimeout(() => {
        backgroundElement.classList.remove('zoom');
        backgroundElement.src = game.background;
        nomeElement.classList.remove('blur')
        timeElement.classList.remove('blur')
        progressElement.classList.remove('blur')
        lastTrophyElement.classList.remove('blur')
        descElemnt.forEach(c =>c.classList.remove('blur'))
        
    }, 500)

   
    nomeElement.innerHTML=game.name
    timeElement.innerHTML=game.time
    progressElement.innerHTML=game.progress
    lastTrophyElement.innerHTML=game.lastTrophy    
}




// Função para atualizar o estado dos botões
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

// Função para avançar para a próxima página
function next() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        const widthTela = document.querySelector('.slider').clientWidth;
        document.querySelector('.slider-width').style.marginLeft = `-${currentPage * widthTela}px`;
        updateButtonStates();
    }
}

// Função para voltar para a página anterior
function prev() {
    if (currentPage > 0) {
        currentPage--;
        const widthTela = document.querySelector('.slider').clientWidth;
        document.querySelector('.slider-width').style.marginLeft = `-${currentPage * widthTela}px`;
        updateButtonStates();
    }
}

function timer(){
    let data = new Date()
    let hour =  data.getHours() 
    let minute = data.getMinutes()


    const formatTime= `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`
    document.querySelector('.date').innerHTML=formatTime
    
}



// Inicializa o estado dos botões ao carregar a página
updateButtonStates();

// Adiciona eventos de clique aos botões
document.querySelector('.next').addEventListener('click', next);
document.querySelector('.prev').addEventListener('click', prev);

// Adiciona eventos de clique a cada card
cards.forEach((card) => {
    card.addEventListener('click', selectGame);
});



