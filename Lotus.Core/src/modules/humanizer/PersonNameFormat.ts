/**
 * Массив значений форматов имени
 */
export const TPersonNameFormatValues = ['short', 'full', 'display', 'initials'] as const;

/**
 * Форматы имени
 */
export type TPersonNameFormat = (typeof TPersonNameFormatValues)[number];

/**
 * Объект для представления форматов имени
 */
export const TPersonNameFormats = {
  Short: TPersonNameFormatValues[0],
  Full: TPersonNameFormatValues[1],
  Display: TPersonNameFormatValues[2],
  Initials: TPersonNameFormatValues[3],

  getAllValues(): typeof TPersonNameFormatValues
  {
    return TPersonNameFormatValues;
  },

  isPersonNameFormat(value: unknown): value is TPersonNameFormat
  {
    return TPersonNameFormatValues.includes(value as TPersonNameFormat);
  },

  getByIndex(index: number): TPersonNameFormat | undefined
  {
    return TPersonNameFormatValues[index];
  },

  getByName(name: string): TPersonNameFormat | undefined
  {
    return TPersonNameFormatValues.find((v) => v === name);
  }
} as const;
