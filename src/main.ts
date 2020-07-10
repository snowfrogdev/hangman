import { Hangman } from './hangman';

const game = new Hangman('Vegemite', 6);

const secretWord = document.getElementById('secretWord') as HTMLHeadingElement;
const guess = document.getElementById('guess') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const incorrectGuesses = document.getElementById('incorrectGuesses') as HTMLParagraphElement;
const remainingGuesses = document.getElementById('remainingGuesses') as HTMLParagraphElement;
const messageCenter = document.getElementById('messageCenter') as HTMLHeadingElement;

secretWord.textContent = game.maskedSecretWord;
updateRemainingGuesses();
messageCenter.textContent = '🎶🎵🎶 Welcome to jungle, we got fun and games 🎶🎵🎶';

button.addEventListener('click', (e) => {
  const result = game.guess(guess.value);
  messageCenter.textContent = result;
  secretWord.textContent = game.maskedSecretWord;
  incorrectGuesses.textContent = [...game.incorrectGuesses].join(', ');
  updateRemainingGuesses();
  guess.value = '';
  
  if (!game.isInProgress) {
    disableInputs();
  }
});

function disableInputs() {
  guess.disabled = true;
  button.disabled = true;
}

function updateRemainingGuesses() {
  remainingGuesses.textContent = `You are allowed ${game.remainingGuesses} incorrect guesses`;
}
