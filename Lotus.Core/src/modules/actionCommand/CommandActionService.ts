import { IActionCommand } from './ActionCommand';

/**
 * Интерфейс сервиса для работы с командами
 */
export interface ICommandActionService
{
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
export class CommandActionService implements ICommandActionService
{
  // #region Fields
  public commands: IActionCommand[];
  // #endregion

  constructor() 
  {
    this.commands = [];

    this.getCommands = this.getCommands.bind(this);
    this.getCommandsByGroup = this.getCommandsByGroup.bind(this);
    this.getCommandsByGroupAsName = this.getCommandsByGroupAsName.bind(this);
    this.getCommandsByName = this.getCommandsByName.bind(this);
  }

  public addCommands(commands: IActionCommand[])
  {
    for (const command of commands)
    {
      this.commands.push(command);
    }
  }

  public getCommands(): IActionCommand[]
  {
    return this.commands;
  }

  public getCommandsByGroup(group: string): IActionCommand[]
  {
    return this.commands.filter((x) => x.group === group);
  }

  public getCommandsByGroupAsName(group: string): string[]
  {
    return this.commands.filter((x) => x.group === group).map(x => x.name);
  }

  public getCommandsByName(names?: string[]): IActionCommand[]
  {
    const result: IActionCommand[] = [];

    if (names)
    {
      names.forEach((x) =>
      {
        const command = this.commands.find(c => c.name === x);
        if (command)
        {
          result.push(command);
        }
      });
    }

    return result;
  }
}