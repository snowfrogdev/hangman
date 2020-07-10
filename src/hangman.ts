class Hangman {
  private secretWord: string;
  private incorrectGuessesAllowed: number;
  constructor(secretWord: string, incorrectGuessesAllowed: number) {
    this.secretWord = secretWord.toUpperCase();
    this.incorrectGuessesAllowed = incorrectGuessesAllowed;
  }

  get gameIsInProgress() {
    return true;
  }
}