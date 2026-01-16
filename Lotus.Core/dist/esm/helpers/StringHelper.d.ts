/**
 * Вспомогательный класс для работы со строками
 */
export declare abstract class StringHelper {
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
    static equalIgnoreCase(first: string, second: string): boolean;
    /**
     * Проверяет, является ли строка undefined или пустой
     * @param {string | undefined | null} value - Проверяемое значение
     * @returns {boolean} true, если строка undefined или пустая
     * @example
     * StringHelper.isNullOrEmpty(undefined); // true
     * StringHelper.isNullOrEmpty(null); // true
     * StringHelper.isNullOrEmpty(''); // true
     * StringHelper.isNullOrEmpty('text'); // false
     */
    static isNullOrEmpty(value?: unknown): boolean;
    /**
     * Преобразует первый символ строки в верхний регистр
     * @param {string} value - Исходная строка
     * @returns {string} Строка с первым символом в верхнем регистре
     * @example
     * StringHelper.capitalizeFirstLetter('hello'); // 'Hello'
     * StringHelper.capitalizeFirstLetter(''); // ''
     */
    static capitalizeFirstLetter(value: string): string;
    /**
     * Преобразует первый символ строки в нижний регистр
     * @param {string} value - Исходная строка
     * @returns {string} Строка с первым символом в нижнем регистре
     * @example
     * StringHelper.lowercaseFirstLetter('Hello'); // 'hello'
     * StringHelper.lowercaseFirstLetter(''); // ''
     */
    static lowercaseFirstLetter(value: string): string;
    /**
     * Преобразует первые буквы всех слов в строке в верхний регистр
     * @param {string} value - Исходная строка
     * @returns {string} Строка с первыми буквами всех слов в верхнем регистре
     * @example
     * StringHelper.toUpperCaseAllFirstLetters('hello world'); // 'Hello World'
     * StringHelper.toUpperCaseAllFirstLetters('john doe'); // 'John Doe'
     */
    static toUpperCaseAllFirstLetters(value: string): string;
    /**
     * Преобразует строку в PascalCase (стиль ВерхнийВерблюжийРегистр)
     * @param {string} value - Исходная строка
     * @returns {string} Строка в PascalCase
     * @example
     * StringHelper.toPascalCase('hello world'); // 'HelloWorld'
     * StringHelper.toPascalCase('some-text-here'); // 'SomeTextHere'
     */
    static toPascalCase(value: string): string;
    /**
     * Преобразует строку в camelCase (стиль нижнийВерблюжийРегистр)
     * @param {string} value - Исходная строка
     * @returns {string} Строка в camelCase
     * @example
     * StringHelper.toCamelCase('Hello world'); // 'helloWorld'
     * StringHelper.toCamelCase('SOME_TEXT_HERE'); // 'someTextHere'
     */
    static toCamelCase(value: string): string;
    /**
     * Преобразует строку в snake_case (стиль нижний_регистр_с_подчеркиваниями)
     * @param {string} value - Исходная строка
     * @returns {string} Строка в snake_case
     * @example
     * StringHelper.toSnakeCase('HelloWorld'); // 'hello_world'
     * StringHelper.toSnakeCase('someTextHere'); // 'some_text_here'
     */
    static toSnakeCase(value: string): string;
    /**
     * Преобразует строку в UPPER_SNAKE_CASE (стиль ВЕРХНИЙ_РЕГИСТР_С_ПОДЧЕРКИВАНИЯМИ)
     * @param {string} value - Исходная строка
     * @returns {string} Строка в UPPER_SNAKE_CASE
     * @example
     * StringHelper.toUpperSnakeCase('HelloWorld'); // 'HELLO_WORLD'
     * StringHelper.toUpperSnakeCase('someTextHere'); // 'SOME_TEXT_HERE'
     */
    static toUpperSnakeCase(value: string): string;
    /**
     * Преобразует строку в kebab-case (стиль нижний-регистр-с-дефисами)
     * @param {string} value - Исходная строка
     * @returns {string} Строка в kebab-case
     * @example
     * StringHelper.toKebabCase('HelloWorld'); // 'hello-world'
     * StringHelper.toKebabCase('someTextHere'); // 'some-text-here'
     */
    static toKebabCase(value: string): string;
    /**
     * Заменить символы отдельных пробелов на стандартный пробел
     * @param {string} value - Исходная строка
     * @returns {string} Строка
     */
    static replaceToSpace(value: string): string;
    /**
   * Форматирует строку с поддержкой:
   * 1. Позиционных параметров: {0}, {1}, {2}
   * 2. Именованных параметров: {name}, {age}
   * 3. Смешанного использования с приоритетом: именованные > позиционные
   *
   * @param format Строка формата с плейсхолдерами в фигурных скобках
   * @param args Аргументы для подстановки (могут быть отдельными значениями или объектом)
   * @returns Отформатированная строка
   */
    static stringFormat(format: string, ...args: unknown[]): string;
}
//# sourceMappingURL=StringHelper.d.ts.map