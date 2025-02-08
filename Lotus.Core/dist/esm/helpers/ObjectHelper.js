export class ObjectHelper {
    static ALL_DIGITS_REGEX = /^\d+$/;
    static PATH_SPLIT_REGEX = /\.|\]|\[/;
    /**
     * Получить значения свойства у объекта source по пути propertyPath
     * @param source Объект
     * @param propertyPath Имя/путь свойства
     * @param shouldThrow Генерировать исключение если свойство не найдено
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getValueByPropertyPath(source, propertyPath, shouldThrow = false) {
        if (source === null || source === undefined) {
            return undefined;
        }
        // split path: "param[3].test" => ["param", 3, "test"]
        const parts = ObjectHelper.splitPath(propertyPath);
        // eslint-disable-next-line consistent-return
        return parts.reduce((acc, el) => {
            if (acc === undefined) {
                if (shouldThrow) {
                    throw new Error(`Could not dig the value using path: ${propertyPath}`);
                }
                else {
                    return undefined;
                }
            }
            if (ObjectHelper.isNum(el)) {
                // array getter [3]
                const arrIndex = parseInt(el);
                if (acc instanceof Set) {
                    // eslint-disable-next-line consistent-return
                    return Array.from(acc)[arrIndex];
                }
                else {
                    // eslint-disable-next-line consistent-return
                    return acc[arrIndex];
                }
            }
            else {
                // object getter
                if (acc instanceof Map) {
                    // eslint-disable-next-line consistent-return
                    return acc.get(el);
                }
                else {
                    // eslint-disable-next-line consistent-return
                    return acc[el];
                }
            }
        }, source);
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
    static isNum(str) {
        return str.match(ObjectHelper.ALL_DIGITS_REGEX);
    }
    static splitPath(str) {
        return (str
            .split(ObjectHelper.PATH_SPLIT_REGEX)
            // remove empty strings
            .filter((x) => !!x));
    }
}
