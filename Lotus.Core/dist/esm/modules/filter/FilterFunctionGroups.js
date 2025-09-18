import { FilterFunctionDescriptors } from './FilterFunction';
/**
 * Группа функций фильтрации для числовых типов
 */
export const GroupFilterFunctionsNumber = [
    FilterFunctionDescriptors.Equals,
    FilterFunctionDescriptors.NotEqual,
    FilterFunctionDescriptors.LessThan,
    FilterFunctionDescriptors.LessThanOrEqual,
    FilterFunctionDescriptors.GreaterThan,
    FilterFunctionDescriptors.GreaterThanOrEqual,
    FilterFunctionDescriptors.Between
];
/**
 * Группа функций фильтрации для строк
 */
export const GroupFilterFunctionsString = [
    FilterFunctionDescriptors.Equals,
    FilterFunctionDescriptors.Contains,
    FilterFunctionDescriptors.StartsWith,
    FilterFunctionDescriptors.EndsWith,
    FilterFunctionDescriptors.NotEqual,
    FilterFunctionDescriptors.NotEmpty
];
/**
 * Группа функций фильтрации для перечисления
 */
export const GroupFilterFunctionsEnum = [
    FilterFunctionDescriptors.Equals,
    FilterFunctionDescriptors.NotEqual
];
/**
 * Группа функций фильтрации для массива
 */
export const GroupFilterFunctionsArray = [
    FilterFunctionDescriptors.IncludeAll,
    FilterFunctionDescriptors.IncludeAny,
    FilterFunctionDescriptors.IncludeEquals,
    FilterFunctionDescriptors.IncludeNone
];
//# sourceMappingURL=FilterFunctionGroups.js.map