import { BaseCommand } from './Command';
/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export class DelimiterCommand extends BaseCommand {
    constructor(name) {
        super(name);
    }
}
/**
 * Глобальный доступ к команде разделения по умолчанию
 */
export const DelimiterCommandDefault = new DelimiterCommand('delimiter');
//# sourceMappingURL=DelimiterCommand.js.map