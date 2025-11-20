/**
 * Размер радиуса скругления элемента UI
 */
export type TElementRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const TElementRadiuses: readonly TElementRadius[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const instanceOfElementRadius = (value: any): value is TElementRadius =>
{
  if (value && typeof value === 'string')
  {
    return TElementRadiuses.includes(value as TElementRadius);
  }

  return false;
}

export const castToElementRadius = (value: any): TElementRadius | undefined =>
{
  if (instanceOfElementRadius(value))
  {
    return value as TElementRadius;
  }
  else
  {
    return undefined;
  }
}