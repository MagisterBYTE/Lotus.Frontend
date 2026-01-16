/**
 * Сервис для работы с командами
 */
export class CommandActionService {
    // #region Fields
    _commands;
    // #endregion
    // #region Properties
    get commands() {
        return this._commands;
    }
    // #endregion
    // #region Constructors
    constructor() {
        this._commands = [];
        this.getCommands = this.getCommands.bind(this);
        this.getCommandsByGroup = this.getCommandsByGroup.bind(this);
        this.getCommandsByGroupAsName = this.getCommandsByGroupAsName.bind(this);
        this.getCommandsByName = this.getCommandsByName.bind(this);
    }
    // #endregion
    // #region Methods
    addCommands(commands) {
        for (const command of commands) {
            this._commands.push(command);
        }
    }
    getCommands() {
        return this._commands;
    }
    getCommandsByGroup(group) {
        return this._commands.filter((x) => x.group === group);
    }
    getCommandsByGroupAsName(group) {
        return this._commands.filter((x) => x.group === group).map(x => x.name);
    }
    getCommandsByName(names) {
        const result = [];
        if (names) {
            names.forEach((x) => {
                const command = this._commands.find(c => c.name === x);
                if (command) {
                    result.push(command);
                }
            });
        }
        return result;
    }
}
//# sourceMappingURL=CommandActionService.js.map