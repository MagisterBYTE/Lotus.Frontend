/**
 * Интерфейс для определения персональных данных пользователя
 */
export interface IPersonInfo
{
  /**
   * Имя
   */
  name?: string;

  /**
   * Фамилия
   */
  surname?: string;

  /**
   * Отчество
   */
  patronymic?: string;

  /**
   * Дата рождения
   * DateOnly в TypeScript обычно представляют как string в формате YYYY-MM-DD
   */
  birthday?: string;
}
