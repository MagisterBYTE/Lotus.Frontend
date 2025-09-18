/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseCommand } from './Command';
/**
 * Наименование(тип) события который посылают команды для генерирования пользовательских событий
 */
export const EventCommandKey = 'EventCommand';
/**
 * Класс команды для генерирования пользовательских событий
 */
export class EventCommand extends BaseCommand {
    constructor(name) {
        super(name);
    }
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeCommand(context) {
        const event = new CustomEvent(EventCommandKey, { detail: this.parameter });
        window.dispatchEvent(event);
    }
}
//# sourceMappingURL=EventCommand.js.map