/**
 * Допустимые значения типа свойства.
 */
export declare const TPropertyTypeValues: readonly ["bool", "int", "long", "float", "double", "enum", "string", "dateTime", "guid"];
/**
 * Тип свойства
 */
export type TPropertyType = (typeof TPropertyTypeValues)[number];
/**
 * Объект-обёртка для работы с типами свойств (EnumClass-паттерн).
 */
export declare const TPropertyTypes: {
    /**
     * Логические и числовые типы
     */
    readonly Bool: "bool";
    readonly Int: "int";
    readonly Long: "long";
    readonly Float: "float";
    readonly Double: "double";
    /**
     * Специальные и строковые типы
     */
    readonly Enum: "enum";
    readonly String: "string";
    readonly DateTime: "dateTime";
    readonly Guid: "guid";
    /**
     * Возвращает все доступные значения.
     */
    readonly getAllValues: () => readonly TPropertyType[];
    /**
     * Проверяет, является ли значение допустимым TPropertyType.
     */
    readonly isPropertyType: (value: unknown) => value is TPropertyType;
    /**
     * Возвращает тип свойства по индексу, если он существует.
     */
    readonly getByIndex: (index: number) => TPropertyType | undefined;
    /**
     * Возвращает тип свойства по имени (сравнение без учёта регистра).
     */
    readonly getByName: (name: string) => TPropertyType | undefined;
};
//# sourceMappingURL=PropertyType.d.ts.map