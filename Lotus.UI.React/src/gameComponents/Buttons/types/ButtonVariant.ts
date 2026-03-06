/**
 * Массив доступных значений вариантов кнопки
 */
export const TButtonVariantValues = ['default', 'light', 'gray', 'coffee'] as const;

/**
 * Тип варианта кнопки
 */
export type TButtonVariant = (typeof TButtonVariantValues)[number];

/**
 * Варианта кнопки
 */
export const TButtonVariants = {
  Default: TButtonVariantValues[0],
  Light: TButtonVariantValues[1],
  Gray: TButtonVariantValues[2],
  Coffee: TButtonVariantValues[3],

  getAllValues(): typeof TButtonVariantValues
  {
    return TButtonVariantValues;
  },
  isButtonVariant(value: unknown): value is TButtonVariant
  {
    if (typeof value === 'string')
    {
      return TButtonVariantValues.includes(value as TButtonVariant);
    }
    return false;
  },
  getByIndex(index: number): TButtonVariant | undefined
  {
    return TButtonVariantValues[index];
  },
  getByName(name: string): TButtonVariant | undefined
  {
    return TButtonVariantValues.find((v) => v === name);
  }
} as const;