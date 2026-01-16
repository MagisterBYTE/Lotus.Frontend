import { BaseActionCommand } from './ActionCommand';
/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export declare class DelimiterCommand extends BaseActionCommand {
    private static _delimiterCommand;
    static get Instance(): DelimiterCommand;
    constructor(name: string);
}
//# sourceMappingURL=DelimiterCommand.d.ts.map