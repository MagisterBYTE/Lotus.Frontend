import { ArrayHelper } from '#helpers';
import { Assert } from '#utils';
export class OptionHelper {
    /**
     * Проверка объекта на поддержку интерфейса IOption
     * @param value Проверяемый объект
     * @returns true, если объект поддерживает интерфейс, false в противном случае
     */
    static instanceOfOption(value) {
        if (value && typeof value === "object") {
            return ('value' in value && 'label' in value);
        }
        return false;
    }
    /**
     * Проверка проверка массива на поддержку любого его объекта интерфейса IOption
     * @param value Проверяемый массив
     * @returns true, если хотя бы один объект массива поддерживает интерфейс, false в противном случае
     */
    static instanceOfOptions(value) {
        if (value && Array.isArray(value)) {
            for (const v of value) {
                if (OptionHelper.instanceOfOption(v)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Преобразование объекта к интерфейсу IOption
     * @param value Объект для преобразования
     * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
     */
    static castToOption(value) {
        if (OptionHelper.instanceOfOption(value)) {
            return value;
        }
        else {
            // eslint-disable-next-line consistent-return
            return undefined;
        }
    }
    /**
     * Преобразование массива к массиву объектов интерфейса IOption
     * @param value Объект для преобразования
     * @returns Mассив объектов интерфейса IOption или undefined если объект не поддерживает интерфейс
     */
    static castToOptions(value) {
        if (OptionHelper.instanceOfOptions(value)) {
            return value;
        }
        else {
            // eslint-disable-next-line consistent-return
            return undefined;
        }
    }
    /**
     * Преобразование значение в значение корректного типа
     * @param options Список опций
     * @param value Значение
     * @returns Значение корректного типа
     */
    static convertValue(options, value) {
        if (typeof options[0].value == 'string') {
            if (typeof value == 'string')
                return value;
            if (typeof value == 'number')
                return value.toString();
        }
        if (typeof options[0].value == 'number') {
            if (typeof value == 'string')
                return Number(value);
            if (typeof value == 'number')
                return value;
        }
        return value;
    }
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToNumber(options) {
        const result = options.map((x) => {
            const value = { label: x.label, value: Number(x.value) };
            return value;
        });
        return result;
    }
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToString(options) {
        const result = options.map((x) => {
            const value = { label: x.label, value: String(x.value) };
            return value;
        });
        return result;
    }
    /**
     * Получение корректного значения по умолчанию или первого значения из списка опций
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns Значение по умолчанию или первого значения из списка опций
     */
    static getValueOrFirst(options, initialSelectedValue) {
        if (Assert.existValue(initialSelectedValue)) {
            return initialSelectedValue;
        }
        return options[0].value;
    }
    /**
     * Получение корректного текста по умолчанию или первого значения текста из списка опций
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns Корректный текст по умолчанию или первое значения текста из списка опций
     */
    static getLabelOrFirst(options, initialSelectedValue) {
        if (Assert.existValue(initialSelectedValue)) {
            let text = '';
            options.forEach((element) => {
                if (element.value === initialSelectedValue) {
                    text = element.label;
                }
            });
            return text;
        }
        return options[0].label;
    }
    /**
     * Получение корректной иконки по умолчанию или первой иконки из списка опций
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns Корректная иконка по умолчанию или первая иконка из списка опций
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getIconOrFirst(options, initialSelectedValue) {
        if (Assert.existValue(initialSelectedValue)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let icon = undefined;
            options.forEach((element) => {
                if (element.value === initialSelectedValue) {
                    icon = element.icon;
                }
            });
            return icon;
        }
        return options[0].icon;
    }
    /**
     * Получение корректного списка текста по умолчанию или пустой список
     * @param options Список опций
     * @param initialSelectedValues Список начальных значение
     * @returns Массив текста выбранных значений или пустой список
     */
    static getLabelsOrEmpty(options, initialSelectedValues) {
        if (initialSelectedValues && initialSelectedValues.length > 0) {
            const texts = [];
            options.forEach((element) => {
                if (initialSelectedValues.find((x) => x === element.value)) {
                    texts.push(element.label);
                }
            });
            return texts;
        }
        else {
            return [];
        }
    }
    /**
     * Получение опций из значения опций или первой опции
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Опция
     */
    static getOptionByValueOrFirst(options, selectedValue) {
        if (Assert.existValue(selectedValue)) {
            for (const option of options) {
                if (option.value === selectedValue) {
                    return option;
                }
            }
        }
        return options[0];
    }
    /**
     * Получение опций из значения опций или undefined
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Опция или undefined
     */
    static getOptionByValueOrUndefined(options, selectedValue) {
        if (Assert.existValue(selectedValue)) {
            for (const element of options) {
                if (element.value === selectedValue) {
                    return element;
                }
            }
        }
        // eslint-disable-next-line consistent-return
        return undefined;
    }
    /**
     * Получение текста из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Текст выбранного значения
     */
    static getLabelByValue(options, selectedValue) {
        let text = '';
        if (Assert.existValue(selectedValue)) {
            options.forEach((element) => {
                if (element.value === selectedValue) {
                    text = element.label;
                }
            });
        }
        return text;
    }
    /**
     * Получение иконки из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Иконка выбранного значения
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getIconByValue(options, selectedValue) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let icon = undefined;
        if (Assert.existValue(selectedValue)) {
            options.forEach((element) => {
                if (element.value === selectedValue) {
                    icon = element.icon;
                }
            });
        }
        return icon;
    }
    /**
     * Получение массива опций из выбранных значений опций
     * @param options Массив всех опций
     * @param selectedValues Выбранные значения
     * @returns Массив опций
     */
    static getOptionsByValues(options, selectedValues) {
        if (selectedValues) {
            if (Array.isArray(selectedValues)) {
                if (selectedValues.length > 0) {
                    const optionsSelected = [];
                    options.forEach((element) => {
                        if (selectedValues.find((x) => x === element.value)) {
                            optionsSelected.push(element);
                        }
                    });
                    return optionsSelected;
                }
            }
            else {
                for (const element of options) {
                    if (element.value === selectedValues) {
                        return [element];
                    }
                }
            }
        }
        return [];
    }
    /**
     * Получение массива текста из выбранных значений опций
     * @param options Массив всех опций
     * @param selectedValues Выбранные значения
     * @returns Массив текста выбранных значений
     */
    static getLabelsByValues(options, selectedValues) {
        if (selectedValues && selectedValues.length > 0) {
            const texts = [];
            options.forEach((element) => {
                if (selectedValues.find((x) => x === element.value)) {
                    texts.push(element.label);
                }
            });
            return texts;
        }
        else {
            return [];
        }
    }
    /**
     * Получение массива текста из неопределённого значения(свойства объекта)
     * @param options Массив всех опций
     * @param item Неопределённое значение
     * @returns Массив текста выбранных значений
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getLabelsByUnknownValues(options, item) {
        if (Array.isArray(item)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const massive = item;
            if (ArrayHelper.checkIsNumbers(massive)) {
                const numbers = massive.map((x) => {
                    const value = Number(x);
                    return value;
                });
                const result = OptionHelper.getLabelsByValues(options, numbers);
                return result;
            }
            else {
                const texts = massive.map((x) => {
                    const value = String(x);
                    return value;
                });
                const result = OptionHelper.getLabelsByValues(options, texts);
                return result;
            }
        }
        return [];
    }
    /**
     * Проверка на наличие опции
     * @param options Массив всех опций
     * @param value Выбранное значение
     * @returns Статус наличия опции
     */
    static hasOption(options, value) {
        if (Assert.existValue(value)) {
            return options.find((x) => x.value == value) !== undefined;
        }
        return false;
    }
    /**
     * Проверка на наличие иконки
     * @param options Массив всех опций
     * @param context Контекст вызова
     * @returns Статус наличия иконки
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static hasIcons(options, context) {
        for (const option of options) {
            if (option.icon) {
                if (typeof option.icon == 'function') {
                    if (option.icon(option, context))
                        return true;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    }
}
//# sourceMappingURL=OptionHelper.js.map