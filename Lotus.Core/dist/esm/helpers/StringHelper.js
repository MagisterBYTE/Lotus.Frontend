import { CharConstants } from '#constants';
/**
 * Вспомогательный класс для работы со строками
 */
export class StringHelper {
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
    static equalIgnoreCase(first, second) {
        return first.toLocaleUpperCase() === second.toLocaleUpperCase();
    }
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
    static isNullOrEmpty(value) {
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
    static capitalizeFirstLetter(value) {
        if (value.length > 0) {
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
    static lowercaseFirstLetter(value) {
        if (value.length > 0) {
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
    static toUpperCaseAllFirstLetters(value) {
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
    static toPascalCase(value) {
        if (value.includes(' ') || value.includes('_') || value.includes('-')) {
            return value
                .split(/[\s\-_]+/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join('');
        }
        else {
            if (value.length > 0) {
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
    static toCamelCase(value) {
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
    static toSnakeCase(value) {
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
    static toUpperSnakeCase(value) {
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
    static toKebabCase(value) {
        return this.toSnakeCase(value).replace(/_/g, '-');
    }
    /**
     * Заменить символы отдельных пробелов на стандартный пробел
     * @param {string} value - Исходная строка
     * @returns {string} Строка
     */
    static replaceToSpace(value) {
        let result = value.replaceAll(CharConstants.NonBreakingSpace, CharConstants.Space);
        result = result.replaceAll(CharConstants.FigureSpace, CharConstants.Space);
        result = result.replaceAll(CharConstants.NarrowNoBreakSpace, CharConstants.Space);
        result = result.replaceAll(CharConstants.WordJoiner, CharConstants.Space);
        return result;
    }
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
    static stringFormat(format, ...args) {
        // Если первый аргумент после format - это объект и это единственный аргумент,
        // используем его как именованные параметры
        if (args.length === 1 && typeof args[0] === 'object' && args[0] !== undefined && args[0] !== null && !Array.isArray(args[0])) {
            const params = args[0];
            return format.replace(/{(\w+)}/g, (match, key) => {
                return key in params ? String(params[key]) : match;
            });
        }
        // В противном случае работаем с позиционными параметрами,
        // но также поддерживаем именованные в объекте если он есть
        let positionalArgs = args;
        let namedParams = {};
        // Проверяем, есть ли среди аргументов объект с именованными параметрами
        const namedParamIndex = args.findIndex(arg => typeof arg === 'object' &&
            arg !== undefined &&
            arg !== null &&
            !Array.isArray(arg) &&
            Object.keys(arg).some(key => typeof key === 'string'));
        if (namedParamIndex !== -1) {
            namedParams = args[namedParamIndex];
            // Удаляем объект из позиционных аргументов
            positionalArgs = args.filter((_, index) => index !== namedParamIndex);
        }
        // Заменяем плейсхолдеры с приоритетом: именованные > позиционные
        let indexArg = 0;
        return format.replace(/{(\w+)}/g, (match, key) => {
            // Сначала проверяем именованные параметры
            if (key in namedParams) {
                return String(namedParams[key]);
            }
            // Затем проверяем, может ли ключ быть числовым индексом
            const numericIndex = parseInt(key, 10);
            if (!isNaN(numericIndex) && numericIndex >= 0 && numericIndex < positionalArgs.length) {
                return String(positionalArgs[numericIndex]);
            }
            // заменяем по индексу
            if (indexArg < args.length) {
                const result = String(args[indexArg]);
                indexArg++;
                return result;
            }
            // Если ничего не найдено, оставляем плейсхолдер как есть
            return match;
        });
    }
}
//# sourceMappingURL=StringHelper.js.map