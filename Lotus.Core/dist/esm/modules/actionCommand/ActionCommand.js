import { ArrayHelper } from '#helpers';
import { Assert } from '#utils';
import { TActionCommandTypes } from './ActionCommandType';
/**
 * Базовый класс команды действия
 */
export class BaseActionCommand {
    // #region Fields
    _name;
    _parameter;
    _execute;
    _canExecute;
    _isSelected;
    _route;
    _label;
    _icon;
    _order;
    _group;
    _permissionsVisible;
    _children;
    // #endregion
    // #region Properties
    commandType;
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get parameter() {
        return this._parameter;
    }
    set parameter(value) {
        this._parameter = value;
    }
    get execute() {
        return this._execute;
    }
    set execute(value) {
        this._execute = value;
    }
    get canExecute() {
        return this._canExecute;
    }
    set canExecute(value) {
        this._canExecute = value;
    }
    get isSelected() {
        return this._isSelected;
    }
    set isSelected(value) {
        this._isSelected = value;
    }
    get route() {
        return this._route;
    }
    set route(value) {
        this._route = value;
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    get icon() {
        return this._icon;
    }
    set icon(value) {
        this._icon = value;
    }
    get order() {
        return this._order;
    }
    set order(value) {
        this._order = value;
    }
    get group() {
        return this._group;
    }
    set group(value) {
        this._group = value;
    }
    get permissionsVisible() {
        return this._permissionsVisible;
    }
    set permissionsVisible(value) {
        this._permissionsVisible = value;
    }
    get children() {
        return this._children;
    }
    set children(value) {
        this._children = value;
    }
    // #endregion
    // #region Constructors
    constructor(commandType, name) {
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
    executeCommand(context) {
        this._execute(this, context);
    }
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteCommand(context) {
        if (Assert.existValue(this._canExecute)) {
            if (Assert.isFunction(this._canExecute)) {
                return this._canExecute(this, context);
            }
            return this._canExecute;
        }
        return true;
    }
    /**
     * Статус выбора
     */
    isSelectedCommand(context) {
        if (Assert.existValue(this._isSelected)) {
            if (Assert.isFunction(this._isSelected)) {
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
    checkPermissionsVisible(permissions) {
        if (Assert.isArrayWithData(this._permissionsVisible)) {
            if (Assert.isArrayWithData(permissions)) {
                return ArrayHelper.checkInArrayAny(this._permissionsVisible, permissions);
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
        super(TActionCommandTypes.Default, name);
    }
}
//# sourceMappingURL=ActionCommand.js.map