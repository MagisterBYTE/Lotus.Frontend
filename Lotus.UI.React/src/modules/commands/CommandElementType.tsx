/**
 * Массив значений компонента для элемента команды
 */
export const TCommandElementTypeValues = ['button', 'icon', 'listItem', 'menuItem'] as const;

/**
 * Компонент отображения для элемента команды
 */
export type TCommandElementType = (typeof TCommandElementTypeValues)[number];

/**
 * Enum компонента отображения для элемента команды
 */
export const TCommandElementTypes = {
  
  Button: TCommandElementTypeValues[0],
  Icon: TCommandElementTypeValues[1],
  ListItem: TCommandElementTypeValues[2],
  MenuItem: TCommandElementTypeValues[3],

  /**
   * Возвращает массив всех возможных значений
   */
  getAllValues(): typeof TCommandElementTypeValues 
  {
    return TCommandElementTypeValues;
  },

  /**
   * Type Guard для проверки принадлежности значения к TCommandElementType
   */
  isCommandElementType(value: unknown): value is TCommandElementType 
  {
    if (typeof value === 'string') 
    {
      return TCommandElementTypeValues.includes(value as TCommandElementType);
    }
    return false;
  },

  /**
   * Возвращает значение по индексу
   */
  getByIndex(index: number): TCommandElementType | undefined 
  {
    return TCommandElementTypeValues[index];
  },

  /**
   * Возвращает значение по строковому имени
   */
  getByName(name: string): TCommandElementType | undefined 
  {
    return TCommandElementTypeValues.find((v) => v === name);
  }
} as const;