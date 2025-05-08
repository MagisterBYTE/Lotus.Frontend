import { StringHelper } from './StringHelper';

describe('StringHelper', () => 
{
  describe('equalIgnoreCase', () => 
  {
    it('should compare strings case-insensitively', () => 
    {
      expect(StringHelper.equalIgnoreCase('Hello', 'hello')).toBe(true);
      expect(StringHelper.equalIgnoreCase('WORLD', 'world')).toBe(true);
      expect(StringHelper.equalIgnoreCase('Test', 'TesT')).toBe(true);
      expect(StringHelper.equalIgnoreCase('one', 'two')).toBe(false);
    });
  });

  describe('isNullOrEmpty', () => 
  {
    it('should return true for null or undefined', () => 
    {
      expect(StringHelper.isNullOrEmpty(null)).toBe(true);
      expect(StringHelper.isNullOrEmpty(undefined)).toBe(true);
    });

    it('should return true for empty string', () => 
    {
      expect(StringHelper.isNullOrEmpty('')).toBe(true);
      expect(StringHelper.isNullOrEmpty('   ')).toBe(true);
    });

    it('should return false for non-empty string', () => 
    {
      expect(StringHelper.isNullOrEmpty('text')).toBe(false);
      expect(StringHelper.isNullOrEmpty('  text  ')).toBe(false);
    });
  });

  describe('capitalizeFirstLetter', () => 
  {
    it('should capitalize first letter', () => 
    {
      expect(StringHelper.capitalizeFirstLetter('hello')).toBe('Hello');
      expect(StringHelper.capitalizeFirstLetter('Hello')).toBe('Hello');
      expect(StringHelper.capitalizeFirstLetter('1hello')).toBe('1hello');
    });

    it('should handle empty string', () => 
    {
      expect(StringHelper.capitalizeFirstLetter('')).toBe('');
    });

    it('should capitalize first letter', () => 
    {
      expect(StringHelper.capitalizeFirstLetter('текст 123')).toBe('Текст 123');
      expect(StringHelper.capitalizeFirstLetter('тЕКСТ')).toBe('ТЕКСТ');
    });
    
    it('should return the same string if first symbol cannot be capitalized', () => 
    {
      expect(StringHelper.capitalizeFirstLetter('123 текст')).toBe('123 текст');
      expect(StringHelper.capitalizeFirstLetter('<> текст')).toBe('<> текст');
      expect(StringHelper.capitalizeFirstLetter('555')).toBe('555');
    });
    
    it('should return an empty string if it was passed', () => 
    {
      expect(StringHelper.capitalizeFirstLetter('')).toBe('');
    });
  });

  describe('lowercaseFirstLetter', () => 
  {
    it('should lowercase first letter', () => 
    {
      expect(StringHelper.lowercaseFirstLetter('Hello')).toBe('hello');
      expect(StringHelper.lowercaseFirstLetter('hello')).toBe('hello');
      expect(StringHelper.lowercaseFirstLetter('1Hello')).toBe('1Hello');
    });

    it('should handle empty string', () => 
    {
      expect(StringHelper.lowercaseFirstLetter('')).toBe('');
    });
  });

  describe('toUpperCaseAllFirstLetters', () => 
  {
    it('should capitalize first letters of all words', () => 
    {
      expect(StringHelper.toUpperCaseAllFirstLetters('hello world')).toBe('Hello World');
      expect(StringHelper.toUpperCaseAllFirstLetters('john doe smith')).toBe('John Doe Smith');
    });

    it('should handle single word', () => 
    {
      expect(StringHelper.toUpperCaseAllFirstLetters('hello')).toBe('Hello');
    });

    it('should handle empty string', () => 
    {
      expect(StringHelper.toUpperCaseAllFirstLetters('')).toBe('');
    });
  });

  describe('toPascalCase', () => 
  {
    it('should convert to PascalCase', () => 
    {
      expect(StringHelper.toPascalCase('hello world')).toBe('HelloWorld');
      expect(StringHelper.toPascalCase('some-text-here')).toBe('SomeTextHere');
      expect(StringHelper.toPascalCase('some_text_here')).toBe('SomeTextHere');
      expect(StringHelper.toPascalCase('someTextHere')).toBe('SomeTextHere');
    });
  });

  describe('toCamelCase', () => 
  {
    it('should convert to camelCase', () => 
    {
      expect(StringHelper.toCamelCase('Hello world')).toBe('helloWorld');
      expect(StringHelper.toCamelCase('SOME_TEXT_HERE')).toBe('someTextHere');
      expect(StringHelper.toCamelCase('some-text-here')).toBe('someTextHere');
      expect(StringHelper.toCamelCase('SomeTextHere')).toBe('someTextHere');
    });
  });

  describe('toSnakeCase', () => 
  {
    it('should convert to snake_case', () => 
    {
      expect(StringHelper.toSnakeCase('HelloWorld')).toBe('hello_world');
      expect(StringHelper.toSnakeCase('someTextHere')).toBe('some_text_here');
      expect(StringHelper.toSnakeCase('some-text-here')).toBe('some_text_here');
      expect(StringHelper.toSnakeCase('Some Text Here')).toBe('some_text_here');
    });
  });

  describe('toUpperSnakeCase', () => 
  {
    it('should convert to UPPER_SNAKE_CASE', () => 
    {
      expect(StringHelper.toUpperSnakeCase('HelloWorld')).toBe('HELLO_WORLD');
      expect(StringHelper.toUpperSnakeCase('someTextHere')).toBe('SOME_TEXT_HERE');
      expect(StringHelper.toUpperSnakeCase('some-text-here')).toBe('SOME_TEXT_HERE');
    });
  });

  describe('toKebabCase', () => 
  {
    it('should convert to kebab-case', () => 
    {
      expect(StringHelper.toKebabCase('HelloWorld')).toBe('hello-world');
      expect(StringHelper.toKebabCase('someTextHere')).toBe('some-text-here');
      expect(StringHelper.toKebabCase('some_text_here')).toBe('some-text-here');
      expect(StringHelper.toKebabCase('Some Text Here')).toBe('some-text-here');
    });
  });
});
