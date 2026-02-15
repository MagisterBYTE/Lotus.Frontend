/**
 * Массив доступных акцентов фона
 */
export const TBackgroundAccentValues = ['accent', 'glass'] as const;

/**
 * Тип акцента фона
 */
export type TBackgroundAccent = (typeof TBackgroundAccentValues)[number];

/**
 * Enum типа акцента фона
 */
export const TBackgroundAccents = {
  Accent: TBackgroundAccentValues[0],
  Glass: TBackgroundAccentValues[1],

  getAllValues(): typeof TBackgroundAccentValues
  {
    return TBackgroundAccentValues;
  },

  isBackgroundAccent(value: unknown): value is TBackgroundAccent
  {
    if (typeof value === 'string')
    {
      return TBackgroundAccentValues.includes(value as TBackgroundAccent);
    }
    return false;
  },

  getByIndex(index: number): TBackgroundAccent | undefined
  {
    return TBackgroundAccentValues[index];
  },

  getByName(name: string): TBackgroundAccent | undefined
  {
    return TBackgroundAccentValues.find((v) => v === name);
  }
} as const;
