/**
 * Массив значений типа информирования
 */
export const TAlertTypeValues = ['error', 'warning', 'info', 'success', 'service'] as const;

/**
 * Тип информирования
 */
export type TAlertType = (typeof TAlertTypeValues)[number];

/**
 * Enum типа информирования
 */
export const TAlertTypes = {
  Error: TAlertTypeValues[0],
  Warning: TAlertTypeValues[1],
  Info: TAlertTypeValues[2],
  Success: TAlertTypeValues[3],
  Service: TAlertTypeValues[4],

  /**
   * Возвращает массив всех возможных значений
   */
  getAllValues(): typeof TAlertTypeValues 
  {
    return TAlertTypeValues;
  },

  /**
   * Type Guard для проверки принадлежности значения к TAlertType
   */
  isAlertType(value: unknown): value is TAlertType 
  {
    if (typeof value === 'string') 
    {
      return TAlertTypeValues.includes(value as TAlertType);
    }
    return false;
  },

  /**
   * Возвращает значение по индексу
   */
  getByIndex(index: number): TAlertType | undefined 
  {
    return TAlertTypeValues[index];
  },

  /**
   * Возвращает значение по строковому имени
   */
  getByName(name: string): TAlertType | undefined 
  {
    return TAlertTypeValues.find((v) => v === name);
  }
} as const;

