import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem } from '@mantine/core';
import { LocalizationCore } from 'lotus-core';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterString = (column, onSelectFilterMode) => {
    return [
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('contains'); column.filterFn = 'contains'; }, children: LocalizationCore.data.filters.contains }, 'stringContains'),
        _jsx(MenuItem, { onClick: () => onSelectFilterMode('equals'), children: LocalizationCore.data.filters.equals }, 'stringEquals'),
        _jsx(MenuItem, { onClick: () => onSelectFilterMode('startsWith'), children: LocalizationCore.data.filters.startsWith }, 'stringStartsWith'),
        _jsx(MenuItem, { onClick: () => onSelectFilterMode('endsWith'), children: LocalizationCore.data.filters.endsWith }, 'stringEndsWith'),
        _jsx(MenuItem, { onClick: () => onSelectFilterMode('notEquals'), children: LocalizationCore.data.filters.notEqual }, 'stringNotEquals'),
        _jsx(MenuItem, { onClick: () => onSelectFilterMode('notEmpty'), children: LocalizationCore.data.filters.notEmpty }, 'stringNotEmpty')
    ];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterEnum = (column, onSelectFilterMode) => {
    return [
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('equals'); }, children: LocalizationCore.data.filters.equals }, 'equals'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('notEquals'); }, children: LocalizationCore.data.filters.notEqual }, 'notEquals')
    ];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterEnumNull = (column, onSelectFilterMode) => {
    return [
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('equals'); }, children: LocalizationCore.data.filters.equals }, 'equals'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('notEquals'); }, children: LocalizationCore.data.filters.notEqual }, 'notEquals'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('empty'); }, children: LocalizationCore.data.filters.empty }, 'empty'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('notEmpty'); }, children: LocalizationCore.data.filters.notEmpty }, 'notEmpty')
    ];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterNumber = (column, onSelectFilterMode) => {
    return [
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('equals'); }, children: LocalizationCore.data.filters.equals }, 'equals'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('notEquals'); }, children: LocalizationCore.data.filters.notEqual }, 'notEquals'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('lessThan'); }, children: LocalizationCore.data.filters.lessThan }, 'lessThan'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('lessThanOrEqualTo'); }, children: LocalizationCore.data.filters.lessThanOrEqual }, 'lessThanOrEqualTo'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('greaterThan'); }, children: LocalizationCore.data.filters.greaterThan }, 'greaterThan'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('greaterThanOrEqualTo'); }, children: LocalizationCore.data.filters.greaterThanOrEqual }, 'greaterThanOrEqualTo'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('between'); }, children: LocalizationCore.data.filters.between }, 'between')
    ];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterNumberNull = (column, onSelectFilterMode) => {
    return [
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('equals'); }, children: LocalizationCore.data.filters.equals }, 'equals'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('notEquals'); }, children: LocalizationCore.data.filters.notEqual }, 'notEquals'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('lessThan'); }, children: LocalizationCore.data.filters.lessThan }, 'lessThan'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('lessThanOrEqualTo'); }, children: LocalizationCore.data.filters.lessThanOrEqual }, 'lessThanOrEqualTo'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('greaterThan'); }, children: LocalizationCore.data.filters.greaterThan }, 'greaterThan'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('greaterThanOrEqualTo'); }, children: LocalizationCore.data.filters.greaterThanOrEqual }, 'greaterThanOrEqualTo'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('between'); }, children: LocalizationCore.data.filters.between }, 'between'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('empty'); }, children: LocalizationCore.data.filters.empty }, 'empty'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('notEmpty'); }, children: LocalizationCore.data.filters.notEmpty }, 'notEmpty')
    ];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterArray = (column, onSelectFilterMode) => {
    return [
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('includeAny'); }, children: LocalizationCore.data.filters.includeAny }, 'includeAny'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('includeAll'); }, children: LocalizationCore.data.filters.includeAll }, 'includeAll'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('includeEquals'); }, children: LocalizationCore.data.filters.includeEquals }, 'includeEquals'),
        _jsx(MenuItem, { onClick: () => { onSelectFilterMode('includeNone'); }, children: LocalizationCore.data.filters.includeNone }, 'includeNone')
    ];
};
//# sourceMappingURL=TableViewFilterTypes.js.map