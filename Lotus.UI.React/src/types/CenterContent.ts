/**
 * Массив доступных значений центрирования контента
 */
export const TCenterContentValues = ['horizontally', 'vertically', 'center'] as const;

/**
 * Тип центрирования контента
 */
export type TCenterContent = (typeof TCenterContentValues)[number];

/**
 * Enum типа центрирования контента
 */
export const TCenterContents = {
  Horizontally: TCenterContentValues[0],
  Vertically: TCenterContentValues[1],
  Center: TCenterContentValues[2],

  getAllValues(): typeof TCenterContentValues 
  {
    return TCenterContentValues;
  },

  isCenterContent(value: unknown): value is TCenterContent 
  {
    if (typeof value === 'string')
    {
      return TCenterContentValues.includes(value as TCenterContent);
    }
    return false;
  },

  getByIndex(index: number): TCenterContent | undefined 
  {
    return TCenterContentValues[index];
  },
  
  getByName(name: string): TCenterContent | undefined 
  {
    return TCenterContentValues.find((v) => v === name);
  }
} as const;
