import { FilterFunctionDescriptors } from './FilterFunctionDesc';
/**
 * Группа функций фильтрации для числовых типов
 */
export const GroupFilterFunctionsNumber = [
    FilterFunctionDescriptors.equals,
    FilterFunctionDescriptors.notEqual,
    FilterFunctionDescriptors.lessThan,
    FilterFunctionDescriptors.lessThanOrEqual,
    FilterFunctionDescriptors.greaterThan,
    FilterFunctionDescriptors.greaterThanOrEqual,
    FilterFunctionDescriptors.between
];
/**
 * Группа функций фильтрации для строк
 */
export const GroupFilterFunctionsString = [
    FilterFunctionDescriptors.equals,
    FilterFunctionDescriptors.contains,
    FilterFunctionDescriptors.startsWith,
    FilterFunctionDescriptors.endsWith,
    FilterFunctionDescriptors.notEqual,
    FilterFunctionDescriptors.notEmpty
];
/**
 * Группа функций фильтрации для перечисления
 */
export const GroupFilterFunctionsEnum = [
    FilterFunctionDescriptors.equals,
    FilterFunctionDescriptors.notEqual
];
/**
 * Группа функций фильтрации для массива
 */
export const GroupFilterFunctionsArray = [
    FilterFunctionDescriptors.includeAll,
    FilterFunctionDescriptors.includeAny,
    FilterFunctionDescriptors.includeEquals,
    FilterFunctionDescriptors.includeNone
];
//# sourceMappingURL=FilterFunctionGroups.js.map