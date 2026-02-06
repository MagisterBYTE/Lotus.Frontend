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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateItem(value: TValue, context?: any):IValidationItem;
}
