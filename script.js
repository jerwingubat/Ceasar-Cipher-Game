document.addEventListener("DOMContentLoaded", () => {
  const encryptButton = document.getElementById("encrypt");
  const wordToEncrypt = document.getElementById("wordToEncrypt");
  const shiftValue = document.getElementById("shiftValue");
  const outputDiv = document.getElementById("output");
  const userAnswerInput = document.getElementById("userAnswer");
  const checkAnswerButton = document.getElementById("checkAnswer");
  const resultMessage = document.getElementById("resultMessage");
  const scoreDisplay = document.getElementById("score");
  const showAnswerButton = document.getElementById("showAnswer");
  const triesRemaining = document.getElementById("triesRemaining");

  let score = 0;
  let originalText = "";
  let originalShift = 0;
  let numberOfTries = 0;
  const maxTries = 5;

  encryptButton.addEventListener("click", () => {
    numberOfTries = 0;
    originalText = getRandomText();
    originalShift = getRandomShift();

    wordToEncrypt.textContent = originalText;
    shiftValue.textContent = originalShift;
    outputDiv.style.display = "block";
    userAnswerInput.value = "";
    resultMessage.textContent = "";
    checkAnswerButton.disabled = false;
    triesRemaining.textContent = "Tries Remaining: " + (maxTries - numberOfTries);
  });

  checkAnswerButton.addEventListener("click", () => {
    if (numberOfTries >= maxTries) {
      checkAnswerButton.disabled = true;
      return;
    }

    const userAnswer = userAnswerInput.value;
    const encryptedText = caesarCipher(originalText, originalShift);

    if (userAnswer.toLowerCase() === encryptedText.toLowerCase()) {
      score += 10;
      resultMessage.textContent = "Correct! The answer is " + encryptedText;
    } else {
      score -= 5;
      resultMessage.textContent = "Incorrect. Try again.";
      numberOfTries++;
    }

    scoreDisplay.textContent = "Score: " + score;
    triesRemaining.textContent = "Tries Remaining: " + (maxTries - numberOfTries);

    if (numberOfTries >= maxTries) {
      checkAnswerButton.disabled = true;
    }
  });

  showAnswerButton.addEventListener("click", () => {

    resultMessage.textContent = "Correct Answer: " + caesarCipher(originalText, originalShift);
  });

  function caesarCipher(text, shift) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      if (/[a-zA-Z]/.test(char)) {
        const isUpperCase = char === char.toUpperCase();
        char = char.toUpperCase();

        const charCode = char.charCodeAt(0);
        const shiftedCharCode = ((charCode - 65 + shift) % 26 + 26) % 26 + 65;
        let shiftedChar = String.fromCharCode(shiftedCharCode);

        if (!isUpperCase) {
          shiftedChar = shiftedChar.toLowerCase();
        }

        result += shiftedChar;
      } else {
        result += char;
      }
    }

    return result;
  }

  function getRandomText() {
    const words = ["Hello", "World", "Caesar", "Cipher", "Encrypt", "Javascript", "Hi", "Challenge", "AI", "Scoring","Apple", "Bear", "Cat", "Dog", "Fish", "Rose", "Moon", "Sun", "Book", "Tree",
    "Star", "Lamp", "Rain", "Rose", "Gold", "Blue", "Leaf", "Love", "Bird", "Duck",
    "Wind", "Hand", "Moon", "Ship", "Fire", "Snow", "Tree", "King", "Queen", "Frog",
    "Bell", "Pink", "Frog", "Ring", "Rose", "Cake", "Hat", "Fish", "Hill", "Silk",
    "Deer", "Duck", "Gift", "Pine", "Sand", "Rose", "Fish", "Moon", "Bird", "Star",
    "Milk", "Rose", "Lake", "Rose", "Love", "Rose", "Wind", "Park", "Rose", "Hill",
    "Book", "Bear", "Hand", "Star", "Rose", "Ship", "Lion", "Coin", "Duck", "Gold",
    "Rose", "Gate", "Silk", "Hand", "Moon", "Ring", "Rose", "Fire", "Cake", "Sand",
    "Leaf", "Bird", "Duck", "Rose", "Book", "Love", "Milk", "Rose", "Fish", "Frog",
    "Frog", "Rain", "Wind", "Bear", "Pink", "Bear", "Tree", "Fire", "Rose", "King"];
    return words[Math.floor(Math.random() * words.length)];
  }

  function getRandomShift() {
  
    return Math.floor(Math.random() * 5) + 1;
  }
});
