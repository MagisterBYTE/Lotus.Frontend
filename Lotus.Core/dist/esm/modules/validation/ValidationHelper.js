import { LocalizationCore } from '#localization';
import { ValidationResultSuccess } from './ValidationResult';
export class ValidationHelper {
    static PatternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    static isValidEmail(email) {
        return ValidationHelper.PatternEmail.test(email);
    }
    static validationEmail(email) {
        if (ValidationHelper.PatternEmail.test(email)) {
            return ValidationResultSuccess;
        }
        return { error: false, text: LocalizationCore.data.validation.invalidEmail };
    }
}
//# sourceMappingURL=ValidationHelper.js.map