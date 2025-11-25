/**
 * Пространство между строк текста (межстроковый интервал)
 */
export type TLineSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const TLineSpacings: readonly TLineSpacing[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const instanceOfLineSpacing = (value: unknown): value is TLineSpacing =>
{
  if (value && typeof value === 'string')
  {
    return TLineSpacings.includes(value as TLineSpacing);
  }

  return false;
};

export const castToLineSpacing = (value: unknown): TLineSpacing | undefined =>
{
  if (instanceOfLineSpacing(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
};