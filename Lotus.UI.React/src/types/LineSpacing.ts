/**
 * Пространство между строк текста (межстроковый интервал)
 */
export type TLineSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const TLineSpacings: readonly TLineSpacing[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const instanceOfLineSpacing = (value: any): value is TLineSpacing =>
{
  if (value && typeof value === 'string')
  {
    return TLineSpacings.includes(value as TLineSpacing);
  }

  return false;
}

export const castToLineSpacing = (value: any): TLineSpacing | undefined =>
{
  if (instanceOfLineSpacing(value))
  {
    return value as TLineSpacing;
  }
  else
  {
    return undefined;
  }
}