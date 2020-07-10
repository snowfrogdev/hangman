import { Hangman } from './hangman';
import { Result } from './result';

describe('Hangman.guess should accept a letter,', () => {
  test.each`
    input               | result
    ${'F'}              | ${Result.Correct}
    ${'o'}              | ${Result.Correct}
    ${'yo'}             | ${Result.Invalid}
    ${'yolo'}           | ${Result.Invalid}
    ${'yo mama so fat'} | ${Result.Invalid}
    ${'6'}              | ${Result.Invalid}
    ${'💩'}             | ${Result.Invalid}
    ${'*'}              | ${Result.Invalid}
  `('if the letter parameter is "$input", return "$result",', ({ input, result }) => {
    const game = new Hangman('foo', 1);

    expect(game.guess(input)).toBe(result);
  });
});
