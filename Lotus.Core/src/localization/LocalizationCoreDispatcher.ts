import { TLanguageType } from './LanguageType';
import { LocalizationCore } from './LocalizationCore';
import { LocalizationCoreDataEn } from './LocalizationCoreDataEn';
import { LocalizationCoreDataRu } from './LocalizationCoreDataRu';

export class LocalizationCoreDispatcher
{
  // #region Static properties
  private static _currentLanguage: TLanguageType | undefined;

  /**
   * Получить текущую язык
   */
  public static get currentLanguage(): TLanguageType
  {
    if (LocalizationCoreDispatcher._currentLanguage) return LocalizationCoreDispatcher._currentLanguage;
    return 'ru-RU';
  }

  /**
   * Установить текущий язык
   */
  public static set currentLanguage(language: TLanguageType)
  {
    LocalizationCoreDispatcher._currentLanguage = language;
    if (language == 'en-US') LocalizationCore.data = LocalizationCoreDataEn;
    if (language == 'ru-RU') LocalizationCore.data = LocalizationCoreDataRu;
  }
  // #endregion
};