import { BaseActionCommand } from './ActionCommand';
import { ActionCommandTypes } from './ActionCommandType';
/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export class DelimiterCommand extends BaseActionCommand {
    // #region Static fields
    static _delimiter;
    static get Instance() {
        return this._delimiter || (this._delimiter = new this(ActionCommandTypes.Delimiter));
    }
    // #endregion
    constructor(name) {
        super(ActionCommandTypes.Delimiter, name);
    }
}
//# sourceMappingURL=DelimiterCommand.js.map