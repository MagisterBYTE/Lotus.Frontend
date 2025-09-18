import { BaseCommand } from './Command';
/**
 * Класс команды для простой навигации
 */
export class NavigationCommand extends BaseCommand {
    constructor(name, route) {
        super(name);
        this.route = route;
    }
    /**
     * Статус выбора
     */
    isSelectedCommand(context) {
        if (window.location.pathname === this.route?.path) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=NavigationCommand.js.map