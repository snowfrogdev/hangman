import { Hangman } from "./hangman";

const game = new Hangman('Vegemite', 6);

const secretWord = document.getElementById('secretWord') as HTMLHeadingElement;
const guess = document.getElementById('guess') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;

button.addEventListener('click', (e) => {
  game.guess(guess.value);
  secretWord.textContent = game.maskedSecretWord;
  guess.value = '';

})

secretWord.textContent = game.maskedSecretWord;





