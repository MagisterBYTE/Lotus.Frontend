import { IRoute } from '#modules/route';
import { BaseActionCommand } from './ActionCommand';
/**
 * Класс команды для простой навигации
 */
export declare class NavigationCommand extends BaseActionCommand {
    constructor(name: string, route: IRoute);
    /**
     * Статус выбора
     */
    isSelectedCommand(_context?: unknown): boolean;
}
//# sourceMappingURL=NavigationCommand.d.ts.map