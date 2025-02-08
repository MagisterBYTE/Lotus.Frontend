import { LocalizationCore } from './LocalizationCore';
import { LocalizationCoreDataEn } from './LocalizationCoreDataEn';
import { LocalizationCoreDataRu } from './LocalizationCoreDataRu';
export class LocalizationDispatcher {
    // #region Static properties
    static _currentLanguage;
    /**
     * Получить текущую язык
     */
    static get currentLanguage() {
        if (LocalizationDispatcher._currentLanguage)
            return LocalizationDispatcher._currentLanguage;
        return 'ru-RU';
    }
    /**
     * Установить текущий язык
     */
    static set currentLanguage(language) {
        LocalizationDispatcher._currentLanguage = language;
        if (language == 'en-US')
            LocalizationCore.data = LocalizationCoreDataEn;
        if (language == 'ru-RU')
            LocalizationCore.data = LocalizationCoreDataRu;
    }
}
;
