import { ValidationResult } from './ValidationResult';

/**
 * Интерфейс для определения валидатора объекта
 */
export interface IValidator
{
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
export abstract class BaseValidator implements IValidator
{
  // #region Fields
  /**
   * Поле содержащие результат всей валидации
   */
  validationStatus: ValidationResult;
  // #endregion

  constructor()
  {
    this.validationStatus = new ValidationResult();
  }

  // #region IValidator
  public abstract validate(obj: unknown): boolean;
  public reset(): void
  {
    this.validationStatus.clear();
  }
  // #endregion
}
