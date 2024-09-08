const cards = [
    { id: 1, image: 'imgs/imgCard1.jpg' },
    { id: 2, image: 'imgs/imgCard2.jpg' },
    { id: 3, image: 'imgs/imgCard3.jpg' },
    { id: 4, image: 'imgs/imgCard4.jpg' },
    { id: 5, image: 'imgs/imgCard5.jpg' },
    { id: 6, image: 'imgs/imgCard6.jpg' },
    { id: 7, image: 'imgs/imgCard7.jpg' },
    { id: 8, image: 'imgs/imgCard8.jpg' },
    { id: 9, image: 'imgs/imgCard9.jpg' },
    { id: 10, image: 'imgs/imgCard10.jpg' }
];

// Função para iniciar o jogo
function startGame() {
    // Duplicando as cartas e embaralhando
    let gameCards = [...cards, ...cards];  // Agora temos 20 cartas (10 pares)
    gameCards = gameCards.sort(() => 0.5 - Math.random());

    // Limpa o tabuleiro
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';  // Limpa as cartas anteriores

    gameCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                 <img src="imgs/frontCard.png" alt="Frente da carta">
                </div>
                <div class="card-back">
                    <img src="${card.image}" alt="Card image">
                </div>
            </div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    resetBoard();
}

let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;  // Contador de pares encontrados

// Seleciona o modal e o botão de reiniciar
const winModal = document.getElementById('winModal');
const restartBtn = document.getElementById('restartBtn');

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.innerHTML === secondCard.innerHTML;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;  // Incrementa o contador de pares

    if (matchedPairs === cards.length) {
        // Mostra o modal de vitória
        setTimeout(() => {
            winModal.style.display = 'flex';
        }, 1000);
    }

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Função para reiniciar o jogo
restartBtn.addEventListener('click', () => {
    winModal.style.display = 'none';  // Esconde o modal
    matchedPairs = 0;  // Reseta o contador de pares encontrados
    startGame();  // Reinicia o jogo
});

// Inicia o jogo ao carregar a página
startGame();
