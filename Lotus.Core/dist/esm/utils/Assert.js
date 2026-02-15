/**
 * Класс для проверки утверждений и валидации данных
 * Содержит статические методы для проверки типов и условий
 */
export class Assert {
    /**
     * Проверка значения на undefined или null
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static emptyValue(value) {
        return value == undefined || value == null || (typeof value === 'string' && value == '');
    }
    /**
     * Проверка на наличие значения
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static existValue(value) {
        const status = value != undefined && value != null;
        if (status) {
            if (typeof value === 'string') {
                if (value === '')
                    return false;
            }
            return true;
        }
        return false;
    }
    /**
     * Метод возвращает true если хотя бы один из аргументов при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static anyTrue(...args) {
        for (const arg of args) {
            // eslint-disable-next-line no-extra-boolean-cast
            if (Boolean(arg)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Метод возвращает true если все аргументы при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static allTrue(...args) {
        // Перебираем все аргументы с помощью цикла for...of
        for (const arg of args) {
            // Если хотя бы один аргумент преобразуется в false,
            // eslint-disable-next-line no-extra-boolean-cast
            if (!Boolean(arg)) {
                // немедленно возвращаем false (короткое замыкание)
                return false;
                // ↑
                // Не проверяем остальные аргументы, так как уже нашли false
            }
        }
        // Если ВСЕ аргументы преобразовались в true, возвращаем true
        // Также возвращает true для пустого списка аргументов
        return true;
    }
    /**
     * Метод возвращает false если хотя бы один из аргументов при преобразовании в Boolean дает false
     * @param args Список аргументов
     * @returns
     */
    static anyFalse(...args) {
        for (const arg of args) {
            if (Boolean(arg) === false) {
                return true;
            }
        }
        return false;
    }
    /**
     * Метод возвращает true если все аргументы при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static allFalse(...args) {
        for (const arg of args) {
            // eslint-disable-next-line no-extra-boolean-cast
            if (Boolean(arg)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Проверяет, является ли значение строкой
     * @param value - Проверяемое значение
     * @returns true, если значение является строкой, иначе false
     */
    static isString(value) {
        return typeof value === 'string';
    }
    /**
     * Проверяет, является ли значение числом
     * @param value - Проверяемое значение
     * @returns true, если значение является числом, иначе false
     */
    static isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }
    /**
     * Проверяет, является ли значение булевым типом
     * @param value - Проверяемое значение
     * @returns true, если значение является boolean, иначе false
     */
    static isBoolean(value) {
        return typeof value === 'boolean';
    }
    /**
     * Проверяет, является ли значение объектом (но не null и не массивом)
     * @param value - Проверяемое значение
     * @returns true, если значение является объектом, иначе false
     */
    static isObject(value) {
        return typeof value === 'object' && value !== null && value !== undefined && !Array.isArray(value);
    }
    /**
     * Проверяет, является ли значение объектом { id: TKey }
     * @param value - Проверяемое значение
     * @returns true, если значение является объектом, иначе false
     */
    static isObjectOfId(value) {
        return typeof value === 'object' && value !== null && value !== undefined && 'id' in value;
    }
    /**
     * Проверяет, является ли значение null
     * @param value - Проверяемое значение
     * @returns true, если значение является null, иначе false
     */
    static isNull(value) {
        return value === null;
    }
    /**
     * Проверяет, является ли значение undefined
     * @param value - Проверяемое значение
     * @returns true, если значение является undefined, иначе false
     */
    static isUndefined(value) {
        return value === undefined;
    }
    /**
     * Проверяет, является ли значение функцией
     * @param value - Проверяемое значение
     * @returns true, если значение является функцией, иначе false
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    static isFunction(value) {
        return typeof value === 'function';
    }
    /**
     * Проверяет, является ли значение символом
     * @param value - Проверяемое значение
     * @returns true, если значение является символом, иначе false
     */
    static isSymbol(value) {
        return typeof value === 'symbol';
    }
    /**
     * Проверяет, является ли значение массивом
     * @param value - Проверяемое значение
     * @returns true, если значение является массивом, иначе false
     */
    static isArray(value) {
        return Array.isArray(value);
    }
    /**
     * Проверяет, является ли значение массивом и содержит ли он хотя бы один элемент
     * @param value - Проверяемое значение
     * @returns true, если значение является непустым массивом, иначе false
     */
    static isArrayWithData(value) {
        return Array.isArray(value) && value.length > 0;
    }
    /**
     * Проверяет, является ли значение массивом строк
     * @param value - Проверяемое значение
     * @returns true, если значение является массивом строк и содержит данные, иначе false
     */
    static isArrayStringWithData(value) {
        return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string');
    }
    /**
     * Проверяет, является ли значение массивом чисел
     * @param value - Проверяемое значение
     * @returns true, если значение является массивом чисел и содержит данные, иначе false
     */
    static isArrayNumberWithData(value) {
        return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'number' && !isNaN(item));
    }
    /**
     * Проверяет, является ли значение массивом объектов
     * @param value - Проверяемое значение
     * @returns true, если значение является массивом объектов и содержит данные, иначе false
     */
    static isArrayObjectWithData(value) {
        return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item));
    }
    /**
     * Проверяет, является ли значение массивом объектов
     * @param value - Проверяемое значение
     * @returns true, если значение является массивом объектов и содержит данные, иначе false
     */
    static isArrayObjectOfIdWithData(value) {
        return Array.isArray(value) && value.length > 0 && Assert.isObjectOfId(value[0]);
    }
    /**
     * Универсальный метод для проверки массива с кастомной проверкой элементов
     * @param value - Проверяемое значение
     * @param itemValidator - Функция для проверки каждого элемента массива
     * @returns true, если значение является массивом с данными и все элементы проходят валидацию
     */
    static isArrayOfTypeWithData(value, itemValidator) {
        return Array.isArray(value) && value.length > 0 && value.every((item) => itemValidator(item));
    }
    /**
     * Проверка объекта на то, что все его свойства имеют значения undefined или null
     * @param object Проверяемый объект
     * @returns Статус проверки
     */
    static isObjectEmpty(object) {
        // В JavaScript/TypeScript оператор != (нестрогое неравенство) с null автоматически отсеивает и undefined
        return !Object.values(object).some((value) => value != null);
    }
    /**
     * Проверка объекта на то, что у него есть хотя бы одно свойство
     * со значением, отличным от null и undefined.
     * @param object Проверяемый объект
     * @returns Статус проверки
     */
    static isObjectNotEmpty(object) {
        // some вернет true, как только найдет первый элемент, удовлетворяющий условию
        return Object.values(object).some((value) => value !== undefined && value !== null);
    }
}
//# sourceMappingURL=Assert.js.map