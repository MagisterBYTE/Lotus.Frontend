import { FilterFunctionDescriptors, IFilterFunctionDesc } from './FilterFunctionDesc';

/**
 * Группа функций фильтрации для числовых типов
 */
export const GroupFilterFunctionsNumber: readonly IFilterFunctionDesc[] =
  [
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
export const GroupFilterFunctionsString: readonly IFilterFunctionDesc[] =
  [
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
export const GroupFilterFunctionsEnum: readonly IFilterFunctionDesc[] =
  [
    FilterFunctionDescriptors.equals,
    FilterFunctionDescriptors.notEqual
  ];

/**
 * Группа функций фильтрации для массива
 */
export const GroupFilterFunctionsArray: readonly IFilterFunctionDesc[] =
  [
    FilterFunctionDescriptors.includeAll,
    FilterFunctionDescriptors.includeAny,
    FilterFunctionDescriptors.includeEquals,
    FilterFunctionDescriptors.includeNone
  ];
