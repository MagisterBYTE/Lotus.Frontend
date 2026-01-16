import { IGrouping } from '#types';
export declare abstract class ArrayHelper {
    /**
     * Получить числовой массив в указанном диапазоне
     * @param from Начальное значение
     * @param to Конечное значение
     * @returns Числовой массив
     */
    static createNumberArrayFromTo(from: number, to: number): number[];
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
    static checkInArrayAny<TItem>(array: TItem[], checked: TItem[]): boolean;
    /**
     * Группировка массива по указанному ключу key
     * @param array Исходный массив
     * @param key Ключ по которому будет произведена группировка
     * @returns Массив групп
     */
    static groupByKey<TItem extends object, TKey extends keyof TItem>(array: TItem[], key: TKey): IGrouping<TItem>[];
    /**
     * Получает массив уникальный по ключу key
     * @param array Массив
     * @param key Ключ уникальности
     * @returns Массив уникальный по ключу key
     */
    static getUniqueByKey<TItem extends object, TKey extends keyof TItem>(array: TItem[], key: TKey): TItem[];
    /**
     * Проверка массива на наличие дубликатов
     *
     * @param array Массив
     * @param key Ключ по которому идет проверка
     * @returns Статус проверки
     */
    static hasDuplicatedByKey<TItem>(array: TItem[], key: keyof TItem): boolean;
    /**
     * Удаляет элементы из массива по ключу и значению (или массиву значений)
     * @param array Исходный массив объектов
     * @param key Ключ, по которому производится поиск
     * @param value Значение или массив значений для удаления
     * @returns Новый массив без удаленных элементов
     */
    static removeByKey<TItem extends object>(array: TItem[], key: keyof TItem, value: TItem[keyof TItem] | TItem[keyof TItem][]): TItem[];
    /**
     * Удаляет элементы из массива по ключу и значению (или массиву значений), мутируя исходный массив
     * @param array Исходный массив объектов (будет мутирован)
     * @param key Ключ, по которому производится поиск
     * @param value Значение или массив значений для удаления
     * @returns Количество удаленных элементов
     */
    static removeByKeyInPlace<TItem extends object>(array: TItem[], key: keyof TItem, value: TItem[keyof TItem] | TItem[keyof TItem][]): number;
    /**
     * Вставка данных в указанный массив
     * @param array Исходный массив (будет мутирован)
     * @param index Индекс вставки
     * @param direction Направление вставки
     * @param value Значение или массив значений для вставки
     */
    static insertArrayInPlace<TItem = unknown>(array: TItem[], index: number, direction: 'Lower' | 'End' | 'Upper', value: TItem | TItem[]): void;
}
//# sourceMappingURL=ArrayHelper.d.ts.map