/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalizationCore } from '#localization';
import { Assert } from '#utils';
import { ValidationHelper } from './ValidationHelper';
import { ValidationResult } from './ValidationResult';
/**
 * Класс-строитель для создания сложных правил валидации.
 * Предоставляет fluent-интерфейс для последовательного добавления правил валидации.
 */
export class ValidationResultBuilder {
    // #region Fields
    validationResult;
    rules = [];
    currentKey;
    // #endregion
    // #region Constructor
    /**
     * Создает новый экземпляр ValidationResultBuilder
     * @param existingResult Существующий результат валидации для расширения (опционально)
     */
    constructor(existingResult) {
        this.validationResult = existingResult?.clone() || new ValidationResult();
    }
    // #endregion
    // #region Core builder methods
    /**
     * Устанавливает ключ для последующих правил валидации
     * @param key Ключ поля
     * @returns Текущий экземпляр строителя
     */
    forKey(key) {
        this.currentKey = key;
        return this;
    }
    /**
     * Сбрасывает текущий ключ
     * @returns Текущий экземпляр строителя
     */
    resetKey() {
        this.currentKey = undefined;
        return this;
    }
    /**
     * Добавляет правило валидации
     * @param rule Правило валидации
     * @returns Текущий экземпляр строителя
     */
    addRule(rule) {
        if (!rule.key && this.currentKey) {
            rule.key = this.currentKey;
        }
        if (rule.key) {
            this.rules.push(rule);
        }
        return this;
    }
    /**
     * Выполняет все накопленные правила валидации
     * @param data Объект с данными для валидации
     * @returns Текущий экземпляр строителя
     */
    validate(data) {
        // Сортируем правила по приоритету
        const sortedRules = [...this.rules].sort((a, b) => (a.priority || 999) - (b.priority || 999));
        for (const rule of sortedRules) {
            // Проверяем условие выполнения, если оно есть
            if (rule.condition && !rule.condition()) {
                continue;
            }
            const value = data[rule.key];
            const validationResult = rule.validator(value);
            if (validationResult) {
                this.validationResult.addErrorCustom(rule.key, false, validationResult.text || '', validationResult.level || 'error');
            }
        }
        // Очищаем правила после выполнения
        this.rules = [];
        return this;
    }
    /**
     * Строит и возвращает результат валидации
     * @returns Объект ValidationResult с результатами валидации
     */
    build() {
        return this.validationResult;
    }
    // #endregion
    // #region Required validators
    /**
     * Добавляет правило проверки обязательного заполнения
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @param priority Приоритет выполнения (опционально)
     * @returns Текущий экземпляр строителя
     */
    required(key, errorText, priority) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for required validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.emptyValue(value)) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.required,
                        level: 'error',
                        error: true
                    };
                }
                return null;
            },
            priority
        });
        return this;
    }
    /**
     * Добавляет условное правило обязательного заполнения
     * @param condition Условие, при котором поле обязательно
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    requiredWhen(condition, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for requiredWhen validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (condition() && Assert.emptyValue(value)) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.required,
                        level: 'error',
                        error: true
                    };
                }
                return null;
            },
            condition
        });
        return this;
    }
    // #endregion
    // #region String validators
    /**
     * Добавляет правило проверки минимальной длины строки
     * @param minLength Минимальная длина
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    minLength(minLength, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for minLength validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && value.length < minLength) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.minString(minLength),
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки максимальной длины строки
     * @param maxLength Максимальная длина
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    maxLength(maxLength, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for maxLength validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && value.length > maxLength) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.maxString(maxLength),
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки длины строки в диапазоне
     * @param minLength Минимальная длина
     * @param maxLength Максимальная длина
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    lengthBetween(minLength, maxLength, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for lengthBetween validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value)) {
                    if (value.length < minLength || value.length > maxLength) {
                        return {
                            text: errorText ?? LocalizationCore.data.validation.rangeString(minLength, maxLength),
                            level: 'error',
                            error: true
                        };
                    }
                }
                return null;
            }
        });
        return this;
    }
    // #endregion
    // #region Format validators
    /**
     * Добавляет правило проверки формата email
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    email(key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for email validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && ValidationHelper.isValidEmail(value) === false) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.invalidEmail,
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки по регулярному выражению
     * @param pattern Регулярное выражение
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    pattern(pattern, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for pattern validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && !pattern.test(value)) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.invalidFormat,
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки формата телефонного номера
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    phone(key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for phone validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && ValidationHelper.isValidEmail(value) === false) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.invalidPhone,
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки формата URL
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    url(key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for url validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value)) {
                    try {
                        new URL(value);
                    }
                    catch {
                        return {
                            text: errorText ?? LocalizationCore.data.validation.invalidUrl,
                            level: 'error',
                            error: true
                        };
                    }
                }
                return null;
            }
        });
        return this;
    }
    // #endregion
    // #region Numeric validators
    /**
     * Добавляет правило проверки минимального значения числа
     * @param min Минимальное значение
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    min(min, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for min validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && value < min) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.minNumber(min),
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки максимального значения числа
     * @param max Максимальное значение
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    max(max, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for max validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && value > max) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.maxNumber(max),
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки числа в диапазоне
     * @param min Минимальное значение
     * @param max Максимальное значение
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    range(min, max, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for range validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && (value < min || value > max)) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.rangeNumber(min, max),
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки положительного числа
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    positive(key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for positive validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && value <= 0) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.positive,
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки отрицательного числа
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    negative(key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for negative validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && value >= 0) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.negative,
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    // #endregion
    // #region Date validators
    /**
     * Добавляет правило проверки минимальной даты
     * @param minDate Минимальная дата
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    minDate(minDate, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for minDate validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value)) {
                    const date = new Date(value);
                    if (date < minDate) {
                        return {
                            text: errorText ?? LocalizationCore.data.validation.minDate(minDate.toLocaleDateString()),
                            level: 'error',
                            error: true
                        };
                    }
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки максимальной даты
     * @param maxDate Максимальная дата
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    maxDate(maxDate, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for maxDate validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value)) {
                    const date = new Date(value);
                    if (date > maxDate) {
                        return {
                            text: errorText ?? LocalizationCore.data.validation.maxDate(maxDate.toLocaleDateString()),
                            level: 'error',
                            error: true
                        };
                    }
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки даты в диапазоне
     * @param minDate Минимальная дата
     * @param maxDate Максимальная дата
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    dateBetween(minDate, maxDate, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for dateBetween validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value)) {
                    const date = new Date(value);
                    if (date < minDate || date > maxDate) {
                        return {
                            text: errorText ?? LocalizationCore.data.validation.rangeDate(minDate.toLocaleDateString(), maxDate.toLocaleDateString()),
                            level: 'error',
                            error: true
                        };
                    }
                }
                return null;
            }
        });
        return this;
    }
    // #endregion
    // #region Custom validators
    /**
     * Добавляет пользовательское правило валидации
     * @param validator Функция-валидатор
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @param level Уровень валидации (опционально)
     * @returns Текущий экземпляр строителя
     */
    custom(validator, key, errorText, level = 'error') {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for custom validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (!validator(value)) {
                    return {
                        text: errorText,
                        level,
                        error: level === 'error'
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет условное правило валидации
     * @param condition Условие выполнения валидации
     * @param validator Функция-валидатор
     * @param key Ключ поля (опционально, если используется forKey)
     * @returns Текущий экземпляр строителя
     */
    when(condition, validator, key) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for when validator');
        }
        this.addRule({
            key: fieldKey,
            validator,
            condition
        });
        return this;
    }
    // #endregion
    // #region Warning and info validators
    /**
     * Добавляет правило проверки с предупреждением
     * @param validator Функция-валидатор, возвращающая текст предупреждения или null
     * @param key Ключ поля (опционально, если используется forKey)
     * @returns Текущий экземпляр строителя
     */
    warning(validator, key) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for warning validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                const warningText = validator(value);
                if (warningText) {
                    return {
                        text: warningText,
                        level: 'warning',
                        error: false
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки с информационным сообщением
     * @param validator Функция-валидатор, возвращающая текст информации или null
     * @param key Ключ поля (опционально, если используется forKey)
     * @returns Текущий экземпляр строителя
     */
    info(validator, key) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for info validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                const infoText = validator(value);
                if (infoText) {
                    return {
                        text: infoText,
                        level: 'info',
                        error: false
                    };
                }
                return null;
            }
        });
        return this;
    }
    // #endregion
    // #region Collection validators
    /**
     * Добавляет правило проверки минимального количества элементов в массиве
     * @param minCount Минимальное количество элементов
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    minCount(minCount, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for minCount validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && value.length < minCount) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.minCount(minCount),
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    /**
     * Добавляет правило проверки максимального количества элементов в массиве
     * @param maxCount Максимальное количество элементов
     * @param key Ключ поля (опционально, если используется forKey)
     * @param errorText Текст ошибки (опционально)
     * @returns Текущий экземпляр строителя
     */
    maxCount(maxCount, key, errorText) {
        const fieldKey = key || this.currentKey;
        if (!fieldKey) {
            throw new Error('Key must be specified for maxCount validator');
        }
        this.addRule({
            key: fieldKey,
            validator: (value) => {
                if (Assert.existValue(value) && value.length > maxCount) {
                    return {
                        text: errorText ?? LocalizationCore.data.validation.maxCount(maxCount),
                        level: 'error',
                        error: true
                    };
                }
                return null;
            }
        });
        return this;
    }
    // #endregion
    // #region Static methods
    /**
     * Создает новый экземпляр ValidationResultBuilder
     * @returns Новый экземпляр строителя
     */
    static create() {
        return new ValidationResultBuilder();
    }
    /**
     * Создает строитель на основе существующего результата валидации
     * @param existingResult Существующий результат валидации
     * @returns Новый экземпляр строителя
     */
    static fromResult(existingResult) {
        return new ValidationResultBuilder(existingResult);
    }
    /**
     * Создает строитель с предопределенным набором правил
     * @param rules Набор правил валидации
     * @returns Новый экземпляр строителя
     */
    static withRules(rules) {
        const builder = new ValidationResultBuilder();
        rules.forEach((rule) => builder.addRule(rule));
        return builder;
    }
}
//# sourceMappingURL=ValidationResultBuilder.js.map