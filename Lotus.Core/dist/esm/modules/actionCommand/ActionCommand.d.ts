import { IRoute } from '#modules/route';
import { TActionCommandType } from './ActionCommandType';
/**
 * Делегат для интерфейса команды действия, возвращает TResult
 */
export type FunctionCommandDelegate<TResult> = (command: IActionCommand, context?: any) => TResult;
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
    /**
     * Маршрут команды
     */
    route?: IRoute;
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
    /**
     * Дочерние элементы команды
     */
    children?: IActionCommand[];
}
/**
 * Базовый класс команды действия
 */
export declare class BaseActionCommand implements IActionCommand {
    readonly commandType: TActionCommandType | string;
    name: string;
    parameter?: any;
    execute: FunctionCommandDelegate<any>;
    canExecute?: FunctionCommandDelegate<boolean> | boolean;
    isSelected?: FunctionCommandDelegate<boolean> | boolean;
    route?: IRoute;
    label: string | FunctionCommandDelegate<any>;
    icon?: any | FunctionCommandDelegate<any>;
    order?: number;
    group?: string;
    permissionsVisible?: string[];
    children?: IActionCommand[];
    constructor(commandType: TActionCommandType | string, name: string);
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeCommand(context?: any): void;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteCommand(context?: any): boolean;
    /**
     * Статус выбора
     */
    isSelectedCommand(context?: any): boolean;
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