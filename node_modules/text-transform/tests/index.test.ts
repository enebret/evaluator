import { textTransform, TransformType } from '../src/index';

const testString = 'My coOL test SenTence';

describe('textTransform module', () => {
  test('Returns an uppercase string', () => {
    expect(textTransform(testString, TransformType.uppercase)).toEqual('MY COOL TEST SENTENCE');
  });

  test('Returns a lowercase string', () => {
    expect(textTransform(testString, TransformType.lowercase)).toEqual('my cool test sentence');
  });

  test('Returns a capitalized string', () => {
    expect(textTransform(testString, TransformType.capitalize)).toEqual('My cool test sentence');
  });

  test('Returns a title cased string', () => {
    expect(textTransform(testString, TransformType.title)).toEqual('My Cool Test Sentence');
  });

  test('Returns the initial string', () => {
    expect(textTransform(testString, TransformType.initial)).toEqual(testString);
  });
});
