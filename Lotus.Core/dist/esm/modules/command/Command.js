/**
 * Базовый класс команды
 */
export class BaseCommand {
    //
    // ОСНОВНЫЕ ДАННЫЕ
    //
    /**
     * Имя команды
     */
    name;
    /**
     * Параметр команды
     */
    parameter;
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    execute;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecute;
    /**
     * Статус выбора
     */
    isSelected;
    //
    // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
    //
    /**
     * Маршрут команды
     */
    route;
    //
    // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
    //
    /**
     * Надпись
     */
    label;
    /**
     * Иконка
     */
    icon;
    /**
     * Порядок при сортировке команд
     */
    order;
    /**
     * Группа к которой относиться команда
     */
    group;
    constructor(name) {
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
        if (this.canExecute) {
            return this.canExecute(this, context);
        }
        return true;
    }
    /**
     * Статус выбора
     */
    isSelectedCommand(context) {
        if (this.isSelected) {
            return this.isSelected(this, context);
        }
        return false;
    }
}
//# sourceMappingURL=Command.js.map