/**
 * Класс-помощник для работы с коллекциями объектов
 */
export class ItemsHelper {
    /**
     * Получить идентификатор объекта через ключ id
     * @param item Объект
     * @returns Значение ключа id
     */
    static getValueById(item) {
        return item.id;
    }
    /**
     * Получить идентификатор объекта через ключ value
     * @param item Объект
     * @returns Значение ключа value
     */
    static getValueByValue(item) {
        return item.value;
    }
    /**
     * Получить идентификатор объекта через ключ id или value
     * @param item Объект
     * @returns Значение ключа
     */
    static getValueOfItem(item) {
        if (typeof item === 'object' && item) {
            if ('id' in item) {
                return item.id;
            }
            else if ('value' in item) {
                return item.value;
            }
        }
        return item;
    }
    /**
     * Получить название объекта через ключ label или name
     * @param item Объект
     * @returns Значение ключа
     */
    static getLabelOfItem(item) {
        if (!item)
            return '';
        if (typeof item === 'object' && item) {
            if ('label' in item) {
                return item.label;
            }
            else if ('name' in item) {
                return item.name;
            }
        }
        return item;
    }
    /**
     * Получить статус недоступности объекта через ключ disabled или isDisabled
     * @param item Объект
     * @returns Статус недоступности объекта или undefined
     */
    static getDisabledOfItem(item) {
        if (typeof item === 'object' && item) {
            if ('disabled' in item) {
                return item.disabled;
            }
            else if ('isDisabled' in item) {
                return item.isDisabled;
            }
        }
        return undefined;
    }
}
//# sourceMappingURL=ItemsHelper.js.map