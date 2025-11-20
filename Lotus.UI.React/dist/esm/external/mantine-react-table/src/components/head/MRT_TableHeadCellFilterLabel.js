import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_TableHeadCellFilterLabel.module.css';
import { useState } from 'react';
import { ActionIcon, Popover, Tooltip, Transition, } from '@mantine/core';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { localizedFilterOption } from '../../fns/filterFns';
import { dataVariable } from '../../utils/style.utils';
export const MRT_TableHeadCellFilterLabel = ({ header, table, ...rest }) => {
    const { options: { columnFilterDisplayMode, icons: { IconFilter }, localization, }, refs: { filterInputRefs }, setShowColumnFilters, } = table;
    const { column } = header;
    const { columnDef } = column;
    const filterValue = column.getFilterValue();
    const [popoverOpened, setPopoverOpened] = useState(false);
    const isFilterActive = (Array.isArray(filterValue) && filterValue.some(Boolean)) ||
        (!!filterValue && !Array.isArray(filterValue));
    const isRangeFilter = columnDef.filterVariant === 'range' ||
        columnDef.filterVariant === 'date-range' ||
        ['between', 'betweenInclusive', 'inNumberRange'].includes(columnDef._filterFn);
    const currentFilterOption = columnDef._filterFn;
    const filterValueFn = columnDef.filterTooltipValueFn || ((value) => value);
    const filterTooltip = columnFilterDisplayMode === 'popover' && !isFilterActive
        ? localization.filterByColumn?.replace('{column}', String(columnDef.header))
        : localization.filteringByColumn
            .replace('{column}', String(columnDef.header))
            .replace('{filterType}', localizedFilterOption(localization, currentFilterOption))
            .replace('{filterValue}', `"${Array.isArray(column.getFilterValue())
            ? column.getFilterValue()
                .map((v) => filterValueFn(v))
                .join(`" ${isRangeFilter ? localization.and : localization.or} "`)
            : filterValueFn(column.getFilterValue())}"`)
            .replace('" "', '');
    return (_jsx(_Fragment, { children: _jsxs(Popover, { keepMounted: columnDef.filterVariant === 'range-slider', onChange: setPopoverOpened, onClose: () => setPopoverOpened(false), opened: popoverOpened, position: "top", shadow: "xl", width: 360, withinPortal: true, children: [_jsx(Transition, { mounted: columnFilterDisplayMode === 'popover' ||
                        (!!column.getFilterValue() && !isRangeFilter) ||
                        (isRangeFilter &&
                            (!!column.getFilterValue()?.[0] ||
                                !!column.getFilterValue()?.[1])), transition: "scale", children: () => (_jsx(Popover.Target, { children: _jsx(Tooltip, { disabled: popoverOpened, label: filterTooltip, multiline: true, w: filterTooltip.length > 40 ? 300 : undefined, withinPortal: true, children: _jsx(ActionIcon, { "aria-label": filterTooltip, className: clsx('mrt-table-head-cell-filter-label-icon', classes.root), size: 18, ...dataVariable('active', isFilterActive), onClick: (event) => {
                                    event.stopPropagation();
                                    if (columnFilterDisplayMode === 'popover') {
                                        setPopoverOpened((opened) => !opened);
                                    }
                                    else {
                                        setShowColumnFilters(true);
                                    }
                                    setTimeout(() => {
                                        const input = filterInputRefs.current[`${column.id}-0`];
                                        input?.focus();
                                        input?.select();
                                    }, 100);
                                }, ...rest, children: _jsx(IconFilter, { size: "100%" }) }) }) })) }), columnFilterDisplayMode === 'popover' && (_jsx(Popover.Dropdown, { onClick: (event) => event.stopPropagation(), onKeyDown: (event) => event.key === 'Enter' && setPopoverOpened(false), onMouseDown: (event) => event.stopPropagation(), children: _jsx(MRT_TableHeadCellFilterContainer, { header: header, table: table }) }))] }) }));
};
//# sourceMappingURL=MRT_TableHeadCellFilterLabel.js.map