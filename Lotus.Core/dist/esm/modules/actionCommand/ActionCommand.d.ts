import { IRoute } from '#modules/route';
import { TActionCommandType } from './ActionCommandType';
/**
 * Делегат для интерфейса команды действия, возвращает TResult
 */
export type FunctionCommandDelegate<TResult> = (command: IActionCommand, context?: unknown) => TResult;
/**
 * Интерфейс команды действия
 * @description Команда действия предоставляет собой концепцию (паттерн) для связывания логики выполнения действия и визуального элемента.
 * Как паттерн, команда позволяет инкапсулировать запрос на выполнение определенного действия в виде отдельного объекта
 */
export interface IActionCommand {
    /**
     * Тип команды
     */
    readonly commandType: TActionCommandType | string;
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
    /**
     * Маршрут команды
     */
    route?: IRoute;
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
    /**
     * Дочерние элементы команды
     */
    children?: IActionCommand[];
}
/**
 * Базовый класс команды действия
 */
export declare class BaseActionCommand implements IActionCommand {
    private _name;
    private _parameter?;
    private _execute;
    private _canExecute?;
    private _isSelected?;
    private _route?;
    private _label;
    private _icon?;
    private _order?;
    private _group?;
    private _permissionsVisible?;
    private _children?;
    readonly commandType: TActionCommandType | string;
    get name(): string;
    set name(value: string);
    get parameter(): unknown | undefined;
    set parameter(value: unknown | undefined);
    get execute(): FunctionCommandDelegate<unknown>;
    set execute(value: FunctionCommandDelegate<unknown>);
    get canExecute(): FunctionCommandDelegate<boolean> | boolean | undefined;
    set canExecute(value: FunctionCommandDelegate<boolean> | boolean | undefined);
    get isSelected(): FunctionCommandDelegate<boolean> | boolean | undefined;
    set isSelected(value: FunctionCommandDelegate<boolean> | boolean | undefined);
    get route(): IRoute | undefined;
    set route(value: IRoute | undefined);
    get label(): string | FunctionCommandDelegate<unknown>;
    set label(value: string | FunctionCommandDelegate<unknown>);
    get icon(): unknown | FunctionCommandDelegate<unknown> | undefined;
    set icon(value: unknown | FunctionCommandDelegate<unknown> | undefined);
    get order(): number | undefined;
    set order(value: number | undefined);
    get group(): string | undefined;
    set group(value: string | undefined);
    get permissionsVisible(): string[] | undefined;
    set permissionsVisible(value: string[] | undefined);
    get children(): IActionCommand[] | undefined;
    set children(value: IActionCommand[] | undefined);
    constructor(commandType: TActionCommandType | string, name: string);
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeCommand(context?: unknown): void;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteCommand(context?: unknown): boolean;
    /**
     * Статус выбора
     */
    isSelectedCommand(context?: unknown): boolean;
    /**
     * Проверка на видимость команды по набору разрешений
     * @param permissions Проверяемый набор разрешений
     */
    checkPermissionsVisible(permissions?: string[]): boolean;
}
/**
 * Класс команды по умолчанию для действия
 */
export declare class ActionCommand extends BaseActionCommand {
    constructor(name: string);
}
//# sourceMappingURL=ActionCommand.d.ts.map