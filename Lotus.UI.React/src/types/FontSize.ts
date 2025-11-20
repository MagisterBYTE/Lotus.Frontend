/**
 * Размер шрифта
 */
export type TFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const TFontSizes: readonly TFontSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const instanceOfFontSize = (value: any): value is TFontSize =>
{
  if (value && typeof value === 'string')
  {
    return TFontSizes.includes(value as TFontSize);
  }

  return false;
}

export const castToFontSize = (value: any): TFontSize | undefined =>
{
  if (instanceOfFontSize(value))
  {
    return value as TFontSize;
  }
  else
  {
    return undefined;
  }
}