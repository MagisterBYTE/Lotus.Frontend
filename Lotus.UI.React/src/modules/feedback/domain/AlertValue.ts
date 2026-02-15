import { TAlertType } from './AlertType';

/**
 * Интерфейс для вывода информирования
 */
export interface IAlertValue
{
  /**
   * Тип информирования
   */
  type: TAlertType;

  /**
   * Заголовок сообщения
   */
  title?: string,

  /**
   * Сообщение
   */
  message: string,

  /**
   * Иконка сообщения
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any,
}