import _ from 'lodash';
export class ObjectHelper {
    /**
     * Получить значения свойства у объекта source по пути propertyPath
     * @param source Объект
     * @param propertyPath Имя/путь свойства
     * @param defaultValue Значение по умолчанию если свойство не найдено
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getValue(source, propertyPath, defaultValue) {
        if (source === undefined || source === null)
            return undefined;
        const value = _.get(source, propertyPath, defaultValue);
        // eslint-disable-next-line consistent-return
        return value;
    }
    /**
     * Установить значения свойства у объекта source по пути propertyPath
     * @param source Объект
     * @param propertyPath Имя/путь свойства
     * @param value Значение
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static setValue(source, propertyPath, value) {
        if (source === undefined || source === null)
            return;
        _.set(source, propertyPath, value);
    }
    /**
     * Получить глубокую копию объекта
     * @param source
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static cloneDeep(source) {
        if (source === undefined || source === null)
            return undefined;
        // eslint-disable-next-line consistent-return
        return _.cloneDeep(source);
    }
    /**
     * Проверка на идентичность объектов
     * @param a Первый объект
     * @param b Второй объект
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static equality(a, b) {
        return _.isEqual(a, b);
    }
    /**
     * Searches the supplied object, and then down it's prototype chain until it
     * finds the object where `prop` is its own property. In other words, finds
     * the object in which `prop` was actually defined on, skipping objects that
     * merely inherit `prop`. This is useful when using methods like
     * `Object.getOwnPropertyDescriptor()` which only work on "own" properties.
     *
     * @param scope   The scope on which to start checking for
     * @param prop    The name of the property we're searching for
     * @returns {*}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getPropertyDefinitionObject(scope, prop) {
        if (!scope)
            return null;
        return Object.prototype.hasOwnProperty.call(scope, prop)
            ? scope
            : this.getPropertyDefinitionObject(Object.getPrototypeOf(scope), prop);
    }
}
//# sourceMappingURL=ObjectHelper.js.map