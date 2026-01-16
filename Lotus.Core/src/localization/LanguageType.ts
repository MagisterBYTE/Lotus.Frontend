import { IOption } from '#modules/option';

/**
 * Массив значений типов языков
 */
export const TLanguageTypeValues = ['ru-RU', 'en-US', 'de-DE', 'ja-JP', 'zh-CN'] as const;

/**
 * Тип языка
 */
export type TLanguageType = (typeof TLanguageTypeValues)[number];

/**
 * Набор языков
 */
export const TLanguageTypes = {
  ru_RU: TLanguageTypeValues[0],
  en_US: TLanguageTypeValues[1],
  de_DE: TLanguageTypeValues[2],
  ja_JP: TLanguageTypeValues[3],
  zh_CH: TLanguageTypeValues[4],

  getAllValues(): typeof TLanguageTypeValues
  {
    return TLanguageTypeValues;
  },

  isLanguageType(value: unknown): value is TLanguageType
  {
    return (TLanguageTypeValues as readonly unknown[]).includes(value);
  },

  getByIndex(index: number): TLanguageType | undefined
  {
    return TLanguageTypeValues[index];
  },

  getByName(name: string): TLanguageType | undefined
  {
    return TLanguageTypeValues.find((v) => v === name);
  },

  getOptions(): IOption<TLanguageType>[]
  {
    return TLanguageTypeValues.map((x) => 
    {
      return {
        label: x,
        value: x
      };
    });
  } 
} as const;