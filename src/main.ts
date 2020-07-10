import { Hangman } from "./hangman";

const game = new Hangman('Vegemite', 6);

const secretWord = document.getElementById('secretWord') as HTMLHeadingElement;

secretWord.textContent = game.maskedSecretWord;





