/**
 * Массив доступных размеров
 */
export const TSizeTypeValues = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

/**
 * Определение тип размера
 */
export type TSizeType = (typeof TSizeTypeValues)[number];

/**
 * Усеченный тип размера (без xxs и xxl)
 */
export type TTruncatedSizeType = Extract<TSizeType, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

/**
 * Размер
 */
export const TSizeTypes = {
  xxs: TSizeTypeValues[0],
  xs: TSizeTypeValues[1],
  sm: TSizeTypeValues[2],
  md: TSizeTypeValues[3],
  lg: TSizeTypeValues[4],
  xl: TSizeTypeValues[5],
  xxl: TSizeTypeValues[6],

  getAllValues(): typeof TSizeTypeValues 
  {
    return TSizeTypeValues;
  },

  isSizeType(value: unknown): value is TSizeType 
  {
    if (typeof value === 'string')
    {
      return TSizeTypeValues.includes(value as TSizeType);
    } 
    return false;
  },

  getByIndex(index: number): TSizeType | undefined 
  {
    return TSizeTypeValues[index];
  },

  getByName(name: string): TSizeType | undefined 
  {
    return TSizeTypeValues.find((v) => v === name);
  },

  /**
   * Получить следующий размер
   * @param currentSize текущий размер
   * @param step шаг увеличения (по умолчанию 1)
   * @param maxSize максимальный размер (по умолчанию 'xxl')
   * @returns следующий размер или максимальный если достигнут предел
   */
  next(currentSize: TSizeType, step: number = 1, maxSize: TSizeType = 'xxl'): TSizeType 
  {
    const currentIndex = TSizeTypeValues.indexOf(currentSize);
    if (currentIndex === -1) return currentSize;
    
    const maxIndex = TSizeTypeValues.indexOf(maxSize);
    const nextIndex = Math.min(currentIndex + step, maxIndex);
    
    return TSizeTypeValues[nextIndex] || currentSize;
  },
  
  /**
   * Получить предыдущий размер
   * @param currentSize текущий размер
   * @param step шаг уменьшения (по умолчанию 1)
   * @param minSize минимальный размер (по умолчанию 'xxs')
   * @returns предыдущий размер или минимальный если достигнут предел
   */
  prev(currentSize: TSizeType, step: number = 1, minSize: TSizeType = 'xxs'): TSizeType
  {
    const currentIndex = TSizeTypeValues.indexOf(currentSize);
    if (currentIndex === -1) return currentSize;
    
    const minIndex = TSizeTypeValues.indexOf(minSize);
    const prevIndex = Math.max(currentIndex - step, minIndex);
    
    return TSizeTypeValues[prevIndex] || currentSize;
  },

  /**
   * Ограничить размер
   * @param currentSize текущий размер
   * @param minSize минимальный размер (по умолчанию 'xs')
   * @param maxSize максимальный размер (по умолчанию 'xl')
   * @returns Размер ограниченный в пределах
   */
  clamp(currentSize: TSizeType, minSize: TSizeType = 'xs', maxSize: TSizeType = 'xl'): TSizeType
  {
    const currentIndex = TSizeTypeValues.indexOf(currentSize);
    if (currentIndex === -1) return currentSize;
    
    const minIndex = TSizeTypeValues.indexOf(minSize);
    const maxIndex = TSizeTypeValues.indexOf(maxSize);

    let index = currentIndex;
    if (index > maxIndex) index = maxIndex;
    if (index < minIndex) index = minIndex; 
    
    return TSizeTypeValues[index] || currentSize;
  },

  /**
   * Приводит любой TSizeType к ограниченному набору 'xs'-'xl'
   */
  truncated(size: TSizeType): TTruncatedSizeType 
  {
    if (size === 'xxs') return 'xs';
    if (size === 'xxl') return 'xl';
    return size as TTruncatedSizeType;
  }
} as const;
