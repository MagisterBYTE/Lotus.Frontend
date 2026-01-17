import { LocalizationCore } from '#localization';
/**
 * Перечисление для типа функции для фильтрации данных
 */
export const FilterFunctionDescriptors = {
    /**
     * Равно аргументу
     */
    equals: {
        id: 0,
        type: 'equals',
        abbr: LocalizationCore.data.filters.equalsAbbr,
        desc: LocalizationCore.data.filters.equals
    },
    /**
     * Не равно аргументу
     */
    notEqual: {
        id: 1,
        type: 'notEqual',
        abbr: LocalizationCore.data.filters.notEqualAbbr,
        desc: LocalizationCore.data.filters.notEqual
    },
    /**
     * Меньше аргумента
     */
    lessThan: {
        id: 2,
        type: 'lessThan',
        abbr: LocalizationCore.data.filters.lessThanAbbr,
        desc: LocalizationCore.data.filters.lessThan
    },
    /**
     * Меньше или равно аргумента
     */
    lessThanOrEqual: {
        id: 3,
        type: 'lessThanOrEqual',
        abbr: LocalizationCore.data.filters.lessThanOrEqualAbbr,
        desc: LocalizationCore.data.filters.lessThanOrEqual
    },
    /**
     * Больше аргумента
     */
    greaterThan: {
        id: 4,
        type: 'greaterThan',
        abbr: LocalizationCore.data.filters.greaterThanAbbr,
        desc: LocalizationCore.data.filters.greaterThan
    },
    /**
     * Больше или равно аргумента
     */
    greaterThanOrEqual: {
        id: 5,
        type: 'greaterThanOrEqual',
        abbr: LocalizationCore.data.filters.greaterThanOrEqualAbbr,
        desc: LocalizationCore.data.filters.greaterThanOrEqual
    },
    /**
     * Между первым аргументом (меньшим) и вторым аргументом (большим)
     */
    between: {
        id: 6,
        type: 'between',
        abbr: LocalizationCore.data.filters.betweenAbbr,
        desc: LocalizationCore.data.filters.between
    },
    /**
    * Аргумент (строка) может находиться в любом месте c учетом регистра
    */
    contains: {
        id: 7,
        type: 'contains',
        abbr: LocalizationCore.data.filters.contains,
        desc: LocalizationCore.data.filters.contains
    },
    /**
    * Аргумент(строка) может находиться в любом месте c учетом регистра
    */
    startsWith: {
        id: 8,
        type: 'startsWith',
        abbr: LocalizationCore.data.filters.startsWith,
        desc: LocalizationCore.data.filters.startsWith
    },
    /**
     * Аргумент(строка) должна находится в конце c учетом регистра
     */
    endsWith: {
        id: 9,
        type: 'endsWith',
        abbr: LocalizationCore.data.filters.endsWith,
        desc: LocalizationCore.data.filters.endsWith
    },
    /**
     * Аргумент(строка) должна сравнивается с учетом оператора Like
     */
    like: {
        id: 10,
        type: 'like',
        abbr: LocalizationCore.data.filters.like,
        desc: LocalizationCore.data.filters.like
    },
    /**
     * Не равно пустой или NULL строке. Аргумент НЕ требуется.
     * Не равно значению NULL для иных объектов.
     */
    notEmpty: {
        id: 11,
        type: 'notEmpty',
        abbr: LocalizationCore.data.filters.notEmpty,
        desc: LocalizationCore.data.filters.notEmpty
    },
    /**
     * Равно пустой или NULL строке. Аргумент НЕ требуется.
     * Равно значению NULL для иных объектов.
     */
    empty: {
        id: 12,
        type: 'empty',
        abbr: LocalizationCore.data.filters.empty,
        desc: LocalizationCore.data.filters.empty
    },
    /**
     * Любой из проверяемых элементов списка должен находиться в массиве аргумента
     */
    includeAny: {
        id: 13,
        type: 'includeAny',
        abbr: LocalizationCore.data.filters.includeAny,
        desc: LocalizationCore.data.filters.includeAny
    },
    /**
     * Все из проверяемых элементов списка должен находиться в массиве аргумента
     */
    includeAll: {
        id: 14,
        type: 'includeAll',
        abbr: LocalizationCore.data.filters.includeAll,
        desc: LocalizationCore.data.filters.includeAll
    },
    /**
     * Проверяемые элементы списка должен быть равны массиву аргумента
     */
    includeEquals: {
        id: 15,
        type: 'includeEquals',
        abbr: LocalizationCore.data.filters.includeEquals,
        desc: LocalizationCore.data.filters.includeEquals
    },
    /**
     * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
     */
    includeNone: {
        id: 16,
        type: 'includeNone',
        abbr: LocalizationCore.data.filters.includeNone,
        desc: LocalizationCore.data.filters.includeNone
    }
};
//# sourceMappingURL=FilterFunctionDesc.js.map