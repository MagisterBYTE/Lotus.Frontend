import { ArrayHelper } from '#helpers';
import { IRoute } from '#modules/route';
import { Assert } from '#utils';
import { TActionCommandTypes, TActionCommandType } from './ActionCommandType';

/**
 * Делегат для интерфейса команды действия, возвращает TResult
 */
export type FunctionCommandDelegate<TResult> = (command: IActionCommand, context?: unknown) => TResult;

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
  parameter?: unknown;

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  execute: FunctionCommandDelegate<unknown>;

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
  label: string | FunctionCommandDelegate<unknown>;

  /**
   * Иконка
   */
  icon?: unknown | FunctionCommandDelegate<unknown>;

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
  // #region Fields
  private _name: string;
  private _parameter?: unknown;
  private _execute: FunctionCommandDelegate<unknown>;
  private _canExecute?: FunctionCommandDelegate<boolean> | boolean;
  private _isSelected?: FunctionCommandDelegate<boolean> | boolean;
  private _route?: IRoute;
  private _label: string | FunctionCommandDelegate<unknown>;
  private _icon?: unknown | FunctionCommandDelegate<unknown>;
  private _order?: number;
  private _group?: string;
  private _permissionsVisible?: string[];
  private _children?: IActionCommand[];
  // #endregion

  // #region Properties
  public readonly commandType: TActionCommandType|string;

  public get name(): string
  {
    return this._name;
  }

  public set name(value: string)
  {
    this._name = value;
  }

  public get parameter(): unknown | undefined
  {
    return this._parameter;
  }

  public set parameter(value: unknown | undefined)
  {
    this._parameter = value;
  }

  public get execute(): FunctionCommandDelegate<unknown>
  {
    return this._execute;
  }

  public set execute(value: FunctionCommandDelegate<unknown>)
  {
    this._execute = value;
  }

  public get canExecute(): FunctionCommandDelegate<boolean> | boolean | undefined
  {
    return this._canExecute;
  }

  public set canExecute(value: FunctionCommandDelegate<boolean> | boolean | undefined)
  {
    this._canExecute = value;
  }

  public get isSelected(): FunctionCommandDelegate<boolean> | boolean | undefined
  {
    return this._isSelected;
  }

  public set isSelected(value: FunctionCommandDelegate<boolean> | boolean | undefined)
  {
    this._isSelected = value;
  }

  public get route(): IRoute | undefined
  {
    return this._route;
  }

  public set route(value: IRoute | undefined)
  {
    this._route = value;
  }

  public get label(): string | FunctionCommandDelegate<unknown>
  {
    return this._label;
  }

  public set label(value: string | FunctionCommandDelegate<unknown>)
  {
    this._label = value;
  }

  public get icon(): unknown | FunctionCommandDelegate<unknown> | undefined
  {
    return this._icon;
  }

  public set icon(value: unknown | FunctionCommandDelegate<unknown> | undefined)
  {
    this._icon = value;
  }

  public get order(): number | undefined
  {
    return this._order;
  }

  public set order(value: number | undefined)
  {
    this._order = value;
  }

  public get group(): string | undefined
  {
    return this._group;
  }

  public set group(value: string | undefined)
  {
    this._group = value;
  }

  public get permissionsVisible(): string[] | undefined
  {
    return this._permissionsVisible;
  }

  public set permissionsVisible(value: string[] | undefined)
  {
    this._permissionsVisible = value;
  }

  public get children(): IActionCommand[] | undefined
  {
    return this._children;
  }

  public set children(value: IActionCommand[] | undefined)
  {
    this._children = value;
  }
  // #endregion

  // #region Constructors

  constructor(commandType: TActionCommandType|string, name: string)
  {
    this.commandType = commandType;
    this._name = name;
    this._label = '';
    this.executeCommand = this.executeCommand.bind(this);
    this.canExecuteCommand = this.canExecuteCommand.bind(this);
    this.isSelectedCommand = this.isSelectedCommand.bind(this);
    this._execute = () => { };
  }
  // #endregion

  // #region Methods
  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  public executeCommand(context?: unknown): void
  {
    this._execute(this, context);
  }

  /**
   * Метод определяющий возможность выполнения команды
   */
  public canExecuteCommand(context?: unknown): boolean
  {
    if (Assert.existValue<FunctionCommandDelegate<boolean> | boolean>(this._canExecute))
    {
      if (Assert.isFunction(this._canExecute))
      {
        return this._canExecute(this, context);
      }
      return this._canExecute;
    }

    return true;
  }

  /**
   * Статус выбора
   */
  public isSelectedCommand(context?: unknown): boolean
  {
    if (Assert.existValue<FunctionCommandDelegate<boolean> | boolean>(this._isSelected))
    {
      if (Assert.isFunction(this._isSelected))
      {
        return this._isSelected(this, context);
      }
      return this._isSelected;
    }

    return false;
  }

  /**
   * Проверка на видимость команды по набору разрешений
   * @param permissions Проверяемый набор разрешений
   */
  public checkPermissionsVisible(permissions?: string[]): boolean
  {
    if (Assert.isArrayWithData(this._permissionsVisible))
    {
      if (Assert.isArrayWithData(permissions))
      {
        return ArrayHelper.checkIn(this._permissionsVisible, permissions);
      }

      return false;
    }

    return true;
  }
  // #endregion
}

/**
 * Класс команды по умолчанию для действия
 */
export class ActionCommand extends BaseActionCommand
{
  constructor(name: string) 
  {
    super(TActionCommandTypes.Default, name);
  }
}
