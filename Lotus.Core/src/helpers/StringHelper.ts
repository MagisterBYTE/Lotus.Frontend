/**
 * Вспомогательный класс для работы со строками
 */
export abstract class StringHelper
{
  /**
   * Сравнивает строки без учета регистра
   * @param {string} first - Первая строка для сравнения
   * @param {string} second - Вторая строка для сравнения
   * @returns {boolean} true, если строки равны без учета регистра
   * @example
   * StringHelper.equalIgnoreCase('Hello', 'hello'); // true
   * StringHelper.equalIgnoreCase('world', 'Word'); // false
   * @see https://stackoverflow.com/a/2140644
   * @warning Может не работать с Unicode специальными символами
   */
  public static equalIgnoreCase(first: string, second: string): boolean
  {
    return first.toLocaleUpperCase() === second.toLocaleUpperCase();
  }

  /**
   * Проверяет, является ли строка null, undefined или пустой
   * @param {string | undefined | null} value - Проверяемое значение
   * @returns {boolean} true, если строка null, undefined или пустая
   * @example
   * StringHelper.isNullOrEmpty(null); // true
   * StringHelper.isNullOrEmpty(''); // true
   * StringHelper.isNullOrEmpty('text'); // false
   */
  public static isNullOrEmpty(value?: string | null): boolean
  {
    return value === undefined || value === null || (typeof value == 'string' && value.trim() === '');
  }

  /**
   * Преобразует первый символ строки в верхний регистр
   * @param {string} value - Исходная строка
   * @returns {string} Строка с первым символом в верхнем регистре
   * @example
   * StringHelper.capitalizeFirstLetter('hello'); // 'Hello'
   * StringHelper.capitalizeFirstLetter(''); // ''
   */
  public static capitalizeFirstLetter(value: string): string
  {
    if (value.length > 0)
    {
      return value[0].toLocaleUpperCase() + value.slice(1);
    }
    return value;
  }

  /**
   * Преобразует первый символ строки в нижний регистр
   * @param {string} value - Исходная строка
   * @returns {string} Строка с первым символом в нижнем регистре
   * @example
   * StringHelper.lowercaseFirstLetter('Hello'); // 'hello'
   * StringHelper.lowercaseFirstLetter(''); // ''
   */
  public static lowercaseFirstLetter(value: string): string
  {
    if (value.length > 0)
    {
      return value[0].toLocaleLowerCase() + value.slice(1);
    }
    return value;
  }

  /**
   * Преобразует первые буквы всех слов в строке в верхний регистр
   * @param {string} value - Исходная строка
   * @returns {string} Строка с первыми буквами всех слов в верхнем регистре
   * @example
   * StringHelper.toUpperCaseAllFirstLetters('hello world'); // 'Hello World'
   * StringHelper.toUpperCaseAllFirstLetters('john doe'); // 'John Doe'
   */
  public static toUpperCaseAllFirstLetters(value: string): string
  {
    return value.split(' ').map((word) => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
  }

  /**
   * Преобразует строку в PascalCase (стиль ВерхнийВерблюжийРегистр)
   * @param {string} value - Исходная строка
   * @returns {string} Строка в PascalCase
   * @example
   * StringHelper.toPascalCase('hello world'); // 'HelloWorld'
   * StringHelper.toPascalCase('some-text-here'); // 'SomeTextHere'
   */
  public static toPascalCase(value: string): string
  {
    if (value.includes(' ') || value.includes('_') || value.includes('-'))
    {
      return value
        .split(/[\s\-_]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
    }
    else
    {
      if (value.length > 0)
      {
        return value[0].toLocaleUpperCase() + value.slice(1);
      }
        
      return value;
    }
  }

  /**
   * Преобразует строку в camelCase (стиль нижнийВерблюжийРегистр)
   * @param {string} value - Исходная строка
   * @returns {string} Строка в camelCase
   * @example
   * StringHelper.toCamelCase('Hello world'); // 'helloWorld'
   * StringHelper.toCamelCase('SOME_TEXT_HERE'); // 'someTextHere'
   */
  public static toCamelCase(value: string): string
  {
    const pascal = this.toPascalCase(value);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  /**
   * Преобразует строку в snake_case (стиль нижний_регистр_с_подчеркиваниями)
   * @param {string} value - Исходная строка
   * @returns {string} Строка в snake_case
   * @example
   * StringHelper.toSnakeCase('HelloWorld'); // 'hello_world'
   * StringHelper.toSnakeCase('someTextHere'); // 'some_text_here'
   */
  public static toSnakeCase(value: string): string
  {
    return value
      .replace(/[\W_]+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
  }

  /**
   * Преобразует строку в UPPER_SNAKE_CASE (стиль ВЕРХНИЙ_РЕГИСТР_С_ПОДЧЕРКИВАНИЯМИ)
   * @param {string} value - Исходная строка
   * @returns {string} Строка в UPPER_SNAKE_CASE
   * @example
   * StringHelper.toUpperSnakeCase('HelloWorld'); // 'HELLO_WORLD'
   * StringHelper.toUpperSnakeCase('someTextHere'); // 'SOME_TEXT_HERE'
   */
  public static toUpperSnakeCase(value: string): string
  {
    return this.toSnakeCase(value).toUpperCase();
  }

  /**
   * Преобразует строку в kebab-case (стиль нижний-регистр-с-дефисами)
   * @param {string} value - Исходная строка
   * @returns {string} Строка в kebab-case
   * @example
   * StringHelper.toKebabCase('HelloWorld'); // 'hello-world'
   * StringHelper.toKebabCase('someTextHere'); // 'some-text-here'
   */
  public static toKebabCase(value: string): string
  {
    return this.toSnakeCase(value).replace(/_/g, '-');
  }
}
