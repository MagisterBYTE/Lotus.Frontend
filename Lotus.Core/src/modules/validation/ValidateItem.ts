import { IValidationItem } from './ValidationItem';

/**
 * Интерфейс для определения валидации отдельного элемента
 */
export interface IValidateItem<TValue = unknown>
{
  /**
   * Валидации отдельного элемента/значения
   * @param value Значение
   * @param context Контекст вызова
   * @returns Объект валидации отдельного элемента/значения
   */
  // oxlint-disable-next-line typescript/no-explicit-any
  validateItem(value: TValue, context?: any):IValidationItem;
}
