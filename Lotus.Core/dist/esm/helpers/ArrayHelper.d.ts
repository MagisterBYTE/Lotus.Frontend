import { IGrouping } from '#types';
export declare abstract class ArrayHelper {
    /**
     * Находит максимальное значение в массиве чисел.
     *
     * @param {number[]} array - Исходный массив чисел
     * @returns {number} Максимальное значение в массиве
     * @throws {Error} Если массив пустой
     *
     * @example
     * const max = ArrayHelper.max([1, 5, 3, 2]); // 5
     */
    static max(array: number[]): number;
    /**
     * Находит максимальное значение в массиве объектов по указанному ключу.
     *
     * @template TItem - Тип объектов в массиве
     * @param {TItem[]} array - Исходный массив объектов
     * @param {keyof TItem} key - Ключ, по которому производится сравнение
     * @returns {TItem} Объект с максимальным значением по указанному ключу
     * @throws {Error} Если массив пустой или ключ не существует
     *
     * @example
     * const users = [{ age: 25 }, { age: 30 }, { age: 20 }];
     * const oldest = ArrayHelper.maxBy(users, 'age'); // { age: 30 }
     */
    static maxBy<TItem extends object>(array: TItem[], key: keyof TItem): TItem;
    /**
     * Находит минимальное значение в массиве чисел.
     *
     * @param {number[]} array - Исходный массив чисел
     * @returns {number} Минимальное значение в массиве
     * @throws {Error} Если массив пустой
     *
     * @example
     * const min = ArrayHelper.min([1, 5, 3, 2]); // 1
     */
    static min(array: number[]): number;
    /**
     * Находит минимальное значение в массиве объектов по указанному ключу.
     *
     * @template TItem - Тип объектов в массиве
     * @param {TItem[]} array - Исходный массив объектов
     * @param {keyof TItem} key - Ключ, по которому производится сравнение
     * @returns {TItem} Объект с минимальным значением по указанному ключу
     * @throws {Error} Если массив пустой или ключ не существует
     *
     * @example
     * const users = [{ age: 25 }, { age: 30 }, { age: 20 }];
     * const youngest = ArrayHelper.minBy(users, 'age'); // { age: 20 }
     */
    static minBy<TItem extends object>(array: TItem[], key: keyof TItem): TItem;
    /**
     * Пропускает указанное количество элементов и возвращает новый массив.
     *
     * @template TItem - Тип элементов массива
     * @param {TItem[]} array - Исходный массив
     * @param {number} count - Количество элементов для пропуска
     * @returns {TItem[]} Новый массив без первых count элементов
     *
     * @example
     * const result = ArrayHelper.skip([1, 2, 3, 4, 5], 2); // [3, 4, 5]
     * @example
     * const result = ArrayHelper.skip([1, 2, 3], 5); // []
     */
    static skip<TItem>(array: TItem[], count: number): TItem[];
    /**
     * Берет указанное количество элементов с начала массива и возвращает новый массив.
     *
     * @template TItem - Тип элементов массива
     * @param {TItem[]} array - Исходный массив
     * @param {number} count - Количество элементов для взятия
     * @returns {TItem[]} Новый массив с первыми count элементами
     *
     * @example
     * const result = ArrayHelper.take([1, 2, 3, 4, 5], 3); // [1, 2, 3]
     * @example
     * const result = ArrayHelper.take([1, 2, 3], 5); // [1, 2, 3]
     */
    static take<TItem>(array: TItem[], count: number): TItem[];
    /**
     * Получить числовой массив в указанном диапазоне
     * @param from Начальное значение
     * @param to Конечное значение
     * @returns Числовой массив
     */
    static createNumber(from: number, to: number): number[];
    /**
     * Проверка массива что он является строго числовым
     * @param array Проверяемый массив
     * @returns Статус проверки
     */
    static checkIsNumbers(array: unknown[]): boolean;
    /**
     * Проверка на вхождение любого элемента проверяемого массива в исходном массиве
     * @param array Исходный массив
     * @param checked Проверяемый массив
     * @returns Статус проверки
     */
    static checkIn<TItem>(array: TItem[], checked: TItem[]): boolean;
    /**
     * Группировка массива по указанному ключу key
     * @param array Исходный массив
     * @param key Ключ по которому будет произведена группировка
     * @returns Массив групп
     */
    static groupBy<TItem extends object, TKey extends keyof TItem>(array: TItem[], key: TKey): IGrouping<TItem>[];
    /**
     * Получает массив уникальный по ключу key
     * @param array Массив
     * @param key Ключ уникальности
     * @returns Массив уникальный по ключу key
     */
    static uniqueBy<TItem extends object, TKey extends keyof TItem>(array: TItem[], key: TKey): TItem[];
    /**
     * Проверка массива на наличие дубликатов
     *
     * @param array Массив
     * @param key Ключ по которому идет проверка
     * @returns Статус проверки
     */
    static hasDuplicatedBy<TItem>(array: TItem[], key: keyof TItem): boolean;
    /**
     * Удаляет элементы из массива по ключу и значению (или массиву значений)
     * @param array Исходный массив объектов
     * @param key Ключ, по которому производится поиск
     * @param value Значение или массив значений для удаления
     * @returns Новый массив без удаленных элементов
     */
    static toRemoveBy<TItem extends object>(array: TItem[], key: keyof TItem, value: TItem[keyof TItem] | TItem[keyof TItem][]): TItem[];
    /**
     * Удаляет элементы из массива по ключу и значению (или массиву значений), мутируя исходный массив
     * @param array Исходный массив объектов (будет мутирован)
     * @param key Ключ, по которому производится поиск
     * @param value Значение или массив значений для удаления
     * @returns Количество удаленных элементов
     */
    static removeBy<TItem extends object>(array: TItem[], key: keyof TItem, value: TItem[keyof TItem] | TItem[keyof TItem][]): number;
    /**
     * Вставка данных в указанный массив, мутируя исходный массив
     * @param array Исходный массив (будет мутирован)
     * @param index Индекс вставки
     * @param direction Направление вставки
     * @param value Значение или массив значений для вставки
     */
    static insert<TItem = unknown>(array: TItem[], index: number, direction: 'lower' | 'end' | 'upper', value: TItem | TItem[]): void;
    /**
     * Вставка данных в указанный массив
     * @param array Исходный массив (будет мутирован)
     * @param index Индекс вставки
     * @param direction Направление вставки
     * @param value Значение или массив значений для вставки
     * @returns Новый массив с данными
     */
    static toInsert<TItem = unknown>(array: TItem[], index: number, direction: 'lower' | 'end' | 'upper', value: TItem | TItem[]): TItem[];
    /**
     * Возвращает срез массива, соответствующий указанной странице.
     *
     * @template TItem - Тип элементов массива
     * @param {TItem[]} array - Исходный массив
     * @param {number} pageNumber - Номер страницы (отсчет от нуля)
     * @param {number} pageSize - Размер страницы (количество элементов на странице). По умолчанию 10
     * @returns {TItem[]} Массив элементов для указанной страницы
     *
     * @example
     * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
     *
     * // Получить первую страницу (элементы 0-9)
     * const page1 = ArrayHelper.slicePage(array, 0, 10);
     * // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
     *
     * // Получить вторую страницу (элементы 10-11)
     * const page2 = ArrayHelper.slicePage(array, 1, 10);
     * // [11, 12]
     *
     * // Получить третью страницу (пустой массив, так как элементов нет)
     * const page3 = ArrayHelper.slicePage(array, 2, 10);
     * // []
     *
     * // Работа с пользователями из примера Persons
     * const page1Users = ArrayHelper.slicePage(Persons, 0, 10);
     * const page2Users = ArrayHelper.slicePage(Persons, 1, 10);
     * const page3Users = ArrayHelper.slicePage(Persons, 2, 10);
     * const page4Users = ArrayHelper.slicePage(Persons, 3, 10);
     * const page5Users = ArrayHelper.slicePage(Persons, 4, 10); // Последняя страница с 6 элементами
     */
    static slicePage<TItem>(array: TItem[], pageNumber: number, pageSize?: number): TItem[];
    /**
     * Меняет местами элементы массива по указанным индексам.
     * @template TItem - Тип элементов массива.
     * @param {TItem[]} array - Массив, в котором нужно поменять элементы местами.
     * @param {number} oldIndex - Индекс элемента, который нужно переместить.
     * @param {number} newIndex - Индекс элемента, с которым нужно поменять местами.
     */
    static swapItem<TItem>(array: TItem[], oldIndex: number, newIndex: number): void;
    /**
     * Перемещает элемент массива из одной позиции в другую.
     * Если новый индекс выходит за пределы массива, массив расширяется пустыми элементами (`undefined`).
     * @template TItem - Тип элементов массива.
     * @param {TItem[]} array - Массив, в котором нужно переместить элемент.
     * @param {number} oldIndex - Индекс элемента, который нужно переместить.
     * @param {number} newIndex - Новый индекс, куда нужно переместить элемент.
     */
    static moveItem<TItem>(array: TItem[], oldIndex: number, newIndex: number): void;
}
//# sourceMappingURL=ArrayHelper.d.ts.map