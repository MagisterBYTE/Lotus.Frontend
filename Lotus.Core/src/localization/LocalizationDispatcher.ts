import { TLanguageType } from './LanguageType';
import { LocalizationCore } from './LocalizationCore';
import { LocalizationCoreDataEn } from './LocalizationCoreDataEn';
import { LocalizationCoreDataRu } from './LocalizationCoreDataRu';

export class LocalizationDispatcher
{
  // #region Static properties
  private static _currentLanguage: TLanguageType|undefined;

  /**
   * Получить текущую язык
   */
  public static get currentLanguage(): TLanguageType
  {
    if (LocalizationDispatcher._currentLanguage) return LocalizationDispatcher._currentLanguage;
    return 'ru-RU';
  }

  /**
   * Установить текущий язык
   */
  public static set currentLanguage(language: TLanguageType)
  {
    LocalizationDispatcher._currentLanguage = language;
    if(language == 'en-US') LocalizationCore.data = LocalizationCoreDataEn;
    if(language == 'ru-RU') LocalizationCore.data = LocalizationCoreDataRu;
  }
  // #endregion
};