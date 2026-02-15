/**
 * Массив доступных акцентов шрифта
 */
export const TFontAccentValues = ['default', 'accent', 'monospace'] as const;

/**
 * Тип акцента шрифта
 */
export type TFontAccent = (typeof TFontAccentValues)[number];

/**
 * Enum типа акцента шрифта
 */
export const TFontAccents = {
  Default: TFontAccentValues[0],
  Accent: TFontAccentValues[1],
  Monospace: TFontAccentValues[2],

  getAllValues(): typeof TFontAccentValues
  {
    return TFontAccentValues;
  },

  isFontAccent(value: unknown): value is TFontAccent
  {
    if (typeof value === 'string')
    {
      return TFontAccentValues.includes(value as TFontAccent);
    }
    return false;
  },

  getByIndex(index: number): TFontAccent | undefined
  {
    return TFontAccentValues[index];
  },

  getByName(name: string): TFontAccent | undefined
  {
    return TFontAccentValues.find((v) => v === name);
  }
} as const;
