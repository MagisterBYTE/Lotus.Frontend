import { LocalizationCore } from '#localization';
import { IValidationResult, ValidationResultSuccess } from './ValidationResult';

export abstract class ValidationHelper
{
  public static readonly PatternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  public static isValidEmail(email: string): boolean 
  {
    return ValidationHelper.PatternEmail.test(email);
  }

  public static validationEmail(email: string): IValidationResult 
  {
    if(ValidationHelper.PatternEmail.test(email))
    {
      return ValidationResultSuccess;
    }

    return { error: false, text: LocalizationCore.data.validation.invalidEmail }
  }
}