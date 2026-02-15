/**
 * Массив доступных вариантов размещения иконки
 */
export const TIconPlacementValues = ['left', 'right', 'top', 'bottom'] as const;

/**
 * Вариант размещения иконки
 */
export type TIconPlacement = (typeof TIconPlacementValues)[number];

/**
 * Enum варианта размещения иконки
 */
export const TIconPlacements = {
  Left: TIconPlacementValues[0],
  Right: TIconPlacementValues[1],
  Top: TIconPlacementValues[2],
  Bottom: TIconPlacementValues[3],

  getAllValues(): typeof TIconPlacementValues 
  {
    return TIconPlacementValues;
  },

  isIconPlacement(value: unknown): value is TIconPlacement 
  {
    if (typeof value === 'string')
    {
      return TIconPlacementValues.includes(value as TIconPlacement);
    } 
    return false;
  },

  getByIndex(index: number): TIconPlacement | undefined 
  {
    return TIconPlacementValues[index];
  },

  getByName(name: string): TIconPlacement | undefined 
  {
    return TIconPlacementValues.find((v) => v === name);
  }
} as const;
