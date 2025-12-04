import { TKey } from '#types';
/**
 * Класс для проверки утверждений и валидации данных
 * Содержит статические методы для проверки типов и условий
 */
export declare abstract class Assert {
    /**
     * Проверка значения на undefined или null
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static emptyValue(value: unknown): boolean;
    /**
     * Проверка на наличие значения
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static existValue<TValue>(value: TValue | any): value is TValue;
    /**
     * Метод возвращает true если хотя бы один из аргументов при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static anyTrue(...args: any[]): boolean;
    /**
     * Метод возвращает true если все аргументы при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static allTrue(...args: any[]): boolean;
    /**
     * Метод возвращает false если хотя бы один из аргументов при преобразовании в Boolean дает false
     * @param args Список аргументов
     * @returns
     */
    static anyFalse(...args: any[]): boolean;
    /**
     * Метод возвращает true если все аргументы при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static allFalse(...args: any[]): boolean;
    /**
     * Проверяет, является ли значение строкой
     * @param value - Проверяемое значение
     * @returns true, если значение является строкой, иначе false
     */
    static isString(value: unknown): value is string;
    /**
     * Проверяет, является ли значение числом
     * @param value - Проверяемое значение
     * @returns true, если значение является числом, иначе false
     */
    static isNumber(value: unknown): value is number;
    /**
     * Проверяет, является ли значение булевым типом
     * @param value - Проверяемое значение
     * @returns true, если значение является boolean, иначе false
     */
    static isBoolean(value: unknown): value is boolean;
    /**
     * Проверяет, является ли значение объектом (но не null и не массивом)
     * @param value - Проверяемое значение
     * @returns true, если значение является объектом, иначе false
     */
    static isObject(value: unknown): value is Record<string, unknown>;
    /**
     * Проверяет, является ли значение объектом { id: TKey }
     * @param value - Проверяемое значение
     * @returns true, если значение является объектом, иначе false
     */
    static isObjectOfId(value: unknown): value is {
        id: TKey;
    };
    /**
     * Проверяет, является ли значение null
     * @param value - Проверяемое значение
     * @returns true, если значение является null, иначе false
     */
    static isNull(value: unknown): value is null;
    /**
     * Проверяет, является ли значение undefined
     * @param value - Проверяемое значение
     * @returns true, если значение является undefined, иначе false
     */
    static isUndefined(value: unknown): value is undefined;
    /**
     * Проверяет, является ли значение функцией
     * @param value - Проверяемое значение
     * @returns true, если значение является функцией, иначе false
     */
    static isFunction(value: unknown): value is Function;
    /**
     * Проверяет, является ли значение символом
     * @param value - Проверяемое значение
     * @returns true, если значение является символом, иначе false
     */
    static isSymbol(value: unknown): value is symbol;
    /**
     * Проверяет, является ли значение массивом
     * @param value - Проверяемое значение
     * @returns true, если значение является массивом, иначе false
     */
    static isArray(value: unknown): value is unknown[];
    /**
     * Проверяет, является ли значение массивом и содержит ли он хотя бы один элемент
     * @param value - Проверяемое значение
     * @returns true, если значение является непустым массивом, иначе false
     */
    static isArrayWithData<T>(value: unknown): value is T[];
    /**
     * Проверяет, является ли значение массивом строк
     * @param value - Проверяемое значение
     * @returns true, если значение является массивом строк и содержит данные, иначе false
     */
    static isArrayStringWithData(value: unknown): value is string[];
    /**
     * Проверяет, является ли значение массивом чисел
     * @param value - Проверяемое значение
     * @returns true, если значение является массивом чисел и содержит данные, иначе false
     */
    static isArrayNumberWithData(value: unknown): value is number[];
    /**
     * Проверяет, является ли значение массивом объектов
     * @param value - Проверяемое значение
     * @returns true, если значение является массивом объектов и содержит данные, иначе false
     */
    static isArrayObjectWithData(value: unknown): value is Record<string, unknown>[];
    /**
     * Проверяет, является ли значение массивом объектов
     * @param value - Проверяемое значение
     * @returns true, если значение является массивом объектов и содержит данные, иначе false
     */
    static isArrayObjectOfIdWithData(value: unknown): value is {
        id: TKey;
    }[];
    /**
     * Универсальный метод для проверки массива с кастомной проверкой элементов
     * @param value - Проверяемое значение
     * @param itemValidator - Функция для проверки каждого элемента массива
     * @returns true, если значение является массивом с данными и все элементы проходят валидацию
     */
    static isArrayOfTypeWithData<TItem>(value: unknown, itemValidator: (item: unknown) => item is TItem): value is TItem[];
    /**
     * Проверка объекта на то, что все его свойства имеют значения undefined
     * @param object Проверяемый объект
     * @returns Статус проверки
     */
    static objectPropertyEmpty(object: object): boolean;
}
//# sourceMappingURL=Assert.d.ts.map