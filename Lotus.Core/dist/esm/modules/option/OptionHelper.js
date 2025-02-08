import { ArrayHelper } from '../../helpers';
import { Assert } from '../../utils';
export class OptionHelper {
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
            const value = { text: x.text, value: Number(x.value) };
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
            const value = { text: x.text, value: String(x.value) };
            return value;
        });
        return result;
    }
    /**
     * Получение корректного значения по умолчанию или начального значения
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultValue(options, initialSelectedValue) {
        if (Assert.exist(initialSelectedValue)) {
            return initialSelectedValue;
        }
        return options[0].value;
    }
    /**
     * Получение корректного текста по умолчанию или начального значения текста
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultText(options, initialSelectedValue) {
        if (Assert.exist(initialSelectedValue)) {
            let text = '';
            options.forEach((element) => {
                if (element.value === initialSelectedValue) {
                    text = element.text;
                }
            });
            return text;
        }
        return options[0].text;
    }
    /**
     * Получение корректной иконки по умолчанию или начальной иконки
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getDefaultIcon(options, initialSelectedValue) {
        if (Assert.exist(initialSelectedValue)) {
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
     * Получение корректного текста по умолчанию или начального значения текста
     * @param options Список опций
     * @param initialSelectedValues Начальное значение
     * @returns Массив текста выбранных значений
     */
    static getDefaultTexts(options, initialSelectedValues) {
        if (initialSelectedValues && initialSelectedValues.length > 0) {
            const texts = [];
            options.forEach((element) => {
                if (initialSelectedValues.find((x) => x === element.value)) {
                    texts.push(element.text);
                }
            });
            return texts;
        }
        else {
            return [];
        }
    }
    /**
     * Получение опций из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Опция
     */
    static getOptionByValue(options, selectedValue) {
        if (Assert.exist(selectedValue)) {
            for (const element of options) {
                if (element.value === selectedValue) {
                    return element;
                }
            }
        }
        return options[0];
    }
    /**
     * Получение текста из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Текст выбранного значения
     */
    static getTextByValue(options, selectedValue) {
        let text = '';
        if (Assert.exist(selectedValue)) {
            options.forEach((element) => {
                if (element.value === selectedValue) {
                    text = element.text;
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
        if (Assert.exist(selectedValue)) {
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
    static getTextsByValues(options, selectedValues) {
        if (selectedValues && selectedValues.length > 0) {
            const texts = [];
            options.forEach((element) => {
                if (selectedValues.find((x) => x === element.value)) {
                    texts.push(element.text);
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
    static getTextsByUnknownValues(options, item) {
        if (Array.isArray(item)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const massive = item;
            if (ArrayHelper.checkIsNumbers(massive)) {
                const numbers = massive.map((x) => {
                    const value = Number(x);
                    return value;
                });
                const result = OptionHelper.getTextsByValues(options, numbers);
                return result;
            }
            else {
                const texts = massive.map((x) => {
                    const value = String(x);
                    return value;
                });
                const result = OptionHelper.getTextsByValues(options, texts);
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
        if (Assert.exist(value)) {
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
