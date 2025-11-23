import { TLanguageType } from './LanguageType';
/**
 * Интерфейс диспетчера локализации который управляет текущем языком модуля
 */
export interface ILocalizationDispatcher {
    /**
     * Получить текущую язык
     */
    get currentLanguage(): TLanguageType;
    /**
     * Установить текущий язык
     */
    set currentLanguage(language: TLanguageType);
    /**
     * Установить текущий язык
     * @param language Язык
     */
    setLanguage(language: TLanguageType | undefined): void;
}
//# sourceMappingURL=LocalizationDispatcher.d.ts.map