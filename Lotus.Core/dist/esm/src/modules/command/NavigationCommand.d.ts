import { IRoute } from 'types/Route';
import { BaseCommand } from './Command';
/**
 * Класс команды для простой навигации
 */
export declare class NavigationCommand<TCommandParameter = any> extends BaseCommand<TCommandParameter> {
    constructor(name: string, route: IRoute);
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeDefault(): void;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteDefault(): boolean;
    /**
     * Статус выбора
     */
    isSelectedDefault(): boolean;
}
