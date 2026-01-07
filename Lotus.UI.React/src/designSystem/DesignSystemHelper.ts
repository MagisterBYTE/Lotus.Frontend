import { DesignSystemConstants } from './DesignSystemConstants';
import { IDesignSystemData } from './types/DesignSystemData';

/**
 * Вспомогательный класс для работы с дизайн-системой
 */
export abstract class DesignSystemHelper
{
  // #region Load/Save
  /**
   * Загрузка данных дизайн-системы из локального хранилища
   * @returns Данные дизайн-системы
   */
  public loadFromStorage(): IDesignSystemData
  {
    const value = localStorage.getItem(DesignSystemConstants.SaveKey);
    if (value)
    {
      return JSON.parse(value);
    }
    else
    {
      return { colorScheme: 'light', primaryColor: 'blue' };
    }
  }

  /**
   * Сохранение данных дизайн-системы в локальное хранилище
   * @param data Данные дизайн-системы
   */
  public saveToStorage(data: IDesignSystemData)
  {
    localStorage.setItem(DesignSystemConstants.SaveKey, JSON.stringify(data));
  }
  // #endregion
}