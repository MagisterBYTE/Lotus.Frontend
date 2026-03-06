import { FunctionHelper } from '#helpers';
import { INotifyPropertyChanged } from '#types';
import { PropertyChangedFunction } from 'src/types/NotifyPropertyChanged';

/**
 * Базовый класс реализующий уведомление об изменение своих свойств
 */
export class ReactiveObject implements INotifyPropertyChanged
{
  // #region Fields
  protected _handlers: Set<PropertyChangedFunction> = new Set();
  // #endregion

  constructor()
  {
    FunctionHelper.bindAllMethods(this);
  }

  /**
   * Уведомление всех подписчиков об изменение указанного свойства
   * @param propertyName Имя изменившегося свойства
   */
  public notifyPropertyChanged(propertyName?: string):void
  {
    this._handlers.forEach(handler => handler(propertyName, this));
  }

  // #region INotifyPropertyChanged
  /**
   * Метод для добавления наблюдателя за объектом
   * @param handler Функция-обработчик события изменения свойства
   */
  public addPropertyChanged(handler: PropertyChangedFunction)
  {
    this._handlers.add(handler);
  }

  /**
   * Метод для удаления наблюдателя за объектом
   * @param handler Функция-обработчик события изменения свойства
   */
  removePropertyChanged(handler: PropertyChangedFunction)
  {
    this._handlers.add(handler);
  }
  // #endregion
}