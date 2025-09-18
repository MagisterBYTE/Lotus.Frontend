import { TKey } from '#types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionOptionDelegate = (option: IOption, context?: any) => any

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
  isDisabled?: boolean;

  /**
   * Путь к изображению / либо компонент иконки / либо индекс изображения в базе / либо делегат для рисования иконки
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any | FunctionOptionDelegate;

  /**
   *  Делегат для рисования опции
   */
  render?: FunctionOptionDelegate;
}