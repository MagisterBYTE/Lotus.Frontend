import { IValidationItem } from './ValidationItem';
import { TValidationLevel } from './ValidationLevel';
import { ValidationResult } from './ValidationResult';
/**
 * Интерфейс для определения правила валидации
 */
export interface IValidationRule {
    /** Ключ поля */
    key: string;
    /** Функция-валидатор */
    validator: (value: any) => IValidationItem | null;
    /** Условие выполнения валидации (опционально) */
    condition?: () => boolean;
    /** Приоритет выполнения (чем меньше число, тем выше приоритет) */
    priority?: number;
}
/**
 * Класс-строитель для создания сложных правил валидации.
 * Предоставляет fluent-интерфейс для последовательного добавления правил валидации.
 */
export declare class ValidationResultBuilder {
    private validationResult;
    private rules;
    private currentKey?;
    /**
     * Создает новый экземпляр ValidationResultBuilder
     * @param existingResult Существующий результат валидации для расширения (опционально)
     */
    constructor(existingResult?: ValidationResult);
    /**
     * Устанавливает ключ для последующих правил валидации
     * @param key Ключ поля
     * @returns Текущий экземпляр строителя
     */
    forKey(key: string): ValidationResultBuilder;
    /**
     * Сбрасывает текущий ключ
     * @returns Текущий экземпляр строителя
     */
    resetKey(): ValidationResultBuilder;
    /**
     * Добавляет правило валидации
     * @param rule Правило валидации
     * @returns Текущий экземпляр строителя
     */
    addRule(rule: IValidationRule): ValidationResultBuilder;
    /**
     * Выполняет все накопленные правила валидации
     * @param data Объект с данными для валидации
     * @returns Текущий экземпляр строителя
     */
    validate(data: Record<string, any>): ValidationResultBuilder;
    /**
     * Строит и возвращает результат валидации
     * @returns Объект ValidationResult с результатами валидации
     */
    build(): ValidationResult;
    /**
     * Добавляет правило проверки обязательного заполнения
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @param priority Приоритет выполнения (опционально)
     * @returns Текущий экземпляр строителя
     */
    required(key?: string, errorText?: string, priority?: number): ValidationResultBuilder;
    /**
     * Добавляет условное правило обязательного заполнения
     * @param condition Условие, при котором поле обязательно
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    requiredWhen(condition: () => boolean, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки минимальной длины строки
     * @param minLength Минимальная длина
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    minLength(minLength: number, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки максимальной длины строки
     * @param maxLength Максимальная длина
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    maxLength(maxLength: number, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки длины строки в диапазоне
     * @param minLength Минимальная длина
     * @param maxLength Максимальная длина
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    lengthBetween(minLength: number, maxLength: number, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки формата email
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    email(key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки по регулярному выражению
     * @param pattern Регулярное выражение
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    pattern(pattern: RegExp, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки формата телефонного номера
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    phone(key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки формата URL
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    url(key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки минимального значения числа
     * @param min Минимальное значение
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    min(min: number, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки максимального значения числа
     * @param max Максимальное значение
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    max(max: number, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки числа в диапазоне
     * @param min Минимальное значение
     * @param max Максимальное значение
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    range(min: number, max: number, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки положительного числа
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    positive(key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки отрицательного числа
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    negative(key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки минимальной даты
     * @param minDate Минимальная дата
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    minDate(minDate: Date, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки максимальной даты
     * @param maxDate Максимальная дата
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    maxDate(maxDate: Date, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки даты в диапазоне
     * @param minDate Минимальная дата
     * @param maxDate Максимальная дата
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    dateBetween(minDate: Date, maxDate: Date, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет пользовательское правило валидации
     * @param validator Функция-валидатор
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @param level Уровень валидации (опционально)
     * @returns Текущий экземпляр строителя
     */
    custom(validator: (value: any) => boolean, key?: string, errorText?: string, level?: TValidationLevel): ValidationResultBuilder;
    /**
     * Добавляет условное правило валидации
     * @param condition Условие выполнения валидации
     * @param validator Функция-валидатор
     * @param key Ключ поля (опционально, если используется forKey)
     * @returns Текущий экземпляр строителя
     */
    when(condition: () => boolean, validator: (value: any) => IValidationItem | null, key?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки с предупреждением
     * @param validator Функция-валидатор, возвращающая текст предупреждения или null
     * @param key Ключ поля (опционально, если используется forKey)
     * @returns Текущий экземпляр строителя
     */
    warning(validator: (value: any) => string | null, key?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки с информационным сообщением
     * @param validator Функция-валидатор, возвращающая текст информации или null
     * @param key Ключ поля (опционально, если используется forKey)
     * @returns Текущий экземпляр строителя
     */
    info(validator: (value: any) => string | null, key?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки минимального количества элементов в массиве
     * @param minCount Минимальное количество элементов
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    minCount(minCount: number, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Добавляет правило проверки максимального количества элементов в массиве
     * @param maxCount Максимальное количество элементов
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    maxCount(maxCount: number, key?: string, errorText?: string): ValidationResultBuilder;
    /**
     * Создает новый экземпляр ValidationResultBuilder
     * @returns Новый экземпляр строителя
     */
    static create(): ValidationResultBuilder;
    /**
     * Создает строитель на основе существующего результата валидации
     * @param existingResult Существующий результат валидации
     * @returns Новый экземпляр строителя
     */
    static fromResult(existingResult: ValidationResult): ValidationResultBuilder;
    /**
     * Создает строитель с предопределенным набором правил
     * @param rules Набор правил валидации
     * @returns Новый экземпляр строителя
     */
    static withRules(rules: IValidationRule[]): ValidationResultBuilder;
}
//# sourceMappingURL=ValidationResultBuilder.d.ts.map