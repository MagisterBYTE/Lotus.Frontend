import { IValidationItem } from './ValidationItem';
import { TValidationLevel } from './ValidationLevel';
/**
 * Интерфейс для определения статуса валидации
 */
export interface IValidationResult {
    items: Record<string, IValidationItem[]>;
}
/**
 * Класс для управления результатами валидации.
 * Предоставляет методы для добавления, проверки и управления ошибками, предупреждениями и информационными сообщениями.
 */
export declare class ValidationResult implements IValidationResult {
    static readonly Success: ValidationResult;
    /**
     * Создает ValidationResult из объекта с ошибками
     * @param errors Объект с ошибками, где ключ - имя поля, значение - массив текстов ошибок
     * @returns Новый объект ValidationResult
     */
    static createFromErrors(errors: Record<string, string[]>): ValidationResult;
    /**
     * Создает пустой (успешный) ValidationResult
     * @returns Новый пустой объект ValidationResult
     */
    static createSuccess(): ValidationResult;
    /**
     * Создает ValidationResult с одной ошибкой
     * @param key Ключ ошибки
     * @param message Текст ошибки
     * @returns Новый объект ValidationResult с одной ошибкой
     */
    static createSingleError(key: string, message: string): ValidationResult;
    /**
     * Коллекция элементов валидации, сгруппированных по ключам
     */
    items: Record<string, IValidationItem[]>;
    /**
     * Создает новый экземпляр ValidationResult
     */
    constructor();
    /**
     * Очищает все результаты валидации
     */
    clear(): void;
    /**
     * Проверяет, есть ли ошибки в результатах валидации
     * @returns true если есть хотя бы одна ошибка
     */
    hasErrors(): boolean;
    /**
     * Проверяет, есть ли предупреждения в результатах валидации
     * @returns true если есть хотя бы одно предупреждение
     */
    hasWarnings(): boolean;
    /**
     * Проверяет, прошла ли валидация успешно
     * @returns true если ошибок нет
     */
    isValid(): boolean;
    /**
     * Добавляет элемент валидации
     * @param key Ключ для группировки элементов
     * @param item Элемент валидации для добавления
     */
    addValidationItem(key: string, item: IValidationItem): void;
    /**
     * Добавляет пользовательскую проверку
     * @param key Ключ для группировки
     * @param isValid Результат проверки (true - валидно, false - невалидно)
     * @param errorText Текст сообщения
     * @param level Уровень валидации (по умолчанию 'error')
     */
    addErrorCustom(key: string, isValid: boolean, errorText: string, level?: TValidationLevel): void;
    /**
     * Добавляет предупреждение
     * @param key Ключ для группировки
     * @param warningText Текст предупреждения
     */
    addWarning(key: string, warningText: string): void;
    /**
     * Добавляет информационное сообщение
     * @param key Ключ для группировки
     * @param infoText Текст информации
     */
    addInfo(key: string, infoText: string): void;
    /**
     * Получает первую ошибку для указанного ключа
     * @param key Ключ для поиска ошибок
     * @returns Текст первой ошибки или undefined если ошибок нет
     */
    getErrorByKey(key: string): string | undefined;
    /**
     * Получает все ошибки для указанного ключа
     * @param key Ключ для поиска ошибок
     * @returns Массив элементов валидации с ошибками
     */
    getErrorsByKey(key: string): IValidationItem[];
    /**
     * Получает текст первой ошибки для указанного ключа
     * @param key Ключ для поиска ошибок
     * @returns Текст первой ошибки или undefined
     */
    getFirstErrorText(key: string): string | undefined;
    /**
     * Получает все тексты ошибок для указанного ключа
     * @param key Ключ для поиска ошибок
     * @returns Массив текстов ошибок
     */
    getAllErrorTexts(key: string): string[];
    /**
     * Получает все ошибки из всех ключей
     * @returns Объект с ошибками, сгруппированными по ключам
     */
    getAllErrors(): Record<string, IValidationItem[]>;
    /**
     * Получает все предупреждения для указанного ключа
     * @param key Ключ для поиска предупреждений
     * @returns Массив элементов валидации с предупреждениями
     */
    getWarningsByKey(key: string): IValidationItem[];
    /**
     * Получает все информационные сообщения для указанного ключа
     * @param key Ключ для поиска информационных сообщений
     * @returns Массив элементов валидации с информационными сообщениями
     */
    getInfosByKey(key: string): IValidationItem[];
    /**
     * Проверяет обязательность заполнения поля
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param errorText Текст ошибки (опционально)
     */
    addErrorRequired(key: string, value: unknown, errorText?: string): void;
    /**
     * Проверяет максимальную длину строки
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param maxLength Максимальная длина
     * @param errorText Текст ошибки (опционально)
     */
    addErrorMaxString(key: string, value: string, maxLength: number, errorText?: string): void;
    /**
     * Проверяет минимальную длину строки
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param minLength Минимальная длина
     * @param errorText Текст ошибки (опционально)
     */
    addErrorMinString(key: string, value: string, minLength: number, errorText?: string): void;
    /**
     * Проверяет значение на вхождение в диапазон
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param minLength Минимальная длина строки
     * @param maxLength Максимальная длина строки
     * @param errorText Текст ошибки (опционально)
     */
    addErrorRangeString(key: string, value: string, minLength: number, maxLength: number, errorText?: string): void;
    /**
     * Проверяет максимальное значение числа
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param max Максимальное число
     * @param errorText Текст ошибки (опционально)
     */
    addErrorMaxNumber(key: string, value: number, max: number, errorText?: string): void;
    /**
     * Проверяет минимальное значение числа
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param min Минимальное число
     * @param errorText Текст ошибки (опционально)
     */
    addErrorMinNumber(key: string, value: number, min: number, errorText?: string): void;
    /**
     * Проверяет значение на вхождение в диапазон
     * @param key Ключ поля
     * @param value Числовое значение для проверки
     * @param min Минимальное значение
     * @param max Максимальное значение
     * @param errorText Текст ошибки (опционально)
     */
    addErrorRangeNumber(key: string, value: number, min: number, max: number, errorText?: string): void;
    /**
     * Проверяет соответствие регулярному выражению
     * @param key Ключ поля
     * @param value Значение для проверки
     * @param pattern Регулярное выражение
     * @param errorText Текст ошибки (опционально)
     */
    addErrorPattern(key: string, value: string, pattern: RegExp, errorText?: string): void;
    /**
     * Проверяет формат email
     * @param key Ключ поля
     * @param email Email для проверки
     * @param errorText Текст ошибки (опционально)
     */
    addErrorEmail(key: string, email: string, errorText?: string): void;
    /**
     * Проверяет формат телефонного номера
     * @param key Ключ поля
     * @param phone Телефонный номер для проверки
     * @param errorText Текст ошибки (опционально)
     */
    addErrorPhone(key: string, phone: string, errorText?: string): void;
    /**
     * Проверяет формат URL
     * @param key Ключ поля
     * @param url URL для проверки
     * @param errorText Текст ошибки (опционально)
     */
    addErrorUrl(key: string, url: string, errorText?: string): void;
    /**
     * Добавляет ошибки из объекта с правилами валидации
     * @param data Объект с данными для валидации
     * @param rules Объект с правилами валидации для каждого поля
     */
    addErrorsFromObject(data: Record<string, any>, rules: Record<string, (value: any) => IValidationItem | null>): void;
    /**
     * Объединяет результаты валидации с другим объектом ValidationResult
     * @param other Другой объект ValidationResult для объединения
     */
    merge(other: ValidationResult): void;
    /**
     * Проверяет объект по заданным правилам валидации
     * @param obj Объект для валидации
     * @param validators Объект с валидаторами для каждого свойства
     * @returns true если объект валиден
     */
    validateObject<T extends object>(obj: T, validators: {
        [K in keyof T]?: Array<(value: T[K]) => IValidationItem | null>;
    }): boolean;
    /**
     * Проверяет, есть ли ошибки для указанного ключа
     * @param key Ключ для проверки
     * @returns true если есть ошибки для указанного ключа
     */
    hasErrorsForKey(key: string): boolean;
    /**
     * Проверяет, есть ли предупреждения для указанного ключа
     * @param key Ключ для проверки
     * @returns true если есть предупреждения для указанного ключа
     */
    hasWarningsForKey(key: string): boolean;
    /**
     * Возвращает количество ошибок во всех ключах
     * @returns Общее количество ошибок
     */
    getErrorCount(): number;
    /**
     * Возвращает количество предупреждений во всех ключах
     * @returns Общее количество предупреждений
     */
    getWarningCount(): number;
    /**
     * Создает копию текущего объекта ValidationResult
     * @returns Новый объект ValidationResult с теми же данными
     */
    clone(): ValidationResult;
    /**
     * Выполняет валидацию и выбрасывает исключение если есть ошибки
     * @param key Ключ для проверки (опционально, если не указан - проверяются все ключи)
     * @throws Error если есть ошибки валидации
     */
    validateOrThrow(key?: string): void;
}
//# sourceMappingURL=ValidationResult.d.ts.map