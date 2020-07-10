import { Hangman } from './hangman';

const secretWord = document.getElementById('secretWord') as HTMLHeadingElement;
const guess = document.getElementById('guess') as HTMLInputElement;
const submitButton = document.getElementById('submit') as HTMLButtonElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;
const incorrectGuesses = document.getElementById('incorrectGuesses') as HTMLParagraphElement;
const remainingGuesses = document.getElementById('remainingGuesses') as HTMLParagraphElement;
const messageCenter = document.getElementById('messageCenter') as HTMLHeadingElement;

let game: Hangman;
resetGame();

submitButton.addEventListener('click', (e) => {
  const result = game.guess(guess.value);
  updateMessageCenter(result);
  secretWord.textContent = game.maskedSecretWord;
  incorrectGuesses.textContent = [...game.incorrectGuesses].join(', ');
  updateRemainingGuesses();
  guess.value = '';

  if (!game.isInProgress) {
    disableInputs();
  }
});

resetButton.addEventListener('click', resetGame);
function resetGame() {
  fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then((response) => response.json())
    .then((words) => {
      const word = words[0];
      game = new Hangman(word, 6);

      secretWord.textContent = game.maskedSecretWord;
      updateMessageCenter('🎶🎵🎶 Welcome to jungle, we got fun and games 🎶🎵🎶');
      updateRemainingGuesses();
      enableInputs();
    });
}

function updateMessageCenter(message: string) {
  messageCenter.textContent = message;
  messageCenter.classList.add('bounce-in');
  setTimeout(() => {
    messageCenter.classList.remove('bounce-in');
  }, 500);
}

function disableInputs() {
  guess.disabled = true;
  submitButton.disabled = true;
}

function enableInputs() {
  guess.disabled = false;
  submitButton.disabled = false;
}

function updateRemainingGuesses() {
  remainingGuesses.textContent = `You are allowed ${game.remainingGuesses} incorrect guesses`;
}
