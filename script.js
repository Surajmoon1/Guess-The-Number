let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#sub');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.remGuess');
const lowOrHigh = document.querySelector('.lowOrHigh');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('button');

let prevGuess = [];
numGuess = 1;

let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please Enter a valid Number');
    } else if (guess < 1) {
        alert('Please Enter a Number greater than 0');
    } else if (guess > 100) {
        alert('Please Enter a Number less than 100');
    } else {
        prevGuess.push(guess);
        if (numGuess > 9) {
            cleanGuess(guess);
            displayMessage(`Game Over! Random Number Was ${randomNumber}`);
            endGame();
        } else {
            cleanGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage('You Guessed It Right');
        endGame();
    } else if (guess < randomNumber) {
        displayMessage('Number is TOOOO Small');
    } else if (guess > randomNumber) {
        displayMessage('Number is TOOO Large');
    }
}

function cleanGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHigh.innerHTML = `<h3>${message}</h3>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `New Game`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('.button');
    newGameButton.addEventListener('click', function (e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess} `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        displayMessage('')
        playGame = true;
    });
}