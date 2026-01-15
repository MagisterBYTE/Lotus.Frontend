import { FunctionHelper } from '#helpers';

/**
 * Интерфейс для обновления прокси объекта
 */
export interface IRefreshProxy
{
  onRefreshProxy: () => void;
}

/**
 * Базовый класс реализующий обновления прокси объекта
 */
export class RefreshProxy implements IRefreshProxy
{
  public onRefreshProxy: () => void;

  constructor()
  {
    this.onRefreshProxy = () => {};
    FunctionHelper.bindAllMethods(this);
  }
}