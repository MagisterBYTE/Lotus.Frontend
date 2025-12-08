export class ValidationHelper {
    static PatternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    static PatternPhone = /^[\\+]?[0-9\s\-\\(\\)]+$/;
    static isValidEmail(email) {
        return ValidationHelper.PatternEmail.test(email);
    }
    static isValidPhone(phone) {
        return ValidationHelper.PatternPhone.test(phone);
    }
}
//# sourceMappingURL=ValidationHelper.js.map