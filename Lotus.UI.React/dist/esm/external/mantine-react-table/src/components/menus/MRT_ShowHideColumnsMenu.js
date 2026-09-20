import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { Button, Flex, Menu } from '@mantine/core';
import { getDefaultColumnOrderIds } from '../../utils/displayColumn.utils';
import { MRT_ShowHideColumnsMenuItems } from './MRT_ShowHideColumnsMenuItems';
import classes from './MRT_ShowHideColumnsMenu.module.css';
export const MRT_ShowHideColumnsMenu = ({ table, }) => {
    const { getAllColumns, getAllLeafColumns, getCenterLeafColumns, getIsAllColumnsVisible, getIsSomeColumnsPinned, getIsSomeColumnsVisible, getStartLeafColumns, getEndLeafColumns, state, options: { enableColumnOrdering, enableColumnPinning, enableHiding, localization, }, } = table;
    const { columnOrder, columnPinning } = state;
    const handleToggleAllColumns = (value) => {
        getAllLeafColumns()
            .filter((col) => col.columnDef.enableHiding !== false)
            .forEach((col) => col.toggleVisibility(value));
    };
    const allColumns = useMemo(() => {
        const columns = getAllColumns();
        if (columnOrder.length > 0 &&
            !columns.some((col) => col.columnDef.columnDefType === 'group')) {
            return [
                ...getStartLeafColumns(),
                ...Array.from(new Set(columnOrder)).map((colId) => getCenterLeafColumns().find((col) => col?.id === colId)),
                ...getEndLeafColumns(),
            ].filter(Boolean);
        }
        return columns;
    }, [
        columnOrder,
        columnPinning,
        getAllColumns(),
        getCenterLeafColumns(),
        getStartLeafColumns(),
        getEndLeafColumns(),
    ]);
    const [hoveredColumn, setHoveredColumn] = useState(null);
    return (_jsxs(Menu.Dropdown, { className: clsx('mrt-show-hide-columns-menu', classes.root), children: [_jsxs(Flex, { className: classes.content, children: [enableHiding && (_jsx(Button, { disabled: !getIsSomeColumnsVisible(), onClick: () => handleToggleAllColumns(false), variant: "subtle", children: localization.hideAll })), enableColumnOrdering && (_jsx(Button, { onClick: () => table.setColumnOrder(getDefaultColumnOrderIds({
                            ...table.options,
                            state,
                        }, true)), variant: "subtle", children: localization.resetOrder })), enableColumnPinning && (_jsx(Button, { disabled: !getIsSomeColumnsPinned(), onClick: () => table.resetColumnPinning(true), variant: "subtle", children: localization.unpinAll })), enableHiding && (_jsx(Button, { disabled: getIsAllColumnsVisible(), onClick: () => handleToggleAllColumns(true), variant: "subtle", children: localization.showAll }))] }), _jsx(Menu.Divider, {}), allColumns.map((column, index) => (_jsx(MRT_ShowHideColumnsMenuItems, { allColumns: allColumns, column: column, hoveredColumn: hoveredColumn, setHoveredColumn: setHoveredColumn, table: table }, `${index}-${column.id}`)))] }));
};
//# sourceMappingURL=MRT_ShowHideColumnsMenu.js.map