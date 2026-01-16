import { BaseActionCommand } from './ActionCommand';
import { TActionCommandTypes } from './ActionCommandType';

/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export class DelimiterCommand extends BaseActionCommand
{
  // #region Instance
  private static _delimiterCommand: DelimiterCommand;

  public static get Instance(): DelimiterCommand
  {
    return this._delimiterCommand || (this._delimiterCommand = new this('Delimiter'));
  }
  // #endregion

  // #region Constructors
  constructor(name: string) 
  {
    super(TActionCommandTypes.Delimiter, name);
  }
  // #endregion
}