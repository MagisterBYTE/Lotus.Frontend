import { TKey } from '#types';

/**
 * Интерфейс представляющий некую опцию
 */
export interface IOption<TValueOption extends TKey = TKey> 
{
  /**
   * Значение
   */
  value: TValueOption;

  /**
   * Текст
   */
  label: string;

  /**
   * Статус доступности опции
   */
  disabled?: boolean;

  /**
   * Данные иконки
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;

  /**
   * Подсказка для опции
   */
  tooltip?: string;
}