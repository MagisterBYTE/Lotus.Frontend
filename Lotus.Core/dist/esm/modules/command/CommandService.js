/**
 * Сервис для работы с командами
 * @description Все команды которые есть в приложении должны быть добавлены в данный сервис
 */
export class CommandServiceClass {
    static _CommandService;
    static get Instance() {
        return (this._CommandService || (this._CommandService = new this()));
    }
    commands;
    constructor() {
        this.commands = [];
        this.getCommands = this.getCommands.bind(this);
        this.getCommandsByGroup = this.getCommandsByGroup.bind(this);
        this.getCommandsByGroupAsName = this.getCommandsByGroupAsName.bind(this);
        this.getCommandsByName = this.getCommandsByName.bind(this);
    }
    addCommands(commands) {
        commands.forEach(element => {
            this.commands.push(element);
        });
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
/**
 * Глобальный доступ к сервису для работы с командами
 */
export const CommandService = CommandServiceClass.Instance;
