/**
 * Класс-помощник для работы с коллекциями объектов
 */
export class ItemsHelper {
    static isObject(item) {
        return item !== null && item !== undefined && typeof item === 'object';
    }
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
        if (ItemsHelper.isObject(item)) {
            return (item.id4 ?? item.value ?? item);
        }
        return item;
    }
    /**
     * Получить название объекта через ключ label или name
     * @param item Объект
     * @returns Название объекта
     */
    static getLabelOfItem(item) {
        if (ItemsHelper.isObject(item)) {
            return String(item.label ?? item.name ?? item);
        }
        return String(item);
    }
    /**
     * Получить иконку объекта через ключ icon
     * @param item Объект
     * @returns Иконка объекта
     */
    static getIconOfItem(item) {
        return ItemsHelper.isObject(item) ? item.icon : undefined;
    }
    /**
     * Получить статус недоступности объекта через ключ disabled или isDisabled
     * @param item Объект
     * @returns Статус недоступности объекта или undefined
     */
    static getDisabledOfItem(item) {
        if (ItemsHelper.isObject(item)) {
            return (item.disabled ?? item.isDisabled);
        }
        return undefined;
    }
    /**
     * Получение элемента из значения элемента или первого элемента
     * @param items Массив всех элементов
     * @param selectedValue Выбранное значение
     * @returns Элемент
     */
    static getItemByValueOrFirst(items, selectedValue) {
        if (selectedValue != null && selectedValue != undefined) {
            for (const item of items) {
                if (ItemsHelper.getValueOfItem(item) == selectedValue) {
                    return item;
                }
            }
        }
        return items[0];
    }
    /**
     * Получение элемента из значения элемента или undefined
     * @param items Массив всех элементов
     * @param selectedValue Выбранное значение
     * @returns Элемент или undefined
     */
    static getItemByValueOrUndefined(items, selectedValue) {
        if (selectedValue != null && selectedValue != undefined) {
            for (const item of items) {
                if (ItemsHelper.getValueOfItem(item) == selectedValue) {
                    return item;
                }
            }
        }
        return undefined;
    }
    /**
     * Получение текста из значения элемента
     * @param items Массив всех элементов
     * @param selectedValue Выбранное значение
     * @returns Текст выбранного значения
     */
    static getLabelByValue(items, selectedValue) {
        let text = '';
        if (selectedValue != null && selectedValue != undefined) {
            for (const item of items) {
                if (ItemsHelper.getValueOfItem(item) == selectedValue) {
                    text = ItemsHelper.getLabelOfItem(item);
                    break;
                }
            }
        }
        return text;
    }
    /**
     * Получение иконки из значения элемента
     * @param items Массив всех элементов
     * @param selectedValue Выбранное значение
     * @returns Иконка выбранного значения
     */
    static getIconByValue(items, selectedValue) {
        let icon = undefined;
        if (selectedValue != null && selectedValue != undefined) {
            for (const item of items) {
                if (ItemsHelper.getValueOfItem(item) == selectedValue) {
                    icon = ItemsHelper.getIconOfItem(item);
                    break;
                }
            }
        }
        return icon;
    }
    /**
     * Получение массива элементов из выбранных значений
     * @param items Массив всех элементов
     * @param selectedValues Выбранные значения
     * @returns Массив элементов
     */
    static getItemsByValues(items, selectedValues) {
        if (selectedValues) {
            if (Array.isArray(selectedValues)) {
                if (selectedValues.length > 0) {
                    const itemsSelected = [];
                    for (const item of items) {
                        // eslint-disable-next-line max-depth
                        if (selectedValues.find((x) => x == ItemsHelper.getValueOfItem(item))) {
                            itemsSelected.push(item);
                        }
                    }
                    return itemsSelected;
                }
            }
            else {
                for (const item of items) {
                    if (ItemsHelper.getValueOfItem(item) == selectedValues) {
                        return [item];
                    }
                }
            }
        }
        return [];
    }
    /**
     * Получение массива текста из выбранных значений
     * @param items Массив всех элементов
     * @param selectedValues Выбранные значения
     * @returns Массив текста выбранных значений
     */
    static getLabelsByValues(items, selectedValues) {
        if (selectedValues && selectedValues.length > 0) {
            const texts = [];
            for (const item of items) {
                if (selectedValues.find((x) => x == ItemsHelper.getValueOfItem(item))) {
                    texts.push(ItemsHelper.getLabelOfItem(item));
                }
            }
            return texts;
        }
        else {
            return [];
        }
    }
    /**
     * Конвертировать массив элементов в массив опций с типом текст
     * @param items Массив всех элементов
     * @returns Массив опций с типом текст
     */
    static convertToOptionsText(items) {
        if (!items || items.length === 0)
            return [];
        const options = [];
        for (const item of items) {
            const option = {
                value: ItemsHelper.getValueOfItem(item).toString(),
                label: ItemsHelper.getLabelOfItem(item)
            };
            options.push(option);
        }
        return options;
    }
}
//# sourceMappingURL=ItemsHelper.js.map