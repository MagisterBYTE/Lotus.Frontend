/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalizationCore } from '#localization';
import { Assert } from '#utils';
import { ValidationHelper } from './ValidationHelper';
/**
 * Класс для управления результатами валидации.
 * Предоставляет методы для добавления, проверки и управления ошибками, предупреждениями и информационными сообщениями.
 */
export class ValidationResult {
    // #region Const
    static Success = new ValidationResult();
    // #endregion
    // #region Static methods
    /**
     * Создает ValidationResult из объекта с ошибками
     * @param errors Объект с ошибками, где ключ - имя поля, значение - массив текстов ошибок
     * @returns Новый объект ValidationResult
     */
    static createFromErrors(errors) {
        const result = new ValidationResult();
        for (const key in errors) {
            result.items[key] = errors[key].map(text => ({
                text,
                level: 'error',
                error: true
            }));
        }
        return result;
    }
    /**
     * Создает пустой (успешный) ValidationResult
     * @returns Новый пустой объект ValidationResult
     */
    static createSuccess() {
        return new ValidationResult();
    }
    /**
     * Создает ValidationResult с одной ошибкой
     * @param key Ключ ошибки
     * @param message Текст ошибки
     * @returns Новый объект ValidationResult с одной ошибкой
     */
    static createSingleError(key, message) {
        const result = new ValidationResult();
        result.addErrorCustom(key, false, message);
        return result;
    }
    // #endregion
    // #region Fields
    /**
     * Коллекция элементов валидации, сгруппированных по ключам
     */
    items;
    // #endregion
    // #region Constructor
    /**
     * Создает новый экземпляр ValidationResult
     */
    constructor() {
        this.items = {};
    }
    // #endregion
    // #region Basic methods
    /**
     * Очищает все результаты валидации
     */
    clear() {
        this.items = {};
    }
    /**
     * Возвращает текст первой ошибки, если она есть
     * @returns текст первой ошибки, если она есть, иначе undefined
     */
    errorText() {
        for (const key in this.items) {
            if (this.items[key].some(x => x.error)) {
                return this.items[key][0].text;
            }
        }
        return undefined;
    }
    /**
     * Проверяет, есть ли ошибки в результатах валидации
     * @returns true если есть хотя бы одна ошибка
     */
    hasErrors() {
        for (const key in this.items) {
            if (this.items[key].some(x => x.error)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Проверяет, есть ли предупреждения в результатах валидации
     * @returns true если есть хотя бы одно предупреждение
     */
    hasWarnings() {
        for (const key in this.items) {
            if (this.items[key].some(x => x.level === 'warning')) {
                return true;
            }
        }
        return false;
    }
    /**
     * Проверяет, прошла ли валидация успешно
     * @returns true если ошибок нет
     */
    isValid() {
        return !this.hasErrors();
    }
    // #endregion
    // #region Item management
    /**
     * Добавляет элемент валидации
     * @param key Ключ для группировки элементов
     * @param item Элемент валидации для добавления
     */
    addValidationItem(key, item) {
        const items = this.items[key] ?? [];
        items.push(item);
        this.items[key] = items;
    }
    /**
     * Добавляет пользовательскую проверку
     * @param key Ключ для группировки
     * @param isValid Результат проверки (true - валидно, false - невалидно)
     * @param errorText Текст сообщения
     * @param level Уровень валидации (по умолчанию 'error')
     */
    addErrorCustom(key, isValid, errorText, level = 'error') {
        if (!isValid) {
            this.addValidationItem(key, {
                text: errorText,
                level,
                error: level === 'error'
            });
        }
    }
    /**
     * Добавляет предупреждение
     * @param key Ключ для группировки
     * @param warningText Текст предупреждения
     */
    addWarning(key, warningText) {
        this.addValidationItem(key, {
            text: warningText,
            level: 'warning',
            error: false
        });
    }
    /**
     * Добавляет информационное сообщение
     * @param key Ключ для группировки
     * @param infoText Текст информации
     */
    addInfo(key, infoText) {
        this.addValidationItem(key, {
            text: infoText,
            level: 'info',
            error: false
        });
    }
    // #endregion
    // #region Error retrieval methods
    /**
     * Получает первую ошибку для указанного ключа
     * @param key Ключ для поиска ошибок
     * @returns Текст первой ошибки или undefined если ошибок нет
     */
    getErrorByKey(key) {
        if (this.items[key]) {
            return this.items[key].find(x => x.error)?.text;
        }
    }
    /**
     * Получает все ошибки для указанного ключа
     * @param key Ключ для поиска ошибок
     * @returns Массив элементов валидации с ошибками
     */
    getErrorsByKey(key) {
        return this.items[key]?.filter(x => x.error) ?? [];
    }
    /**
     * Получает текст первой ошибки для указанного ключа
     * @param key Ключ для поиска ошибок
     * @returns Текст первой ошибки или undefined
     */
    getFirstErrorText(key) {
        return this.items[key]?.find(x => x.error)?.text;
    }
    /**
     * Получает все тексты ошибок для указанного ключа
     * @param key Ключ для поиска ошибок
     * @returns Массив текстов ошибок
     */
    getAllErrorTexts(key) {
        return this.items[key]?.filter(x => x.error).map(x => x.text).filter(Boolean) ?? [];
    }
    /**
     * Получает все ошибки из всех ключей
     * @returns Объект с ошибками, сгруппированными по ключам
     */
    getAllErrors() {
        const result = {};
        for (const key in this.items) {
            const errors = this.items[key].filter(x => x.error);
            if (errors.length > 0) {
                result[key] = errors;
            }
        }
        return result;
    }
    /**
     * Получает все предупреждения для указанного ключа
     * @param key Ключ для поиска предупреждений
     * @returns Массив элементов валидации с предупреждениями
     */
    getWarningsByKey(key) {
        return this.items[key]?.filter(x => x.level === 'warning') ?? [];
    }
    /**
     * Получает все информационные сообщения для указанного ключа
     * @param key Ключ для поиска информационных сообщений
     * @returns Массив элементов валидации с информационными сообщениями
     */
    getInfosByKey(key) {
        return this.items[key]?.filter(x => x.level === 'info') ?? [];
    }
    // #endregion
    // #region Specific validation methods
    /**
     * Проверяет обязательность заполнения поля
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param errorText Текст ошибки (опционально)
     */
    addErrorRequired(key, value, errorText) {
        if (Assert.emptyValue(value)) {
            this.addValidationItem(key, {
                text: errorText ?? LocalizationCore.data.validation.required,
                level: 'error',
                error: true
            });
        }
    }
    // #endregion
    // #region Specific validation methods - String
    /**
     * Проверяет максимальную длину строки
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param maxLength Максимальная длина
     * @param errorText Текст ошибки (опционально)
     */
    addErrorMaxString(key, value, maxLength, errorText) {
        if (Assert.existValue(value) && value.length > maxLength) {
            this.addValidationItem(key, {
                text: errorText ?? LocalizationCore.data.validation.maxString(maxLength),
                level: 'error',
                error: true
            });
        }
    }
    /**
     * Проверяет минимальную длину строки
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param minLength Минимальная длина
     * @param errorText Текст ошибки (опционально)
     */
    addErrorMinString(key, value, minLength, errorText) {
        if (Assert.existValue(value) && value.length < minLength) {
            this.addValidationItem(key, {
                text: errorText ?? LocalizationCore.data.validation.minString(minLength),
                level: 'error',
                error: true
            });
        }
    }
    /**
     * Проверяет значение на вхождение в диапазон
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param minLength Минимальная длина строки
     * @param maxLength Максимальная длина строки
     * @param errorText Текст ошибки (опционально)
     */
    // eslint-disable-next-line max-params
    addErrorRangeString(key, value, minLength, maxLength, errorText) {
        if (Assert.existValue(value)) {
            if (value.length < minLength || value.length > maxLength) {
                this.addValidationItem(key, {
                    text: errorText ?? LocalizationCore.data.validation.rangeString(minLength, maxLength),
                    level: 'error',
                    error: true
                });
            }
        }
    }
    // #endregion
    // #region Specific validation methods - Number
    /**
     * Проверяет максимальное значение числа
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param max Максимальное число
     * @param errorText Текст ошибки (опционально)
     */
    addErrorMaxNumber(key, value, max, errorText) {
        if (Assert.existValue(value) && value > max) {
            this.addValidationItem(key, {
                text: errorText ?? LocalizationCore.data.validation.maxNumber(max),
                level: 'error',
                error: true
            });
        }
    }
    /**
     * Проверяет минимальное значение числа
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param min Минимальное число
     * @param errorText Текст ошибки (опционально)
     */
    addErrorMinNumber(key, value, min, errorText) {
        if (Assert.existValue(value) && value < min) {
            this.addValidationItem(key, {
                text: errorText ?? LocalizationCore.data.validation.minNumber(min),
                level: 'error',
                error: true
            });
        }
    }
    /**
     * Проверяет значение на вхождение в диапазон
     * @param key Ключ поля
     * @param value Числовое значение для проверки
     * @param min Минимальное значение
     * @param max Максимальное значение
     * @param errorText Текст ошибки (опционально)
     */
    // eslint-disable-next-line max-params
    addErrorRangeNumber(key, value, min, max, errorText) {
        if (Assert.existValue(value)) {
            if (value < min || value > max) {
                this.addValidationItem(key, {
                    text: errorText ?? LocalizationCore.data.validation.rangeNumber(min, max),
                    level: 'error',
                    error: true
                });
            }
        }
    }
    // #endregion
    // #region Specific validation methods - Format
    /**
     * Проверяет соответствие регулярному выражению
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param pattern Регулярное выражение
     * @param errorText Текст ошибки (опционально)
     */
    addErrorPattern(key, value, pattern, errorText) {
        if (Assert.existValue(value) && !pattern.test(value)) {
            this.addValidationItem(key, {
                text: errorText ?? LocalizationCore.data.validation.invalidFormat,
                level: 'error',
                error: true
            });
        }
    }
    /**
     * Проверяет формат email
     * @param key Ключ поля
     * @param email Email для проверки
     * @param errorText Текст ошибки (опционально)
     */
    addErrorEmail(key, email, errorText) {
        if (ValidationHelper.isValidEmail(email) === false) {
            this.addValidationItem(key, {
                text: errorText ?? LocalizationCore.data.validation.invalidEmail,
                level: 'error',
                error: true
            });
        }
    }
    /**
     * Проверяет формат телефонного номера
     * @param key Ключ поля
     * @param phone Телефонный номер для проверки
     * @param errorText Текст ошибки (опционально)
     */
    addErrorPhone(key, phone, errorText) {
        if (Assert.existValue(phone)) {
            if (ValidationHelper.isValidPhone(phone) === false) {
                this.addValidationItem(key, {
                    text: errorText ?? LocalizationCore.data.validation.invalidPhone,
                    level: 'error',
                    error: true
                });
            }
        }
    }
    /**
     * Проверяет формат URL
     * @param key Ключ поля
     * @param url URL для проверки
     * @param errorText Текст ошибки (опционально)
     */
    addErrorUrl(key, url, errorText) {
        if (Assert.existValue(url)) {
            try {
                new URL(url);
            }
            catch {
                this.addValidationItem(key, {
                    text: errorText ?? LocalizationCore.data.validation.invalidUrl,
                    level: 'error',
                    error: true
                });
            }
        }
    }
    // #endregion
    // #region Bulk validation methods
    /**
     * Добавляет ошибки из объекта с правилами валидации
     * @param data Объект с данными для валидации
     * @param rules Объект с правилами валидации для каждого поля
     */
    addErrorsFromObject(data, rules) {
        for (const key in rules) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const validationResult = rules[key](data[key]);
                if (validationResult) {
                    this.addValidationItem(key, validationResult);
                }
            }
        }
    }
    /**
     * Объединяет результаты валидации с другим объектом ValidationResult
     * @param other Другой объект ValidationResult для объединения
     */
    merge(other) {
        for (const key in other.items) {
            if (other.items[key].length > 0) {
                const existingItems = this.items[key] ?? [];
                this.items[key] = [...existingItems, ...other.items[key]];
            }
        }
    }
    /**
     * Проверяет объект по заданным правилам валидации
     * @param obj Объект для валидации
     * @param validators Объект с валидаторами для каждого свойства
     * @returns true если объект валиден
     */
    validateObject(obj, validators) {
        this.clear();
        for (const key in validators) {
            const value = obj[key];
            const keyValidators = validators[key];
            if (keyValidators) {
                for (const validator of keyValidators) {
                    const result = validator(value);
                    if (result) {
                        this.addValidationItem(key, result);
                    }
                }
            }
        }
        return this.isValid();
    }
    // #endregion
    // #region Utility methods
    /**
     * Проверяет, есть ли ошибки для указанного ключа
     * @param key Ключ для проверки
     * @returns true если есть ошибки для указанного ключа
     */
    hasErrorsForKey(key) {
        return this.items[key]?.some(x => x.error) ?? false;
    }
    /**
     * Проверяет, есть ли предупреждения для указанного ключа
     * @param key Ключ для проверки
     * @returns true если есть предупреждения для указанного ключа
     */
    hasWarningsForKey(key) {
        return this.items[key]?.some(x => x.level === 'warning') ?? false;
    }
    /**
     * Возвращает количество ошибок во всех ключах
     * @returns Общее количество ошибок
     */
    getErrorCount() {
        let count = 0;
        for (const key in this.items) {
            count += this.items[key].filter(x => x.error).length;
        }
        return count;
    }
    /**
     * Возвращает количество предупреждений во всех ключах
     * @returns Общее количество предупреждений
     */
    getWarningCount() {
        let count = 0;
        for (const key in this.items) {
            count += this.items[key].filter(x => x.level === 'warning').length;
        }
        return count;
    }
    /**
     * Создает копию текущего объекта ValidationResult
     * @returns Новый объект ValidationResult с теми же данными
     */
    clone() {
        const clone = new ValidationResult();
        for (const key in this.items) {
            clone.items[key] = [...this.items[key]];
        }
        return clone;
    }
    /**
     * Выполняет валидацию и выбрасывает исключение если есть ошибки
     * @param key Ключ для проверки (опционально, если не указан - проверяются все ключи)
     * @throws Error если есть ошибки валидации
     */
    validateOrThrow(key) {
        if (key) {
            if (this.hasErrorsForKey(key)) {
                const errorText = this.getFirstErrorText(key);
                throw new Error(`Validation failed for ${key}: ${errorText}`);
            }
        }
        else {
            if (this.hasErrors()) {
                throw new Error(`Validation failed with ${this.getErrorCount()} errors`);
            }
        }
    }
}
//# sourceMappingURL=ValidationResult.js.map