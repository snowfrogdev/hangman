import { Result } from './result';

export class Hangman {
  private secretWord: string;
  private incorrectGuessesAllowed: number;
  private _incorrectGuesses: string[] = [];
  private guesses = new Set<string>();
  constructor(secretWord: string, incorrectGuessesAllowed: number) {
    this.secretWord = secretWord.toUpperCase();
    this.incorrectGuessesAllowed = incorrectGuessesAllowed;
  }

  get incorrectGuesses(): Iterable<string> {
    return this._incorrectGuesses.values();
  }

  get gameIsInProgress() {
    return !this.isGameLost() && !this.isGameWon();
  }

  get maskedSecretWord(): string {
    return this.secretWord
      .split('')
      .map(this.mask, this)
      .join('');
  }

  private mask(letter: string): string {
    if (this.guesses.has(letter)) return letter;

    return '_';
  }

  guess(letter: string): Result {
    if (this.isInvalid(letter)) return Result.Invalid;
    const validLetter = letter.toUpperCase();

    if (this.wasPreviouslyGuessed(validLetter)) return Result.Duplicate;

    this.guesses.add(validLetter);

    if (this.isGameWon()) return Result.Won;

    if (this.isInTheSecretWord(validLetter)) return Result.Correct;

    this._incorrectGuesses.push(validLetter);

    if (this.isGameLost()) return Result.Lost;

    return Result.Incorrect;
  }

  private isInvalid(letter: string): boolean {
    return !/^[a-z]{1}$/gi.test(letter);
  }

  wasPreviouslyGuessed(validLetter: string) {
    return this.guesses.has(validLetter);
  }

  private isGameWon(): boolean {
    const lettersToGuess = new Set(this.secretWord);
    this.guesses.forEach((guess) => lettersToGuess.delete(guess));

    return lettersToGuess.size === 0;
  }

  private isGameLost(): boolean {
    return this._incorrectGuesses.length > this.incorrectGuessesAllowed;
  }

  private isInTheSecretWord(validLetter: string): boolean {
    return new RegExp(validLetter, 'gi').test(this.secretWord);
  }
}
