/**
 * Массив доступных ориентаций
 */
export const TOrientationValues = ['horizontal', 'vertical'] as const;

/**
 * Ориентация
 */
export type TOrientation = (typeof TOrientationValues)[number];

/**
 * Enum типа ориентации
 */
export const TOrientations = {
  Horizontal: TOrientationValues[0],
  Vertical: TOrientationValues[1],

  getAllValues(): typeof TOrientationValues 
  {
    return TOrientationValues;
  },

  isOrientation(value: unknown): value is TOrientation 
  {
    if (typeof value === 'string')
    {
      return TOrientationValues.includes(value as TOrientation);
    } 
    return false;
  },

  getByIndex(index: number): TOrientation | undefined 
  {
    return TOrientationValues[index];
  },
  
  getByName(name: string): TOrientation | undefined 
  {
    return TOrientationValues.find((v) => v === name);
  }
} as const;
