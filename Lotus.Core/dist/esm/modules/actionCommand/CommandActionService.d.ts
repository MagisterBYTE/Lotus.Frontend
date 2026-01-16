import { IActionCommand } from './ActionCommand';
/**
 * Интерфейс сервиса для работы с командами
 */
export interface ICommandActionService {
    /**
     * Добавить список команд
     * @param commands Команды
     */
    addCommands(commands: IActionCommand[]): void;
    /**
     * Получить список команд
     */
    getCommands(): IActionCommand[];
    /**
     * Получить список команд определенной группы
     * @param group Имя группы
     */
    getCommandsByGroup(group: string): IActionCommand[];
    /**
     * Получить список команд по имени
     * @param names Список имен команд
     */
    getCommandsByName(names?: string[]): IActionCommand[];
}
/**
 * Сервис для работы с командами
 */
export declare class CommandActionService implements ICommandActionService {
    private _commands;
    get commands(): IActionCommand[];
    constructor();
    addCommands(commands: IActionCommand[]): void;
    getCommands(): IActionCommand[];
    getCommandsByGroup(group: string): IActionCommand[];
    getCommandsByGroupAsName(group: string): string[];
    getCommandsByName(names?: string[]): IActionCommand[];
}
//# sourceMappingURL=CommandActionService.d.ts.map