import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classes from './MRT_FilterOptionMenu.module.css';
import { Fragment, useMemo } from 'react';
import { Menu } from '@mantine/core';
export const mrtFilterOptions = (localization) => [
    {
        divider: false,
        label: localization.filterFuzzy,
        option: 'fuzzy',
        symbol: '≈',
    },
    {
        divider: false,
        label: localization.filterContains,
        option: 'contains',
        symbol: '*',
    },
    {
        divider: false,
        label: localization.filterStartsWith,
        option: 'startsWith',
        symbol: 'a',
    },
    {
        divider: true,
        label: localization.filterEndsWith,
        option: 'endsWith',
        symbol: 'z',
    },
    {
        divider: false,
        label: localization.filterEquals,
        option: 'equals',
        symbol: '=',
    },
    {
        divider: true,
        label: localization.filterNotEquals,
        option: 'notEquals',
        symbol: '≠',
    },
    {
        divider: false,
        label: localization.filterBetween,
        option: 'between',
        symbol: '⇿',
    },
    {
        divider: true,
        label: localization.filterBetweenInclusive,
        option: 'betweenInclusive',
        symbol: '⬌',
    },
    {
        divider: false,
        label: localization.filterGreaterThan,
        option: 'greaterThan',
        symbol: '>',
    },
    {
        divider: false,
        label: localization.filterGreaterThanOrEqualTo,
        option: 'greaterThanOrEqualTo',
        symbol: '≥',
    },
    {
        divider: false,
        label: localization.filterLessThan,
        option: 'lessThan',
        symbol: '<',
    },
    {
        divider: true,
        label: localization.filterLessThanOrEqualTo,
        option: 'lessThanOrEqualTo',
        symbol: '≤',
    },
    {
        divider: false,
        label: localization.filterEmpty,
        option: 'empty',
        symbol: '∅',
    },
    {
        divider: false,
        label: localization.filterNotEmpty,
        option: 'notEmpty',
        symbol: '!∅',
    },
];
const rangeModes = ['between', 'betweenInclusive', 'inNumberRange'];
const emptyModes = ['empty', 'notEmpty'];
const arrModes = ['arrIncludesSome', 'arrIncludesAll', 'arrIncludes'];
const rangeVariants = ['range-slider', 'date-range', 'range'];
export const MRT_FilterOptionMenu = ({ header, onSelect, table, }) => {
    const { getState, options: { columnFilterModeOptions, globalFilterModeOptions, localization, renderColumnFilterModeMenuItems, renderGlobalFilterModeMenuItems, }, setColumnFilterFns, setGlobalFilterFn, } = table;
    const { globalFilterFn } = getState();
    const { column } = header ?? {};
    const { columnDef } = column ?? {};
    const currentFilterValue = column?.getFilterValue();
    let allowedColumnFilterOptions = columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;
    if (rangeVariants.includes(columnDef?.filterVariant)) {
        allowedColumnFilterOptions = [
            ...rangeModes,
            ...(allowedColumnFilterOptions ?? []),
        ].filter((option) => rangeModes.includes(option));
    }
    const internalFilterOptions = useMemo(() => {
        const filterOptions = mrtFilterOptions(localization).filter((filterOption) => columnDef
            ? allowedColumnFilterOptions === undefined ||
                allowedColumnFilterOptions?.includes(filterOption.option)
            : (!globalFilterModeOptions ||
                globalFilterModeOptions.includes(filterOption.option)) &&
                ['contains', 'fuzzy', 'startsWith'].includes(filterOption.option));
        if (filterOptions[filterOptions.length - 1].divider) {
            filterOptions[filterOptions.length - 1].divider = false;
        }
        return filterOptions;
    }, [columnDef, globalFilterModeOptions]);
    const handleSelectFilterMode = (option) => {
        const prevFilterMode = columnDef?._filterFn ?? '';
        if (!header || !column) {
            // global filter mode
            setGlobalFilterFn(option);
        }
        else if (option !== prevFilterMode) {
            // column filter mode
            setColumnFilterFns((prev) => ({
                ...prev,
                [header.id]: option,
            }));
            // reset filter value and/or perform new filter render
            if (emptyModes.includes(option)) {
                // will now be empty/notEmpty filter mode
                if (currentFilterValue !== ' ' &&
                    !emptyModes.includes(prevFilterMode)) {
                    column.setFilterValue(' ');
                }
                else if (currentFilterValue) {
                    column.setFilterValue(currentFilterValue); // perform new filter render
                }
            }
            else if (columnDef?.filterVariant === 'multi-select' ||
                arrModes.includes(option)) {
                // will now be array filter mode
                if (currentFilterValue instanceof String ||
                    currentFilterValue?.length) {
                    column.setFilterValue([]);
                }
                else if (currentFilterValue) {
                    column.setFilterValue(currentFilterValue); // perform new filter render
                }
            }
            else if (rangeVariants.includes(columnDef?.filterVariant) ||
                rangeModes.includes(option)) {
                // will now be range filter mode
                if (!Array.isArray(currentFilterValue) ||
                    (!currentFilterValue?.every((v) => v === '') &&
                        !rangeModes.includes(prevFilterMode))) {
                    column.setFilterValue(['', '']);
                }
                else {
                    column.setFilterValue(currentFilterValue); // perform new filter render
                }
            }
            else {
                // will now be single value filter mode
                if (Array.isArray(currentFilterValue)) {
                    column.setFilterValue('');
                }
                else if (currentFilterValue === ' ' &&
                    emptyModes.includes(prevFilterMode)) {
                    column.setFilterValue(undefined);
                }
                else {
                    column.setFilterValue(currentFilterValue); // perform new filter render
                }
            }
        }
        onSelect?.();
    };
    const filterOption = !!header && columnDef ? columnDef._filterFn : globalFilterFn;
    return (_jsx(Menu.Dropdown, { children: (header && column && columnDef
            ? (columnDef.renderColumnFilterModeMenuItems?.({
                column: column,
                internalFilterOptions,
                onSelectFilterMode: handleSelectFilterMode,
                table,
            }) ??
                renderColumnFilterModeMenuItems?.({
                    column: column,
                    internalFilterOptions,
                    onSelectFilterMode: handleSelectFilterMode,
                    table,
                }))
            : renderGlobalFilterModeMenuItems?.({
                internalFilterOptions,
                onSelectFilterMode: handleSelectFilterMode,
                table,
            })) ??
            internalFilterOptions.map(({ divider, label, option, symbol }, index) => (_jsxs(Fragment, { children: [_jsx(Menu.Item, { color: option === filterOption ? 'blue' : undefined, leftSection: _jsx("span", { className: classes.symbol, children: symbol }), onClick: () => handleSelectFilterMode(option), value: option, children: label }), divider && _jsx(Menu.Divider, {})] }, index))) }));
};
//# sourceMappingURL=MRT_FilterOptionMenu.js.map