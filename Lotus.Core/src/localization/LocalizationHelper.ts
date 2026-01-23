import { TLanguageType, TLanguageTypes } from './LanguageType';

/**
 * Вспомогательный класс для работы с подсистемой локализации
 */
export abstract class LocalizationHelper
{
  // #region Const
  /**
   * Названия атрибута в документа под которым сохраняется выбранный язык
   */
  public static readonly DataAttributeLang: string = 'data-lotus-lang';

  /**
   * Регулярное выражение для поиска ключа где сохранён текущий язык
   */
  public static readonly LangRegexDefault = /(?:^|[\s_-])lotus(?:$|[\s_-]).*(?:^|[\s_-])lang(?:$|[\s_-])/i;
  // #endregion

  // #region Document
  /**
   * Устанавливает язык интерфейса для всей страницы
   * @param lang Код языка
   */
  public static setDocumentLang(lang: TLanguageType): void
  {
    document.documentElement.setAttribute(LocalizationHelper.DataAttributeLang, lang);
  }

  /**
   * Читает текущий язык интерфейса страницы
   * @returns Строка с кодом языка или пустая строка, если атрибут не задан
   */
  public static getDocumentLang(): TLanguageType
  {
    const lang = document.documentElement.getAttribute(LocalizationHelper.DataAttributeLang);
    if (lang)
    {
      return TLanguageTypes.getByName(lang) ?? TLanguageTypes.ru_RU;
    }

    return TLanguageTypes.ru_RU;
  }
  // #endregion

  // #region Load/Save
  /**
   * Загрузка данных подсистемы локализации из локального хранилища
   * @param key Ключ
   * @returns Данные подсистемы локализации
   */
  public static loadFromStorage(key?: string): TLanguageType | undefined
  {
    if (key)
    {
      const value = localStorage.getItem(key);
      if (value)
      {
        return TLanguageTypes.getByName(value);
      }
    }
    return undefined;
  }

  /**
   * Сохранение данных подсистемы локализации в локальное хранилище
   * @param key Ключ
   * @param data Данные подсистемы локализации
   */
  public static saveToStorage(key: string | undefined, data: TLanguageType)
  {
    if (key)
    {
      localStorage.setItem(key, data);
    }
  }
  // #endregion
}
