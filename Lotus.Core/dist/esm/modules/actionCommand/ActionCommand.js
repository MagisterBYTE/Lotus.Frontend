/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrayHelper } from '#helpers';
import { Assert } from '#utils';
import { ActionCommandTypes } from './ActionCommandType';
/**
 * Базовый класс команды действия
 */
export class BaseActionCommand {
    //
    // ОСНОВНЫЕ ДАННЫЕ
    //
    commandType;
    name;
    parameter;
    execute;
    canExecute;
    isSelected;
    //
    // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
    //
    route;
    //
    // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
    //
    label;
    icon;
    order;
    group;
    permissionsVisible;
    //
    // ДОЧЕРНИЕ ЭЛЕМЕНТЫ
    //
    children;
    constructor(commandType, name) {
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
    executeCommand(context) {
        this.execute(this, context);
    }
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteCommand(context) {
        if (Assert.existValue(this.canExecute)) {
            if (Assert.isFunction(this.canExecute)) {
                return this.canExecute(this, context);
            }
            return this.canExecute;
        }
        return true;
    }
    /**
     * Статус выбора
     */
    isSelectedCommand(context) {
        if (Assert.existValue(this.isSelected)) {
            if (Assert.isFunction(this.isSelected)) {
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
    checkPermissionsVisible(permissions) {
        if (Assert.isArrayWithData(this.permissionsVisible)) {
            if (Assert.isArrayWithData(permissions)) {
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
export class ActionCommand extends BaseActionCommand {
    constructor(name) {
        super(ActionCommandTypes.Default, name);
    }
}
//# sourceMappingURL=ActionCommand.js.map