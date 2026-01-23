import { TColorToken } from 'lotus-core/modules/color';
import { DesignSystemConstants } from './DesignSystemConstants';
import { TColorScheme } from './types';
import { IDesignSystemData } from './types/DesignSystemData';

/**
 * Вспомогательный класс для работы с дизайн-системой
 */
export abstract class DesignSystemHelper
{
  // #region Document
  /**
   * Установка данных дизайн-системы интерфейса для всей страницы
   * @returns Данные дизайн-системы
   */
  public static setDocumentDesignSystem(data: IDesignSystemData): void
  {
    document.documentElement.setAttribute(DesignSystemConstants.DataAttributeColorScheme, data.colorScheme);
    document.documentElement.setAttribute(DesignSystemConstants.DataAttributePrimaryColor, data.primaryColor);
  }

  /**
   * Читает данные дизайн-системы интерфейса со страницы
   * @returns Данные дизайн-системы или undefined
   */
  public static getDocumentDesignSystem(): IDesignSystemData | undefined
  {
    const colorScheme = document.documentElement.getAttribute(DesignSystemConstants.DataAttributeColorScheme);
    const primaryColor = document.documentElement.getAttribute(DesignSystemConstants.DataAttributePrimaryColor);
    if (colorScheme && primaryColor)
    {
      return { colorScheme: colorScheme as TColorScheme, primaryColor: primaryColor as TColorToken };
    }

    return undefined;
  }
  // #endregion

  // #region Load/Save
  /**
   * Загрузка данных дизайн-системы из локального хранилища
   * @param key Ключ
   * @returns Данные дизайн-системы или undefined
   */
  public static loadFromStorage(key?: string): IDesignSystemData | undefined
  {
    if (key)
    {
      const value = localStorage.getItem(key);
      if (value)
      {
        return JSON.parse(value);
      }
      else
      {
        return undefined;
      }
    }
    return undefined;
  }

  /**
   * Сохранение данных дизайн-системы в локальное хранилище
   * @param key Ключ
   * @param data Данные дизайн-системы
   */
  public static saveToStorage(key: string | undefined, data: IDesignSystemData)
  {
    if (key)
    {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  // #endregion
}
