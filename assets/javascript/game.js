// declaring variables
var word;   // The word to be played
var guesses;    // number of available guesses
var correctGuesses;    // letters guessed correctly
var wrongGuesses;   // letters guessed incorrectly

// get HTML elements
var currentWordEl = document.getElementById('currentWord');   // display current work element
var chancesRemainingEl = document.getElementById('lettersRemaining');   // display remaining available guessed
var lettersGuessedEl = document.getElementById('lettersGuessed');   //display the letters incorectly guessed

// game initialization
function setupGame() {
    word = 'banzai';
    guesses = 13;
    wrongGuesses = [];
    correctGuesses = [];

    // writing word to console for testing
    console.log(word);

    // creates underscores for concealed word
    for (var i = 0; i < word.length; i++) {
        correctGuesses.push('_');
    }

    currentWordEl.innerHTML = correctGuesses.join(' ');
    chancesRemainingEl.innerHTML = guesses;
}

// updates word with guessed letters
function guessUpdate(letter) {
    guesses--;    // decreases available guesses
    chancesRemainingEl.innerHTML = guesses;

    if (word.indexOf(letter) === -1) { // letter is NOT in the word
        wrongGuesses.push(letter); // update letters guessed
        lettersGuessedEl.innerHTML = wrongGuesses.join(', ');
    } else { // letter IS in the word
        // replace underscore with the letter
        for (var i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                correctGuesses[i] = letter;
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
        gameOver = true;
    } else if (guesses === 0) {
        alert('You Lost!');
        gameOver = true;
    }
    if (gameOver === true) {
        var gameStatus = confirm("Game is over. Would you like to refresh and play again?")
        if (gameStatus === true) {
            location.reload();
        }
    }
}

// gets key press from user and checks character against current word
document.onkeyup = function (event) {
    var letterGuessed = event.key.toLowerCase();
    guessUpdate(letterGuessed);
    checkForWin();
};

alert("Press OK to start game");
setupGame();
