import { ICommand } from './Command';

/**
 * Интерфейс сервиса для работы с командами
 */
export interface ICommandService
{
  /**
   * Добавить список команд
   * @param commands Команды 
   */
  addCommands(commands: ICommand[]): void;

  /**
   * Получить список команд
   */
  getCommands(): ICommand[];

  /**
   * Получить список команд определенной группы
   * @param group Имя группы
   */
  getCommandsByGroup(group: string): ICommand[];

  /**
   * Получить список команд по имени
   * @param names Список имен команд
   */
  getCommandsByName(names?: string[]): ICommand[];
}

/**
 * Сервис для работы с командами
 */
export class CommandService implements ICommandService
{
  //#region Fields
  public commands: ICommand[];
  //#endregion

  constructor() 
  {
    this.commands = [];

    this.getCommands = this.getCommands.bind(this);
    this.getCommandsByGroup = this.getCommandsByGroup.bind(this);
    this.getCommandsByGroupAsName = this.getCommandsByGroupAsName.bind(this);
    this.getCommandsByName = this.getCommandsByName.bind(this);
  }

  public addCommands(commands: ICommand[])
  {
    for(const command of commands)
    {
      this.commands.push(command)
    }
  }

  public getCommands(): ICommand[]
  {
    return this.commands;
  }

  public getCommandsByGroup(group: string): ICommand[]
  {
    return this.commands.filter((x) => x.group === group);
  }

  public getCommandsByGroupAsName(group: string): string[]
  {
    return this.commands.filter((x) => x.group === group).map(x => x.name);
  }

  public getCommandsByName(names?: string[]): ICommand[]
  {
    const result: ICommand[] = [];

    if (names)
    {
      names.forEach((x) =>
      {
        const command = this.commands.find(c => c.name === x);
        if (command)
        {
          result.push(command)
        }
      })
    }

    return result;
  }
}