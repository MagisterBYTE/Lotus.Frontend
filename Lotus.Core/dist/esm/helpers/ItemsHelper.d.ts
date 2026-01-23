import { TKey } from '#types';
/**
 * Класс-помощник для работы с коллекциями объектов
 */
export declare abstract class ItemsHelper {
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
     * @returns Значение ключа
     */
    static getLabelOfItem<TItem>(item: TItem): string;
    /**
     * Получить статус недоступности объекта через ключ disabled или isDisabled
     * @param item Объект
     * @returns Статус недоступности объекта или undefined
     */
    static getDisabledOfItem<TItem>(item: TItem): boolean | undefined;
}
//# sourceMappingURL=ItemsHelper.d.ts.map