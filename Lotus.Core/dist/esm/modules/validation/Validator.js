import { ValidationResult } from './ValidationResult';
/**
 * Базовый класс для реализации валидатора объекта
 */
export class BaseValidator {
    // #region Fields
    /**
     * Поле содержащие результат всей валидации
     */
    validationStatus;
    // #endregion
    constructor() {
        this.validationStatus = new ValidationResult();
    }
    reset() {
        this.validationStatus.clear();
    }
}
//# sourceMappingURL=Validator.js.map