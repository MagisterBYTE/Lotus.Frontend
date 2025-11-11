export declare class Assert {
    /**
     * Проверка значения на undefined или null
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static emptyValue(value: unknown): boolean;
    /**
     * Проверка на наличие значения
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static existValue<TValue>(value: TValue | any): value is TValue;
    /**
     * Метод возвращает true если хотя бы один из аргументов при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static anyTrue(...args: any[]): boolean;
    /**
     * Метод возвращает true если все аргументы при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static allTrue(...args: any[]): boolean;
    /**
     * Метод возвращает false если хотя бы один из аргументов при преобразовании в Boolean дает false
     * @param args Список аргументов
     * @returns
     */
    static anyFalse(...args: any[]): boolean;
    /**
     * Метод возвращает true если все аргументы при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static allFalse(...args: any[]): boolean;
    /**
     * Проверка объекта на то, что все его свойства имеют значения undefined
     * @param object Проверяемый объект
     * @returns Статус проверки
     */
    static objectPropertyEmpty(object: object): boolean;
}
//# sourceMappingURL=Assert.d.ts.map