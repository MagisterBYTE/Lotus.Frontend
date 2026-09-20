import { IValidationResult } from '#modules/validation';

/**
 * Интерфейс для описания редактируемого свойства
 */
export interface IPropertyEditable
{
  /**
   * Статус включенности редактирования
   */
  enabled?: boolean;

  /**
   * Статус обязательного свойства
   */
  required: boolean;

  /**
   * Тип элемента редактирования свойства
   */
  editorType?: 'text' | 'select' | 'multi-select' | 'range' | 'checkbox' | 'date' | 'date-range' | 'autocomplete';

  /**
   * Минимальное значение свойства
   */
  min?: number;

  /**
   * Максимальное значение свойства
   */
  max?: number;

  /**
   * Шаг свойства
   */
  step?: number;

  /**
   * Валидации свойства
   * @param value Значения свойства
   * @returns Статус валидации
   */
  // oxlint-disable-next-line typescript/no-explicit-any
  onValidation?: (value: any, context?: any) => IValidationResult;
}