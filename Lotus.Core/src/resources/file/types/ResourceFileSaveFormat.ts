/**
 * Массив форматов хранения файла в базе данных.
 */
export const TResourceFileSaveFormatValues = ['base64', 'raw'] as const;

/**
 * Формат хранения файла в базе данных.
 */
export type TResourceFileSaveFormat = (typeof TResourceFileSaveFormatValues)[number];

/**
 * Enum формата хранения файла в базе данных.
 */
export const TResourceFileSaveFormats = {
  /**
   * Данные файла в формате строки base64.
   */
  Base64: TResourceFileSaveFormatValues[0],

  /**
   * Данные файла в формате байтового массива.
   */
  Raw: TResourceFileSaveFormatValues[1],

  getAllValues(): typeof TResourceFileSaveFormatValues 
  {
    return TResourceFileSaveFormatValues;
  },

  isResourceFileSaveFormat(value: unknown): value is TResourceFileSaveFormat 
  {
    if (typeof value === 'string') 
    {
      return TResourceFileSaveFormatValues.includes(value as TResourceFileSaveFormat);
    }
    return false;
  },

  getByIndex(index: number): TResourceFileSaveFormat | undefined 
  {
    return TResourceFileSaveFormatValues[index];
  },

  getByName(name: string): TResourceFileSaveFormat | undefined 
  {
    return TResourceFileSaveFormatValues.find((v) => v === name);
  }
} as const;