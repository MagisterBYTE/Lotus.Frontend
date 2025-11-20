/**
 * Размер элемента UI
 */
export type TElementSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const TElementSizes: readonly TElementSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const instanceOfElementSize = (value: any): value is TElementSize =>
{
  if (value && typeof value === 'string')
  {
    return TElementSizes.includes(value as TElementSize);
  }

  return false;
}

export const castToElementSize = (value: any): TElementSize | undefined =>
{
  if (instanceOfElementSize(value))
  {
    return value as TElementSize;
  }
  else
  {
    return undefined;
  }
}