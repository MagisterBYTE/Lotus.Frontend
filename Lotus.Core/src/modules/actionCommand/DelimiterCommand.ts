import { BaseActionCommand } from './ActionCommand';
import { ActionCommandTypes } from './ActionCommandType';

/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export class DelimiterCommand extends BaseActionCommand
{
  // #region Static fields
  private static _delimiter: DelimiterCommand;

  public static get Instance(): DelimiterCommand
  {
    return this._delimiter || (this._delimiter = new this(ActionCommandTypes.Delimiter));
  }
  // #endregion

  constructor(name: string) 
  {
    super(ActionCommandTypes.Delimiter, name);
  }
}