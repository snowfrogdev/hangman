class Hangman {
  private secretWord: string;
  constructor (secretWord: string) {
    this.secretWord = secretWord.toUpperCase();
  }
}