import { TLanguageType } from './LanguageType';

/**
 * Тип события для изменения языка
 */
export const LanguageChangeEventType: string = 'LanguageChangeEventType' as const;

/**
 * Данные события для изменения языка
 */
export interface ILanguageChangeEventData {
  lang: TLanguageType;
}

/**
 * Событие для изменения языка
 */
export type LanguageChangeEvent = CustomEvent<ILanguageChangeEventData>;

export const createLanguageChangeEvent = (lang: TLanguageType): Event => 
{
  const data: ILanguageChangeEventData = { lang };
  const event = new CustomEvent<ILanguageChangeEventData>(LanguageChangeEventType, { detail: data });
  return event;
};