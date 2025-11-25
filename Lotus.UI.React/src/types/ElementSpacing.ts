/**
 * Пространство между элементами
 */
export type TElementSpacing = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const TElementSpacings: readonly TElementSpacing[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export const instanceOfElementSpacing = (value: unknown): value is TElementSpacing =>
{
  if (value && typeof value === 'string')
  {
    return TElementSpacings.includes(value as TElementSpacing);
  }

  return false;
};

export const castToElementSpacing = (value: unknown): TElementSpacing | undefined =>
{
  if (instanceOfElementSpacing(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
};