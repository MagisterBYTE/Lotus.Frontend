/**
 *  Массив значений типов команд действий
 */
export const TActionCommandTypeValues = ['default', 'navigation', 'delimiter'] as const;

/**
 * Стандартные типы команды действия
 */
export type TActionCommandType = (typeof TActionCommandTypeValues)[number];

/**
 * Объект для представления стандартных типов команды действия
 */
export const TActionCommandTypes = {
  /**
   * Команда по умолчанию
   */
  Default: TActionCommandTypeValues[0],

  /**
   * Команда навигации
   */
  Navigation: TActionCommandTypeValues[1],

  /**
   * Не команда а разделитель
   */
  Delimiter: TActionCommandTypeValues[2],

  getAllValues(): typeof TActionCommandTypeValues
  {
    return TActionCommandTypeValues;
  },

  isActionCommandType(value: unknown): value is TActionCommandType
  {
    if (typeof value === 'string')
    {
      return TActionCommandTypeValues.includes(value as TActionCommandType);
    } 
    return false;
  },

  getByIndex(index: number): TActionCommandType | undefined
  {
    return TActionCommandTypeValues[index];
  },

  getByName(name: string): TActionCommandType | undefined
  {
    return TActionCommandTypeValues.find((v) => v === name);
  }
} as const;
