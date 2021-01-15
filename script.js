var categories = [
  ["cat", "dog", "panda", "fox", "elephant", "monkey", "penguin"],
  ["apple", "peach", "pear", "strawberry", "banana", "watermelon"],
  ["yellow", "red", "blue", "green", "pink", "purple", "blush"],
];

let answer = "";
let maxWrong = 11;
let mistakes = 0;
let guessed = [];
let wordStatus = "";

var paragraph = document.getElementById("catagoryName");

function myFunction() {
  var x = document.getElementById("WordCat");
  var c = x.options[x.selectedIndex].text;
  document.getElementById("catagoryName").innerHTML = "Guess the " + c;
  var e = document.getElementById("WordCat");
  var chosenCategory = e.options[e.selectedIndex].value;
  console.log(chosenCategory);

  function randomWord() {
    answer =
      categories[chosenCategory][
        Math.floor(Math.random() * categories[chosenCategory].length)
      ];
    return answer;
  }

  // guessed = [];
  // mistakes = 0;
  randomWord();
  console.log(answer);
  guessedWord();
  reset();
}

function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` +
        letter +
        `'
        onClick="handleGuess('` +
        letter +
        `')"
      >
        ` +
        letter +
        `
      </button>
    `
    )
    .join("");

  document.getElementById("keyboard").innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute("disabled", true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById("hangmanPic").src = "images/" + mistakes + ".jpg";
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById("keyboard").innerHTML = "You Won!!!";
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById("wordSpotlight").innerHTML =
      "The answer was: " + answer;
    document.getElementById("keyboard").innerHTML = "Try Again";
  }
}

function guessedWord() {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");

  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById("hangmanPic").src = "images/0.jpg";

  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById("maxWrong").innerHTML = maxWrong;

myFunction();
generateButtons();
guessedWord();
