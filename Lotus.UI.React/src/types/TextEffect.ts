/**
 * Массив возможных значений эффекта для текста
 */
export const TTextEffectValues = ['shadow', 'stroke', 'glow'] as const;

/**
 * Тип эффекта для текста
 */
export type TTextEffect = (typeof TTextEffectValues)[number];

/**
 * Enum типа эффекта для текста
 */
export const TTextEffects = {
  Shadow: TTextEffectValues[0],
  Stroke: TTextEffectValues[1],
  Glow: TTextEffectValues[2],

  getAllValues(): typeof TTextEffectValues 
  {
    return TTextEffectValues;
  },

  isTextEffect(value: unknown): value is TTextEffect 
  {
    if (typeof value === 'string')
    {
      return TTextEffectValues.includes(value as TTextEffect);
    } 
    return false;
  },

  getByIndex(index: number): TTextEffect | undefined 
  {
    return TTextEffectValues[index];
  },

  getByName(name: string): TTextEffect | undefined 
  {
    return TTextEffectValues.find((v) => v === name);
  }
} as const;
