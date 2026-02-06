import { ValidationResult } from './ValidationResult';
/**
 * Интерфейс для определения валидации целого объекта
 */
export interface IValidateObject {
    /**
     * Поле содержащие результат всей валидации
     */
    validationStatus: ValidationResult;
    /**
     * Метод для валидации всего объекта. Возвращает true если объект валиден
     */
    validate(): boolean;
}
//# sourceMappingURL=ValidateObject.d.ts.map