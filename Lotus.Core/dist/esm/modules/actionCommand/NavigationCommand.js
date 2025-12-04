import { BaseActionCommand } from './ActionCommand';
import { ActionCommandTypes } from './ActionCommandType';
/**
 * Класс команды для простой навигации
 */
export class NavigationCommand extends BaseActionCommand {
    constructor(name, route) {
        super(ActionCommandTypes.Navigation, name);
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