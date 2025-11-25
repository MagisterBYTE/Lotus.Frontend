/**
 * Размер шрифта
 */
export type TFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const TFontSizes: readonly TFontSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const instanceOfFontSize = (value: unknown): value is TFontSize =>
{
  if (value && typeof value === 'string')
  {
    return TFontSizes.includes(value as TFontSize);
  }

  return false;
};

export const castToFontSize = (value: unknown): TFontSize | undefined =>
{
  if (instanceOfFontSize(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
};