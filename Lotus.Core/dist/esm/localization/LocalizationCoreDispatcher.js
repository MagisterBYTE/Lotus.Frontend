import { LocalizationCore } from './LocalizationCore';
import { LocalizationCoreDataEn } from './LocalizationCoreDataEn';
import { LocalizationCoreDataRu } from './LocalizationCoreDataRu';
export class LocalizationCoreDispatcher {
    // #region Static properties
    static _currentLanguage;
    /**
     * Получить текущую язык
     */
    static get currentLanguage() {
        if (LocalizationCoreDispatcher._currentLanguage)
            return LocalizationCoreDispatcher._currentLanguage;
        return 'ru-RU';
    }
    /**
     * Установить текущий язык
     */
    static set currentLanguage(language) {
        LocalizationCoreDispatcher._currentLanguage = language;
        if (language == 'en-US')
            LocalizationCore.data = LocalizationCoreDataEn;
        if (language == 'ru-RU')
            LocalizationCore.data = LocalizationCoreDataRu;
    }
}
;
//# sourceMappingURL=LocalizationCoreDispatcher.js.map