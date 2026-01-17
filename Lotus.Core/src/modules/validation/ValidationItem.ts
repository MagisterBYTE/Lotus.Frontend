import { TValidationLevel } from './ValidationLevel';

/**
 * Интерфейс для определения валидации отдельного элемента/поля/свойства
 */
export interface IValidationItem
{
  /**
   * Уровень валидации;
   */
  level?: TValidationLevel;

  /**
   * Статус наличия ошибки валидации
   */
  error: boolean;

  /**
   * Текст валидации
   */
  text?: string
}