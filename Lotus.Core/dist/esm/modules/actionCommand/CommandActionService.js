/**
 * Сервис для работы с командами
 */
export class CommandActionService {
    // #region Fields
    commands;
    // #endregion
    constructor() {
        this.commands = [];
        this.getCommands = this.getCommands.bind(this);
        this.getCommandsByGroup = this.getCommandsByGroup.bind(this);
        this.getCommandsByGroupAsName = this.getCommandsByGroupAsName.bind(this);
        this.getCommandsByName = this.getCommandsByName.bind(this);
    }
    addCommands(commands) {
        for (const command of commands) {
            this.commands.push(command);
        }
    }
    getCommands() {
        return this.commands;
    }
    getCommandsByGroup(group) {
        return this.commands.filter((x) => x.group === group);
    }
    getCommandsByGroupAsName(group) {
        return this.commands.filter((x) => x.group === group).map(x => x.name);
    }
    getCommandsByName(names) {
        const result = [];
        if (names) {
            names.forEach((x) => {
                const command = this.commands.find(c => c.name === x);
                if (command) {
                    result.push(command);
                }
            });
        }
        return result;
    }
}
//# sourceMappingURL=CommandActionService.js.map