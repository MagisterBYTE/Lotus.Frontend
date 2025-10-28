import { IValidationResult } from './ValidationResult';
export declare abstract class ValidationHelper {
    static readonly PatternEmail: RegExp;
    static isValidEmail(email: string): boolean;
    static validationEmail(email: string): IValidationResult;
}
//# sourceMappingURL=ValidationHelper.d.ts.map