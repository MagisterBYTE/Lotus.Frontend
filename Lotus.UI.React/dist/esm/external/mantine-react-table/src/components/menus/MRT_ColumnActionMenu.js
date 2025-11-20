import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import classes from './MRT_ColumnActionMenu.module.css';
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_ColumnActionMenu = ({ header, table, ...rest }) => {
    const { getState, options: { columnFilterDisplayMode, enableColumnFilters, enableColumnPinning, enableColumnResizing, enableGrouping, enableHiding, enableSorting, enableSortingRemoval, icons: { IconArrowAutofitContent, IconBoxMultiple, IconClearAll, IconColumns, IconDotsVertical, IconEyeOff, IconFilter, IconFilterOff, IconPinned, IconPinnedOff, IconSortAscending, IconSortDescending, }, localization, mantineColumnActionsButtonProps, renderColumnActionsMenuItems, }, refs: { filterInputRefs }, setColumnOrder, setColumnSizingInfo, setShowColumnFilters, toggleAllColumnsVisible, } = table;
    const { column } = header;
    const { columnDef } = column;
    const { columnSizing, columnVisibility } = getState();
    const arg = { column, table };
    const actionIconProps = {
        ...parseFromValuesOrFunc(mantineColumnActionsButtonProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineColumnActionsButtonProps, arg),
    };
    const handleClearSort = () => {
        column.clearSorting();
    };
    const handleSortAsc = () => {
        column.toggleSorting(false);
    };
    const handleSortDesc = () => {
        column.toggleSorting(true);
    };
    const handleResetColumnSize = () => {
        setColumnSizingInfo((old) => ({ ...old, isResizingColumn: false }));
        column.resetSize();
    };
    const handleHideColumn = () => {
        column.toggleVisibility(false);
    };
    const handlePinColumn = (pinDirection) => {
        column.pin(pinDirection);
    };
    const handleGroupByColumn = () => {
        column.toggleGrouping();
        setColumnOrder((old) => ['mrt-row-expand', ...old]);
    };
    const handleClearFilter = () => {
        column.setFilterValue('');
    };
    const handleFilterByColumn = () => {
        setShowColumnFilters(true);
        setTimeout(() => filterInputRefs.current[`${column.id}-0`]?.focus(), 100);
    };
    const handleShowAllColumns = () => {
        toggleAllColumnsVisible(true);
    };
    const internalColumnMenuItems = (_jsxs(_Fragment, { children: [enableSorting && column.getCanSort() && (_jsxs(_Fragment, { children: [enableSortingRemoval !== false && (_jsx(Menu.Item, { disabled: !column.getIsSorted(), leftSection: _jsx(IconClearAll, {}), onClick: handleClearSort, children: localization.clearSort })), _jsx(Menu.Item, { disabled: column.getIsSorted() === 'asc', leftSection: _jsx(IconSortAscending, {}), onClick: handleSortAsc, children: localization.sortByColumnAsc?.replace('{column}', String(columnDef.header)) }), _jsx(Menu.Item, { disabled: column.getIsSorted() === 'desc', leftSection: _jsx(IconSortDescending, {}), onClick: handleSortDesc, children: localization.sortByColumnDesc?.replace('{column}', String(columnDef.header)) }), (enableColumnFilters || enableGrouping || enableHiding) && (_jsx(Menu.Divider, {}, 3))] })), enableColumnFilters &&
                columnFilterDisplayMode !== 'popover' &&
                column.getCanFilter() && (_jsxs(_Fragment, { children: [_jsx(Menu.Item, { disabled: !column.getFilterValue(), leftSection: _jsx(IconFilterOff, {}), onClick: handleClearFilter, children: localization.clearFilter }), _jsx(Menu.Item, { leftSection: _jsx(IconFilter, {}), onClick: handleFilterByColumn, children: localization.filterByColumn?.replace('{column}', String(columnDef.header)) }), (enableGrouping || enableHiding) && _jsx(Menu.Divider, {}, 2)] })), enableGrouping && column.getCanGroup() && (_jsxs(_Fragment, { children: [_jsx(Menu.Item, { leftSection: _jsx(IconBoxMultiple, {}), onClick: handleGroupByColumn, children: localization[column.getIsGrouped() ? 'ungroupByColumn' : 'groupByColumn']?.replace('{column}', String(columnDef.header)) }), enableColumnPinning && _jsx(Menu.Divider, {})] })), enableColumnPinning && column.getCanPin() && (_jsxs(_Fragment, { children: [_jsx(Menu.Item, { disabled: column.getIsPinned() === 'left' || !column.getCanPin(), leftSection: _jsx(IconPinned, { className: classes.left }), onClick: () => handlePinColumn('left'), children: localization.pinToLeft }), _jsx(Menu.Item, { disabled: column.getIsPinned() === 'right' || !column.getCanPin(), leftSection: _jsx(IconPinned, { className: classes.right }), onClick: () => handlePinColumn('right'), children: localization.pinToRight }), _jsx(Menu.Item, { disabled: !column.getIsPinned(), leftSection: _jsx(IconPinnedOff, {}), onClick: () => handlePinColumn(false), children: localization.unpin }), enableHiding && _jsx(Menu.Divider, {})] })), enableColumnResizing && column.getCanResize() && (_jsx(Menu.Item, { disabled: !columnSizing[column.id], leftSection: _jsx(IconArrowAutofitContent, {}), onClick: handleResetColumnSize, children: localization.resetColumnSize }, 0)), enableHiding && (_jsxs(_Fragment, { children: [_jsx(Menu.Item, { disabled: !column.getCanHide(), leftSection: _jsx(IconEyeOff, {}), onClick: handleHideColumn, children: localization.hideColumn?.replace('{column}', String(columnDef.header)) }, 0), _jsx(Menu.Item, { disabled: !Object.values(columnVisibility).filter((visible) => !visible)
                            .length, leftSection: _jsx(IconColumns, {}), onClick: handleShowAllColumns, children: localization.showAllColumns?.replace('{column}', String(columnDef.header)) }, 1)] }))] }));
    return (_jsxs(Menu, { closeOnItemClick: true, position: "bottom-start", withinPortal: true, ...rest, children: [_jsx(Tooltip, { label: actionIconProps?.title ?? localization.columnActions, openDelay: 1000, withinPortal: true, children: _jsx(Menu.Target, { children: _jsx(ActionIcon, { "aria-label": localization.columnActions, color: "gray", size: "sm", variant: "subtle", ...actionIconProps, children: _jsx(IconDotsVertical, { size: "100%" }) }) }) }), _jsx(Menu.Dropdown, { children: columnDef.renderColumnActionsMenuItems?.({
                    column,
                    internalColumnMenuItems,
                    table,
                }) ??
                    renderColumnActionsMenuItems?.({
                        column,
                        internalColumnMenuItems,
                        table,
                    }) ??
                    internalColumnMenuItems })] }));
};
//# sourceMappingURL=MRT_ColumnActionMenu.js.map