import { Result } from "./result";

export class Hangman {
  private secretWord: string;
  private incorrectGuessesAllowed: number;
  private incorrectGuesses: string[] = [];
  constructor(secretWord: string, incorrectGuessesAllowed: number) {
    this.secretWord = secretWord.toUpperCase();
    this.incorrectGuessesAllowed = incorrectGuessesAllowed;
  }

  get gameIsInProgress() {
    return true;
  }

  guess(letter: string): Result {
    if (this.isInvalid(letter)) return Result.Invalid;

    if (this.isInTheSecretWord(letter)) return Result.Correct

    this.incorrectGuesses.push(letter);
    return Result.Incorrect;
  }

  private isInvalid(letter: string): boolean {
    return !/^[a-z]{1}$/gi.test(letter);
  }

  private isInTheSecretWord(letter: string): boolean {
    return new RegExp(letter, 'gi').test(this.secretWord);
  }
}


