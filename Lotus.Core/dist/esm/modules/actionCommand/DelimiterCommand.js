import { BaseActionCommand } from './ActionCommand';
import { TActionCommandTypes } from './ActionCommandType';
/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export class DelimiterCommand extends BaseActionCommand {
    // #region Instance
    static _delimiterCommand;
    static get Instance() {
        return this._delimiterCommand || (this._delimiterCommand = new this('Delimiter'));
    }
    // #endregion
    // #region Constructors
    constructor(name) {
        super(TActionCommandTypes.Delimiter, name);
    }
}
//# sourceMappingURL=DelimiterCommand.js.map