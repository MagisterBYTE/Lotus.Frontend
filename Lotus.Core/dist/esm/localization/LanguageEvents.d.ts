import { TLanguageType } from './LanguageType';
/**
 * Тип события для изменения языка
 */
export declare const LanguageChangeEventType: "LanguageChangeEventType";
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
export declare const createLanguageChangeEvent: (lang: TLanguageType) => Event;
//# sourceMappingURL=LanguageEvents.d.ts.map