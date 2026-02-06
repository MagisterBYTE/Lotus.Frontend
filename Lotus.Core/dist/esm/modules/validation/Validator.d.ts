import { ValidationResult } from './ValidationResult';
/**
 * Интерфейс для определения валидатора объекта
 */
export interface IValidator {
    /**
     * Поле содержащие результат всей валидации
     */
    validationStatus: ValidationResult;
    /**
     * Валидация всего объекта. Возвращает true если объект валиден
     * @param obj Объект для валидации
     */
    validate(obj: unknown): boolean;
    /**
     * Сброс статус валидации объекта
     */
    reset(): void;
}
/**
 * Базовый класс для реализации валидатора объекта
 */
export declare abstract class BaseValidator implements IValidator {
    /**
     * Поле содержащие результат всей валидации
     */
    validationStatus: ValidationResult;
    constructor();
    abstract validate(obj: unknown): boolean;
    reset(): void;
}
//# sourceMappingURL=Validator.d.ts.map