import { StringHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';

/**
 * Массив значений цветовой схемы
 */
export const TColorSchemeValues = ['light', 'dark'] as const;

/**
 * Цветовая схема
 */
export type TColorScheme = (typeof TColorSchemeValues)[number];

/**
 * Enum цветовой схемы
 */
export const TColorSchemes = {
  Light: TColorSchemeValues[0],
  Dark: TColorSchemeValues[1],

  /**
   * Возвращает массив всех возможных значений
   */
  getAllValues(): typeof TColorSchemeValues 
  {
    return TColorSchemeValues;
  },

  /**
   * Type Guard для проверки принадлежности значения к TColorScheme
   */
  isColorScheme(value: unknown): value is TColorScheme 
  {
    if (typeof value === 'string') 
    {
      return TColorSchemeValues.includes(value as TColorScheme);
    }
    return false;
  },

  /**
   * Возвращает значение по индексу
   */
  getByIndex(index: number): TColorScheme | undefined 
  {
    return TColorSchemeValues[index];
  },

  /**
   * Возвращает значение по строковому имени
   */
  getByName(name: string): TColorScheme | undefined 
  {
    return TColorSchemeValues.find((v) => v === name);
  },

  /**
 * Набор цветовых схем в виде опций
 */
  getAsOptions():IOption<TColorScheme>[]
  {
    return TColorSchemeValues.map((x) => 
    {
      return {
        label: StringHelper.capitalizeFirstLetter(x),
        value: x
      };
    }
    );
  }
} as const;
