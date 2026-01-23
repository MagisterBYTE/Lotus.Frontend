import { LanguageChangeEvent } from './LanguageEvents';
import { TLanguageType } from './LanguageType';
import { ILocalizationDispatcher } from './LocalizationDispatcher';
/**
 * Диспетчер локализации модуля Core
 */
export declare class LocalizationCoreDispatcherClass implements ILocalizationDispatcher {
    private static _localizationCore;
    static get Instance(): LocalizationCoreDispatcherClass;
    private _currentLanguage;
    /**
     * Получить текущую язык
     */
    get currentLanguage(): TLanguageType;
    /**
     * Установить текущий язык
     */
    set currentLanguage(language: TLanguageType);
    constructor();
    /**
     * Установить текущий язык
     * @param language Язык
     */
    setLanguage(language: TLanguageType | undefined): void;
    onLanguageChangeEvent(event: LanguageChangeEvent | any): void;
}
/**
 * Глобальный доступ к диспетчеру локализации модуля Core
 */
export declare const LocalizationCoreDispatcher: LocalizationCoreDispatcherClass;
//# sourceMappingURL=LocalizationCoreDispatcher.d.ts.map