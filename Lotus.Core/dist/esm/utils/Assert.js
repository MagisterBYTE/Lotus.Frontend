export class Assert {
    /**
     * Проверка значения на undefined или null
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static empty(value) {
        return value == undefined || value == null;
    }
    /**
     * Проверка на наличие значения
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static exist(value) {
        return value != undefined && value != null;
    }
    /**
     * Проверка объекта на то, что все его свойства имеют значения undefined
     * @param object Проверяемый объект
     * @returns Статус проверки
     */
    static allUndefined(object) {
        return !Object.values(object).some((value) => value !== undefined);
    }
}
