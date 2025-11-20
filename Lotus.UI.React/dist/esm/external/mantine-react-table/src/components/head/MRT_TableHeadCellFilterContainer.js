import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classes from './MRT_TableHeadCellFilterContainer.module.css';
import { ActionIcon, Collapse, Flex, Menu, Text, Tooltip, } from '@mantine/core';
import { localizedFilterOption } from '../../fns/filterFns';
import { MRT_FilterCheckbox } from '../inputs/MRT_FilterCheckbox';
import { MRT_FilterRangeFields } from '../inputs/MRT_FilterRangeFields';
import { MRT_FilterRangeSlider } from '../inputs/MRT_FilterRangeSlider';
import { MRT_FilterTextInput } from '../inputs/MRT_FilterTextInput';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
export const MRT_TableHeadCellFilterContainer = ({ header, table, ...rest }) => {
    const { getState, options: { columnFilterDisplayMode, columnFilterModeOptions, enableColumnFilterModes, icons: { IconFilterCog }, localization, }, refs: { filterInputRefs }, } = table;
    const { showColumnFilters } = getState();
    const { column } = header;
    const { columnDef } = column;
    const currentFilterOption = columnDef._filterFn;
    const allowedColumnFilterOptions = columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;
    const showChangeModeButton = enableColumnFilterModes &&
        columnDef.enableColumnFilterModes !== false &&
        (allowedColumnFilterOptions === undefined ||
            !!allowedColumnFilterOptions?.length);
    return (_jsx(Collapse, { in: showColumnFilters || columnFilterDisplayMode === 'popover', children: _jsxs(Flex, { direction: "column", ...rest, children: [_jsxs(Flex, { align: "flex-end", children: [columnDef.filterVariant === 'checkbox' ? (_jsx(MRT_FilterCheckbox, { column: column, table: table })) : columnDef.filterVariant === 'range-slider' ? (_jsx(MRT_FilterRangeSlider, { header: header, table: table })) : ['date-range', 'range'].includes(columnDef.filterVariant ?? '') ||
                            ['between', 'betweenInclusive', 'inNumberRange'].includes(columnDef._filterFn) ? (_jsx(MRT_FilterRangeFields, { header: header, table: table })) : (_jsx(MRT_FilterTextInput, { header: header, table: table })), showChangeModeButton && (_jsxs(Menu, { withinPortal: columnFilterDisplayMode !== 'popover', children: [_jsx(Tooltip, { label: localization.changeFilterMode, position: "bottom-start", withinPortal: true, children: _jsx(Menu.Target, { children: _jsx(ActionIcon, { "aria-label": localization.changeFilterMode, color: "gray", size: "md", variant: "subtle", children: _jsx(IconFilterCog, {}) }) }) }), _jsx(MRT_FilterOptionMenu, { header: header, onSelect: () => setTimeout(() => filterInputRefs.current[`${column.id}-0`]?.focus(), 100), table: table })] }))] }), showChangeModeButton ? (_jsx(Text, { c: "dimmed", className: classes['filter-mode-label'], component: "label", children: localization.filterMode.replace('{filterType}', localizedFilterOption(localization, currentFilterOption)) })) : null] }) }));
};
//# sourceMappingURL=MRT_TableHeadCellFilterContainer.js.map