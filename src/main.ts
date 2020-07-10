import { Hangman } from "./hangman";

const game = new Hangman('Vegemite', 6);

const secretWord = document.getElementById('secretWord') as HTMLHeadingElement;
const guess = document.getElementById('guess') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const incorrectGuesses = document.getElementById('incorrectGuesses') as HTMLParagraphElement;

button.addEventListener('click', (e) => {
  game.guess(guess.value);
  secretWord.textContent = game.maskedSecretWord;
  incorrectGuesses.textContent = [...game.incorrectGuesses].join(', ')
  guess.value = '';
})

secretWord.textContent = game.maskedSecretWord;





