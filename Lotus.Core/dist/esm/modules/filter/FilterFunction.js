import { LocalizationCore } from '../../localization';
/**
 * Перечисление для типа функции для фильтрации данных
 */
export const FilterFunctionDescriptors = {
    /**
     * Равно аргументу
     */
    Equals: {
        id: 0,
        type: 'Equals',
        abbr: LocalizationCore.data.filters.equalsAbbr,
        desc: LocalizationCore.data.filters.equals
    },
    /**
     * Не равно аргументу
     */
    NotEqual: {
        id: 1,
        type: 'NotEqual',
        abbr: LocalizationCore.data.filters.notEqualAbbr,
        desc: LocalizationCore.data.filters.notEqual
    },
    /**
     * Меньше аргумента
     */
    LessThan: {
        id: 2,
        type: 'LessThan',
        abbr: LocalizationCore.data.filters.lessThanAbbr,
        desc: LocalizationCore.data.filters.lessThan
    },
    /**
     * Меньше или равно аргумента
     */
    LessThanOrEqual: {
        id: 3,
        type: 'LessThanOrEqual',
        abbr: LocalizationCore.data.filters.lessThanOrEqualAbbr,
        desc: LocalizationCore.data.filters.lessThanOrEqual
    },
    /**
     * Больше аргумента
     */
    GreaterThan: {
        id: 4,
        type: 'GreaterThan',
        abbr: LocalizationCore.data.filters.greaterThanAbbr,
        desc: LocalizationCore.data.filters.greaterThan
    },
    /**
     * Больше или равно аргумента
     */
    GreaterThanOrEqual: {
        id: 5,
        type: 'GreaterThanOrEqual',
        abbr: LocalizationCore.data.filters.greaterThanOrEqualAbbr,
        desc: LocalizationCore.data.filters.greaterThanOrEqual
    },
    /**
     * Между первым аргументом (меньшим) и вторым аргументом (большим)
     */
    Between: {
        id: 6,
        type: 'Between',
        abbr: LocalizationCore.data.filters.betweenAbbr,
        desc: LocalizationCore.data.filters.between
    },
    /**
    * Аргумент (строка) может находиться в любом месте c учетом регистра
    */
    Contains: {
        id: 7,
        type: 'Contains',
        abbr: LocalizationCore.data.filters.contains,
        desc: LocalizationCore.data.filters.contains
    },
    /**
    * Аргумент(строка) может находиться в любом месте c учетом регистра
    */
    StartsWith: {
        id: 8,
        type: 'StartsWith',
        abbr: LocalizationCore.data.filters.startsWith,
        desc: LocalizationCore.data.filters.startsWith
    },
    /**
     * Аргумент(строка) должна находится в конце c учетом регистра
     */
    EndsWith: {
        id: 9,
        type: 'EndsWith',
        abbr: LocalizationCore.data.filters.endsWith,
        desc: LocalizationCore.data.filters.endsWith
    },
    /**
     * Аргумент(строка) должна сравнивается с учетом оператора Like
     */
    Like: {
        id: 10,
        type: 'Like',
        abbr: LocalizationCore.data.filters.like,
        desc: LocalizationCore.data.filters.like
    },
    /**
     * Не равно пустой или NULL строке. Аргумент НЕ требуется.
     * Не равно значению NULL для иных объектов.
     */
    NotEmpty: {
        id: 11,
        type: 'NotEmpty',
        abbr: LocalizationCore.data.filters.notEmpty,
        desc: LocalizationCore.data.filters.notEmpty
    },
    /**
     * Равно пустой или NULL строке. Аргумент НЕ требуется.
     * Равно значению NULL для иных объектов.
     */
    Empty: {
        id: 12,
        type: 'Empty',
        abbr: LocalizationCore.data.filters.empty,
        desc: LocalizationCore.data.filters.empty
    },
    /**
     * Любой из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAny: {
        id: 13,
        type: 'IncludeAny',
        abbr: LocalizationCore.data.filters.includeAny,
        desc: LocalizationCore.data.filters.includeAny
    },
    /**
     * Все из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAll: {
        id: 14,
        type: 'IncludeAll',
        abbr: LocalizationCore.data.filters.includeAll,
        desc: LocalizationCore.data.filters.includeAll
    },
    /**
     * Проверяемые элементы списка должен быть равны массиву аргумента
     */
    IncludeEquals: {
        id: 15,
        type: 'IncludeEquals',
        abbr: LocalizationCore.data.filters.includeEquals,
        desc: LocalizationCore.data.filters.includeEquals
    },
    /**
     * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
     */
    IncludeNone: {
        id: 16,
        type: 'IncludeNone',
        abbr: LocalizationCore.data.filters.includeNone,
        desc: LocalizationCore.data.filters.includeNone
    }
};
//# sourceMappingURL=FilterFunction.js.map