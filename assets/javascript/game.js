// declaring variables
var word;   // current word being played
var words;   // The words which can be played
var guesses;    // number of available guesses
var correctGuesses;    // letters guessed correctly
var wrongGuesses;   // letters guessed incorrectly
var gameWins = 0;   // number of times user won
var gameLosses = 0;   // number of times user lost      

// get HTML elements
var currentWordEl = document.getElementById('currentWord');   // display current work element
var chancesRemainingEl = document.getElementById('lettersRemaining');   // display remaining available guessed
var lettersGuessedEl = document.getElementById('lettersGuessed');   //display the letters incorectly guessed
var numWinsEl = document.getElementById('numWins');     // display number of times user won
var numLossesEL = document.getElementById('numLoss');     // display number of times user lost

// array of words 
words = ["mexico", "russia", "england", "japan", "canada", "brazil", "iraq", "latvia"];

// game initialization
function setupGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guesses = (word.length) * 2;
    wrongGuesses = [];
    correctGuesses = [];

    // writing word to console for testing
    console.log(word);

    // creates underscores for concealed word
    for (i = 0; i < word.length; i++) {
        correctGuesses.push('_');
    }

    currentWordEl.innerHTML = correctGuesses.join(' ');
    chancesRemainingEl.innerHTML = guesses;
    numWinsEl.innerHTML = gameWins;
    numLossesEL.innerHTML = gameLosses;
}

// updates word with guessed letters
function guessUpdate(letter) {
    guesses--;    // decreases available guesses
    chancesRemainingEl.innerHTML = guesses;

    if (word.indexOf(letter) === -1) { // letter is NOT in the word
        wrongGuesses.push(letter); // update letters guessed
        lettersGuessedEl.innerHTML = wrongGuesses.join(' - '); // append wrong letter to HTML
    } else { // letter IS in the word
        // replace underscore with the letter
        for (j = 0; j < word.length; j++) {
            if (word[j] === letter) {
                correctGuesses[j] = letter;
            }
        }
        currentWordEl.innerHTML = correctGuesses.join(' ');
    }
}

// checks correct letters guessed for a win
function checkForWin() {
    var gameOver = false;
    if (correctGuesses.indexOf('_') === -1) {
        alert('You Won!');
        gameWins++;
        gameOver = true;
    } else if (guesses === 0) {
        alert('You Lost!');
        gameOver = true;
        gameLosses++;
    }
    if (gameOver === true) {
        var gameStatus = confirm("Game is over. Would you like to play again?")
        if (gameStatus === true) {
            lettersGuessedEl.innerHTML = " ";
            setupGame();
        }
    }
}

// gets key press from user and checks character against current word
document.onkeyup = function (event) {
    var letterGuessed = event.key.toLowerCase();
    guessUpdate(letterGuessed);
    checkForWin();
};

//alert("Press OK to start game");
setupGame();
