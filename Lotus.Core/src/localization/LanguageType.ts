import { IOption } from '#modules/option';

/**
 * Перечисление базовых языков
 */
export type TLanguageType = 'ru-RU'| 'en-US' | 'de-DE' | 'ja-JP' | 'zh-CN';

/**
 * Массив базовых языков
 */
export const TLanguageTypes: readonly TLanguageType[] = ['ru-RU', 'en-US'];

/**
 * Набор базовых языков в виде опций
 */
export const LanguageTypeOptions:IOption<TLanguageType>[] = TLanguageTypes.map((x) => 
{
  return {
    label: x,
    value: x
  };
});