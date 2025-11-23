import { BaseCommand } from './Command';
/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export class DelimiterCommand extends BaseCommand {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(name) {
        super(name);
    }
}
/**
 * Глобальный доступ к команде разделения по умолчанию
 */
export const DelimiterCommandDefault = new DelimiterCommand('delimiter');
//# sourceMappingURL=DelimiterCommand.js.map