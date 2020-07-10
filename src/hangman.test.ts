import { Hangman } from './hangman';
import { Result } from './result';

describe('Hangman.guess(letter: string),', () => {
  test.each`
    secretWord    | letterInput         | result
    ${'foo'}      | ${'F'}              | ${Result.Correct}
    ${'foo'}      | ${'o'}              | ${Result.Correct}
    ${'foo'}      | ${'b'}              | ${Result.Incorrect}
    ${'foo'}      | ${'K'}              | ${Result.Incorrect}
    ${'word'}     | ${'yo'}             | ${Result.Invalid}
    ${'word'}     | ${'yolo'}           | ${Result.Invalid}
    ${'sentence'} | ${'yo mama so fat'} | ${Result.Invalid}
    ${'number'}   | ${'6'}              | ${Result.Invalid}
    ${'poop'}     | ${'💩'}             | ${Result.Invalid}
    ${'star'}     | ${'*'}              | ${Result.Invalid}
  `(
    'given secretWord is "$secretWord", if guess is "$letterInput", return "$result"',
    ({ secretWord, letterInput, result }) => {
      const game = new Hangman(secretWord, 1);

      expect(game.guess(letterInput)).toBe(result);
    }
  );

  test.each`
    previousGuess | guess  | result
    ${'f'}        | ${'u'} | ${Result.Correct}
    ${'i'}        | ${'a'} | ${Result.Correct}
    ${'b'}        | ${'B'} | ${Result.Duplicate}
    ${'z'}        | ${'Z'} | ${Result.Duplicate}
  `(
    'given that "$previousGuess" was previously guessed, if guess is "$guess", return "$result"',
    ({ previousGuess, guess, result }) => {
      const game = new Hangman('FizzBuzzBazz', 1);

      game.guess(previousGuess);

      expect(game.guess(guess)).toBe(result);
    }
  );

  test.each`
    secretWord   | maxBadGuess | guesses                                          | result
    ${'Rage'}    | ${0}        | ${['r', 'a', 'g', 'e']}                          | ${Result.Won}
    ${'against'} | ${2}        | ${['w', 'y', 'a', 'g', 'i', 'n', 's', 't']}      | ${Result.Won}
    ${'the'}     | ${1}        | ${['Q', 't', 'h', 'e']}                          | ${Result.Won}
    ${'Machine'} | ${2}        | ${['x', 'M', 'y', 'a', 'C', 'h', 'I', 'n', 'E']} | ${Result.Won}
    ${'Blood'}   | ${2}        | ${['k', 'B', 'a', 'D', 'F']}                     | ${Result.Lost}
    ${'Hound'}   | ${1}        | ${['H', 'M', 'o', 'Q']}                          | ${Result.Lost}
    ${'Gang'}    | ${3}        | ${['x', 'g', 'y', 'a', 'C', 'h']}                | ${Result.Lost}
  `(
    'given secretWord is "$secretWord" and incorrectGuessesAllowed is "$maxBadGuess", if guesses are "$guesses", return "$result"',
    ({ secretWord, maxBadGuess, guesses, result }) => {
      const game = new Hangman(secretWord, maxBadGuess);
      const lastGuess = guesses[guesses.length - 1];
      const guessesExceptLast = guesses.slice(0, -1);

      for (const guess of guessesExceptLast) {
        game.guess(guess);
      }

      expect(game.guess(lastGuess)).toBe(result);
    }
  );
});

describe('Hangman.gameIsInProgress(),', () => {
  test.each`
    secretWord   | maxBadGuess | guesses                           | result
    ${'Rage'}    | ${0}        | ${['r', 'a', 'g', 'e']}           | ${false}
    ${'against'} | ${2}        | ${['w', 'y', 'a']}                | ${true}
    ${'the'}     | ${1}        | ${['Q', 't', 'h', 'e']}           | ${false}
    ${'Machine'} | ${2}        | ${['x', 'M', 'y', 'a', 'C']}      | ${true}
    ${'Blood'}   | ${2}        | ${['k', 'B', 'a', 'D', 'F']}      | ${false}
    ${'Hound'}   | ${1}        | ${['H']}                          | ${true}
    ${'Gang'}    | ${3}        | ${['x', 'g', 'y', 'a', 'C', 'h']} | ${false}
  `(
    'given secretWord is "$secretWord" and incorrectGuessesAllowed is "$maxBadGuess", if guesses are "$guesses", return "$result"',
    ({ secretWord, maxBadGuess, guesses, result }) => {
      const game = new Hangman(secretWord, maxBadGuess);

      for (const guess of guesses) {
        game.guess(guess);
      }

      expect(game.gameIsInProgress).toBe(result);
    }
  );
});
