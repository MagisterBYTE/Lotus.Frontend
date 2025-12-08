import { IValidationResult } from './ValidationResult';
/**
 * Интерфейс для определения валидации
 */
export interface IValidation<TValue = any> {
    validation: (value: TValue) => IValidationResult;
}
//# sourceMappingURL=Validation.d.ts.map