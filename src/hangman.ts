import { Result } from "./result";

export class Hangman {
  private secretWord: string;
  private incorrectGuessesAllowed: number;
  constructor(secretWord: string, incorrectGuessesAllowed: number) {
    this.secretWord = secretWord.toUpperCase();
    this.incorrectGuessesAllowed = incorrectGuessesAllowed;
  }

  get gameIsInProgress() {
    return true;
  }

  guess(letter: string): Result {
    if (this.isInvalid(letter)) return Result.Invalid;

    return Result.Correct;
  }

  private isInvalid(letter: string): boolean {
    return !/^[a-z]{1}$/gi.test(letter);
  }
}


