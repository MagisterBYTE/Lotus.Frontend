import { instanceOfDisplayNameable, instanceOfNameable } from '#types';
/**
 * Класс для получение имени объекта
 */
export class ObjectName {
    /**
     * Получение имени объекта
     * @param obj Объект
     * @param defaultName Значение по умолчанию
     * @returns Имя объекта или значение по умолчанию
     */
    static getName(obj, defaultName = '') {
        if (typeof obj === 'string')
            return obj;
        if (typeof obj === 'number')
            return obj.toString();
        if (instanceOfDisplayNameable(obj))
            return obj.displayName;
        if (instanceOfNameable(obj))
            return obj.name;
        return defaultName;
    }
}
//# sourceMappingURL=ObjectName.js.map