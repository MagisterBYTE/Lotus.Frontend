
export abstract class ValidationHelper
{
  public static readonly PatternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  public static readonly PatternPhone = /^[\\+]?[0-9\s\-\\(\\)]+$/;

  public static isValidEmail(email: string): boolean 
  {
    return ValidationHelper.PatternEmail.test(email);
  }

  public static isValidPhone(phone: string): boolean 
  {
    return ValidationHelper.PatternPhone.test(phone);
  }
}