/**
 * Массив значений типов функций фильтрации
 */
export declare const TFilterFunctionValues: readonly ["equals", "notEqual", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual", "between", "contains", "startsWith", "endsWith", "like", "notEmpty", "empty", "includeAny", "includeAll", "includeEquals", "includeNone"];
/**
 * Тип функции для фильтрации данных
 */
export type TFilterFunction = (typeof TFilterFunctionValues)[number];
/**
 * Объект для представления типов функций фильтрации
 */
export declare const TFilterFunctions: {
    readonly Equals: "equals";
    readonly NotEqual: "notEqual";
    readonly LessThan: "lessThan";
    readonly LessThanOrEqual: "lessThanOrEqual";
    readonly GreaterThan: "greaterThan";
    readonly GreaterThanOrEqual: "greaterThanOrEqual";
    readonly Between: "between";
    readonly Contains: "contains";
    readonly StartsWith: "startsWith";
    readonly EndsWith: "endsWith";
    readonly Like: "like";
    readonly NotEmpty: "notEmpty";
    readonly Empty: "empty";
    readonly IncludeAny: "includeAny";
    readonly IncludeAll: "includeAll";
    readonly IncludeEquals: "includeEquals";
    readonly IncludeNone: "includeNone";
    readonly getAllValues: () => typeof TFilterFunctionValues;
    readonly isFilterFunction: (value: unknown) => value is TFilterFunction;
    readonly getByIndex: (index: number) => TFilterFunction | undefined;
    readonly getByName: (name: string) => TFilterFunction | undefined;
};
//# sourceMappingURL=FilterFunction.d.ts.map