import { LocalizationCore } from './LocalizationCore';
import { LocalizationCoreDataEn } from './LocalizationCoreDataEn';
import { LocalizationCoreDataRu } from './LocalizationCoreDataRu';
/**
 * Диспетчер локализации модуля Core
 */
export class LocalizationCoreDispatcherClass {
    // #region Static fields
    static _localizationCore;
    static get Instance() {
        return this._localizationCore || (this._localizationCore = new this());
    }
    // #endregion
    _currentLanguage;
    /**
     * Получить текущую язык
     */
    get currentLanguage() {
        if (this._currentLanguage)
            return this._currentLanguage;
        return 'ru-RU';
    }
    /**
     * Установить текущий язык
     */
    set currentLanguage(language) {
        this._currentLanguage = language;
        if (language == 'en-US')
            LocalizationCore.data = LocalizationCoreDataEn;
        if (language == 'ru-RU')
            LocalizationCore.data = LocalizationCoreDataRu;
    }
    /**
     * Установить текущий язык
     * @param language Язык
     */
    setLanguage(language) {
        if (language) {
            this._currentLanguage = language;
            if (language == 'en-US')
                LocalizationCore.data = LocalizationCoreDataEn;
            if (language == 'ru-RU')
                LocalizationCore.data = LocalizationCoreDataRu;
        }
    }
}
/**
 * Глобальный доступ к диспетчеру локализации модуля Core
 */
export const LocalizationCoreDispatcher = LocalizationCoreDispatcherClass.Instance;
//# sourceMappingURL=LocalizationCoreDispatcher.js.map