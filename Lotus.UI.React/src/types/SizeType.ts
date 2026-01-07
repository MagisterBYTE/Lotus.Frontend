/**
 * Определение размера
 */
export type TSizeType = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const TSizeTypes: readonly TSizeType[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export const instanceOfSizeType = (value: unknown): value is TSizeType =>
{
  if (value && typeof value === 'string')
  {
    return TSizeTypes.includes(value as TSizeType);
  }

  return false;
};

export const castToSizeType = (value: unknown): TSizeType | undefined =>
{
  if (instanceOfSizeType(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
};
