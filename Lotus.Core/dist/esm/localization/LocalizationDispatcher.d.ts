import { TLanguageType } from './LanguageType';
export declare class LocalizationDispatcher {
    private static _currentLanguage;
    /**
     * Получить текущую язык
     */
    static get currentLanguage(): TLanguageType;
    /**
     * Установить текущий язык
     */
    static set currentLanguage(language: TLanguageType);
}
