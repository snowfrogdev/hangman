import { Hangman } from './hangman';
import { Result } from './result';

describe('Hangman.guess(letter: string),', () => {
  test.each`
    secretWord          | letterInput          | result
    ${'foo'}            |  ${'F'}              | ${Result.Correct}
    ${'foo'}            |  ${'o'}              | ${Result.Correct}
    ${'foo'}            |  ${'b'}              | ${Result.Incorrect}
    ${'foo'}            |  ${'K'}              | ${Result.Incorrect}
    ${'word'}           |  ${'yo'}             | ${Result.Invalid}
    ${'word'}           |  ${'yolo'}           | ${Result.Invalid}
    ${'sentence'}       |  ${'yo mama so fat'} | ${Result.Invalid}
    ${'number'}         |  ${'6'}              | ${Result.Invalid}
    ${'poop'}           |  ${'💩'}             | ${Result.Invalid}
    ${'star'}           |  ${'*'}              | ${Result.Invalid}
  `('given secretWord == "$secretWord", if guess is "$letterInput", return "$result",', ({ secretWord, letterInput, result }) => {
    const game = new Hangman(secretWord, 1);

    expect(game.guess(letterInput)).toBe(result);
  });
});
