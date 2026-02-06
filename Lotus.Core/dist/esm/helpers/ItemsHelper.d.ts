import { IOption } from '#modules/option';
import { TKey } from '#types';
/**
 * Класс-помощник для работы с коллекциями объектов
 */
export declare abstract class ItemsHelper {
    private static isObject;
    /**
     * Получить идентификатор объекта через ключ id
     * @param item Объект
     * @returns Значение ключа id
     */
    static getValueById<TItem extends {
        id: TKey;
    }>(item: TItem): TKey;
    /**
     * Получить идентификатор объекта через ключ value
     * @param item Объект
     * @returns Значение ключа value
     */
    static getValueByValue<TItem extends {
        value: TKey;
    }>(item: TItem): TKey;
    /**
     * Получить идентификатор объекта через ключ id или value
     * @param item Объект
     * @returns Значение ключа
     */
    static getValueOfItem<TItem>(item: TItem): TKey;
    /**
     * Получить название объекта через ключ label или name
     * @param item Объект
     * @returns Название объекта
     */
    static getLabelOfItem<TItem>(item: TItem): string;
    /**
     * Получить иконку объекта через ключ icon
     * @param item Объект
     * @returns Иконка объекта
     */
    static getIconOfItem<TItem>(item: TItem): any;
    /**
     * Получить статус недоступности объекта через ключ disabled или isDisabled
     * @param item Объект
     * @returns Статус недоступности объекта или undefined
     */
    static getDisabledOfItem<TItem>(item: TItem): boolean | undefined;
    /**
     * Получение элемента из значения элемента или первого элемента
     * @param items Массив всех элементов
     * @param selectedValue Выбранное значение
     * @returns Элемент
     */
    static getItemByValueOrFirst<TItem>(items: TItem[], selectedValue?: TKey): TItem;
    /**
     * Получение элемента из значения элемента или undefined
     * @param items Массив всех элементов
     * @param selectedValue Выбранное значение
     * @returns Элемент или undefined
     */
    static getItemByValueOrUndefined<TItem>(items: TItem[], selectedValue?: TKey): TItem | undefined;
    /**
     * Получение текста из значения элемента
     * @param items Массив всех элементов
     * @param selectedValue Выбранное значение
     * @returns Текст выбранного значения
     */
    static getLabelByValue<TItem>(items: TItem[], selectedValue?: TKey): string;
    /**
     * Получение иконки из значения элемента
     * @param items Массив всех элементов
     * @param selectedValue Выбранное значение
     * @returns Иконка выбранного значения
     */
    static getIconByValue<TItem>(items: TItem[], selectedValue?: TKey): any;
    /**
     * Получение массива элементов из выбранных значений
     * @param items Массив всех элементов
     * @param selectedValues Выбранные значения
     * @returns Массив элементов
     */
    static getItemsByValues<TItem>(items: TItem[], selectedValues?: TKey | TKey[]): TItem[];
    /**
     * Получение массива текста из выбранных значений
     * @param items Массив всех элементов
     * @param selectedValues Выбранные значения
     * @returns Массив текста выбранных значений
     */
    static getLabelsByValues<TItem>(items: TItem[], selectedValues?: TKey[]): string[];
    /**
     * Конвертировать массив элементов в массив опций с типом текст
     * @param items Массив всех элементов
     * @returns Массив опций с типом текст
     */
    static convertToOptionsText<TItem>(items: TItem[]): IOption<string>[];
}
//# sourceMappingURL=ItemsHelper.d.ts.map