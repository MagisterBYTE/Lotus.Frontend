/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrayHelper } from '#helpers';
import { IRoute } from '#modules/route';
import { Assert } from '#utils';
import { ActionCommandTypes, TActionCommandType } from './ActionCommandType';

/**
 * Делегат для интерфейса команды действия, возвращает TResult
 */
export type FunctionCommandDelegate<TResult> = (command: IActionCommand, context?: any) => TResult;

/**
 * Интерфейс команды действия
 * @description Команда действия предоставляет собой концепцию (паттерн) для связывания логики выполнения действия и визуального элемента.
 * Как паттерн, команда позволяет инкапсулировать запрос на выполнение определенного действия в виде отдельного объекта
 */
export interface IActionCommand
{
  //
  // ОСНОВНЫЕ ДАННЫЕ
  //
  /**
   * Тип команды
   */
  readonly commandType: TActionCommandType|string;

  /**
   * Имя команды
   * Должно быть уникальным в пределах группы или иного контекста
   */
  name: string;

  /**
   * Параметр команды
   */
  parameter?: any;

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  execute: FunctionCommandDelegate<any>;

  /**
   * Статус определяющий возможность выполнения команды
   */
  canExecute?: FunctionCommandDelegate<boolean> | boolean;

  /**
   * Статус выбора
   */
  isSelected?: FunctionCommandDelegate<boolean> | boolean;

  //
  // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
  //
  /**
   * Маршрут команды
   */
  route?: IRoute;

  //
  // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
  //
  /**
   * Надпись
   */
  label: string | FunctionCommandDelegate<any>;

  /**
   * Иконка
   */
  icon?: any | FunctionCommandDelegate<any>;

  /**
   * Порядок при сортировке команд
   */
  order?: number;

  /**
   * Группа к которой относиться команда
   */
  group?: string;

  /**
   * Набор разрешений для того чтобы показать команду
   */
  permissionsVisible?: string[];

  /**
   * Проверка на видимость команды по набору разрешений
   * @param permissions Проверяемый набор разрешений
   */
  checkPermissionsVisible(permissions?: string[]): boolean;

  //
  // ДОЧЕРНИЕ ЭЛЕМЕНТЫ
  //
  /**
   * Дочерние элементы команды
   */
  children?: IActionCommand[];
}

/**
 * Базовый класс команды действия
 */
export class BaseActionCommand implements IActionCommand
{
  //
  // ОСНОВНЫЕ ДАННЫЕ
  //
  public readonly commandType: TActionCommandType|string;
  public name: string;
  public parameter?: any;
  public execute: FunctionCommandDelegate<any>;
  public canExecute?: FunctionCommandDelegate<boolean> | boolean;
  public isSelected?: FunctionCommandDelegate<boolean> | boolean;

  //
  // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
  //
  public route?: IRoute;

  //
  // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
  //
  public label: string | FunctionCommandDelegate<any>;
  public icon?: any | FunctionCommandDelegate<any>;
  public order?: number;
  public group?: string;
  public permissionsVisible?: string[];

  //
  // ДОЧЕРНИЕ ЭЛЕМЕНТЫ
  //
  children?: IActionCommand[];

  constructor(commandType: TActionCommandType|string, name: string)
  {
    this.commandType = commandType;
    this.name = name;
    this.label = '';
    this.executeCommand = this.executeCommand.bind(this);
    this.canExecuteCommand = this.canExecuteCommand.bind(this);
    this.isSelectedCommand = this.isSelectedCommand.bind(this);
    this.execute = () => { };
  }

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  public executeCommand(context?: any): void
  {
    this.execute(this, context);
  }

  /**
   * Метод определяющий возможность выполнения команды
   */
  public canExecuteCommand(context?: any): boolean
  {
    if (Assert.existValue<FunctionCommandDelegate<boolean> | boolean>(this.canExecute))
    {
      if (Assert.isFunction(this.canExecute))
      {
        return this.canExecute(this, context);
      }
      return this.canExecute;
    }

    return true;
  }

  /**
   * Статус выбора
   */
  public isSelectedCommand(context?: any): boolean
  {
    if (Assert.existValue<FunctionCommandDelegate<boolean> | boolean>(this.isSelected))
    {
      if (Assert.isFunction(this.isSelected))
      {
        return this.isSelected(this, context);
      }
      return this.isSelected;
    }

    return false;
  }

  /**
   * Проверка на видимость команды по набору разрешений
   * @param permissions Проверяемый набор разрешений
   */
  public checkPermissionsVisible(permissions?: string[]): boolean
  {
    if (Assert.isArrayWithData(this.permissionsVisible))
    {
      if (Assert.isArrayWithData(permissions))
      {
        return ArrayHelper.checkInArrayAny(this.permissionsVisible, permissions);
      }

      return false;
    }

    return true;
  }
}

/**
 * Класс команды по умолчанию для действия
 */
export class ActionCommand extends BaseActionCommand
{
  constructor(name: string) 
  {
    super(ActionCommandTypes.Default, name);
  }
}
