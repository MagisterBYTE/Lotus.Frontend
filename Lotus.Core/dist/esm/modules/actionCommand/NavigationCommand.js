import { BaseActionCommand } from './ActionCommand';
import { TActionCommandTypes } from './ActionCommandType';
/**
 * Класс команды для простой навигации
 */
export class NavigationCommand extends BaseActionCommand {
    constructor(name, route) {
        super(TActionCommandTypes.Navigation, name);
        this.route = route;
    }
    /**
     * Статус выбора
     */
    isSelectedCommand(_context) {
        if (window.location.pathname === this.route?.path) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=NavigationCommand.js.map