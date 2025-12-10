import { FunctionHelper } from '#helpers';
import { TLanguageType } from './LanguageType';
import { LocalizationCore } from './LocalizationCore';
import { LocalizationCoreDataEn } from './LocalizationCoreDataEn';
import { LocalizationCoreDataRu } from './LocalizationCoreDataRu';
import { ILocalizationDispatcher } from './LocalizationDispatcher';

/**
 * Диспетчер локализации модуля Core
 */
export class LocalizationCoreDispatcherClass implements ILocalizationDispatcher
{
  // #region Static fields
  private static _localizationCore: LocalizationCoreDispatcherClass;

  public static get Instance(): LocalizationCoreDispatcherClass
  {
    return this._localizationCore || (this._localizationCore = new this());
  }
  // #endregion

  private _currentLanguage: TLanguageType | undefined;

  // #region Properties
  /**
   * Получить текущую язык
   */
  public get currentLanguage(): TLanguageType
  {
    if (this._currentLanguage) return this._currentLanguage;
    return 'ru-RU';
  }

  /**
   * Установить текущий язык
   */
  public set currentLanguage(language: TLanguageType)
  {
    this._currentLanguage = language;
    if (language == 'en-US') LocalizationCore.data = LocalizationCoreDataEn;
    if (language == 'ru-RU') LocalizationCore.data = LocalizationCoreDataRu;
  }
  // #endregion

  // #region Constructor
  constructor()
  {
    FunctionHelper.bindAllMethods(this);
  }
  // #endregion

  // #region Main methods
  /**
   * Установить текущий язык
   * @param language Язык
   */
  public setLanguage(language: TLanguageType | undefined)
  {
    if (language)
    {
      this._currentLanguage = language;
      if (language == 'en-US') LocalizationCore.data = LocalizationCoreDataEn;
      if (language == 'ru-RU') LocalizationCore.data = LocalizationCoreDataRu;
    }
  }
  // #endregion
}

/**
 * Глобальный доступ к диспетчеру локализации модуля Core
 */
export const LocalizationCoreDispatcher = LocalizationCoreDispatcherClass.Instance;
