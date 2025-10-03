import { TGuid } from '../types';
export declare abstract class GuidHelper {
    /**
     * Пустой Guid
     */
    static readonly Empty: TGuid;
    /**
     * Регулярное выражение для проверки формата UUID (TGuid)
     */
    static readonly TGuidRegex: RegExp;
    static generateShortUUID(): string;
    /**
     * Проверка объекта на тип TGuid
     * @param value Проверяемый объект
     * @returns true, если объект соответствует типу TGuid, false в противном случае
     */
    static instanceOfGuid(value?: any): value is TGuid;
    /**
     * Создание простого Guid
     * @returns Guid
     */
    static createGuid(): TGuid;
    /**
     * Создание Guid V7
     * @returns Guid
     */
    static createGuidV7(): TGuid;
    private static getRandomHexBytes;
}
//# sourceMappingURL=GuidHelper.d.ts.map