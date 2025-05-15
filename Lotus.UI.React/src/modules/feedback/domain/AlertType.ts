/**
 * Тип простого информирования
 */
export type TAlertType = 'Error' | 'Warning' | 'Info' | 'Success';

/**
 * Перечисление для типа простого информирования
 */
export const AlertTypeDescriptions: Record<TAlertType, { id: number; name: TAlertType }> = 
{
  /**
   * Ошибка
   */
  Error: {
    id: 0,
    name: 'Error'
  },

  /**
   * Предупреждение
   */
  Warning: {
    id: 1,
    name: 'Warning'
  },

  /**
   * Простая информация
   */
  Info: {
    id: 2,
    name: 'Info'
  },

  /**
   * Простая информация со статусом успешно
   */
  Success: {
    id: 3,
    name: 'Success'
  }
} as const;
