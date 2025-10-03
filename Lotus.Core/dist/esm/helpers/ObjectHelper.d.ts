export declare abstract class ObjectHelper {
    /**
     * Получить значения свойства у объекта source по пути propertyPath
     * @param source Объект
     * @param propertyPath Имя/путь свойства
     * @param defaultValue Значение по умолчанию если свойство не найдено
     */
    static getValue<TValue = any>(source: TValue, propertyPath: string, defaultValue?: any): TValue | undefined;
    /**
     * Установить значения свойства у объекта source по пути propertyPath
     * @param source Объект
     * @param propertyPath Имя/путь свойства
     * @param value Значение
     */
    static setValue<TValue = any>(source: TValue, propertyPath: string, value?: any): void;
    /**
     * Получить глубокую копию объекта
     * @param source
     */
    static cloneDeep<TValue = any>(source?: TValue | null): TValue | undefined;
    /**
     * Проверка на идентичность объектов
     * @param a Первый объект
     * @param b Второй объект
     */
    static equality(a: any, b: any): boolean;
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
    static getPropertyDefinitionObject(scope: object, prop: string): any;
}
//# sourceMappingURL=ObjectHelper.d.ts.map