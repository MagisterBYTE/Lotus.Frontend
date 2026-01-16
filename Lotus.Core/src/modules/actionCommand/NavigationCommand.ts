import { IRoute } from '#modules/route';
import { BaseActionCommand } from './ActionCommand';
import { TActionCommandTypes } from './ActionCommandType';

/**
 * Класс команды для простой навигации
 */
export class NavigationCommand extends BaseActionCommand
{
  constructor(name: string, route: IRoute) 
  {
    super(TActionCommandTypes.Navigation, name);
    this.route = route;
  }

  /**
   * Статус выбора
   */
  public override isSelectedCommand(_context?: unknown): boolean
  {
    if (window.location.pathname === this.route?.path)
    {
      return true;
    }

    return false;
  }
}