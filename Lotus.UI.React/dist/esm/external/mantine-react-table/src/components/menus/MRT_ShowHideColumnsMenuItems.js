import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import classes from './MRT_ShowHideColumnsMenuItems.module.css';
import { useRef, useState, } from 'react';
import { Box, Menu, Switch, Text, Tooltip, useMantineTheme, } from '@mantine/core';
import { reorderColumn } from '../../utils/column.utils';
import { dataVariable, getPrimaryColor } from '../../utils/style.utils';
import { MRT_ColumnPinningButtons } from '../buttons/MRT_ColumnPinningButtons';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
export const MRT_ShowHideColumnsMenuItems = ({ allColumns, column, hoveredColumn, setHoveredColumn, table, }) => {
    const theme = useMantineTheme();
    const { getState, options: { enableColumnOrdering, enableColumnPinning, enableHiding, localization, }, setColumnOrder, } = table;
    const { columnOrder } = getState();
    const { columnDef } = column;
    const { columnDefType } = columnDef;
    const switchChecked = (columnDefType !== 'group' && column.getIsVisible()) ||
        (columnDefType === 'group' &&
            column.getLeafColumns().some((col) => col.getIsVisible()));
    const handleToggleColumnHidden = (column) => {
        if (columnDefType === 'group') {
            column?.columns?.forEach?.((childColumn) => {
                childColumn.toggleVisibility(!switchChecked);
            });
        }
        else {
            column.toggleVisibility();
        }
    };
    const menuItemRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const handleDragStart = (e) => {
        setIsDragging(true);
        e.dataTransfer.setDragImage(menuItemRef.current, 0, 0);
    };
    const handleDragEnd = (_e) => {
        setIsDragging(false);
        setHoveredColumn(null);
        if (hoveredColumn) {
            setColumnOrder(reorderColumn(column, hoveredColumn, columnOrder));
        }
    };
    const handleDragEnter = (_e) => {
        if (!isDragging && columnDef.enableColumnOrdering !== false) {
            setHoveredColumn(column);
        }
    };
    if (!columnDef.header || columnDef.visibleInShowHideMenu === false) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(Menu.Item, { className: classes.root, component: "span", onDragEnter: handleDragEnter, ref: menuItemRef, style: {
                    '--_column-depth': `${(column.depth + 0.5) * 2}rem`,
                    '--_hover-color': getPrimaryColor(theme),
                }, ...dataVariable('dragging', isDragging), ...dataVariable('order-hovered', hoveredColumn?.id === column.id), children: _jsxs(Box, { className: classes.menu, children: [columnDefType !== 'group' &&
                            enableColumnOrdering &&
                            !allColumns.some((col) => col.columnDef.columnDefType === 'group') &&
                            (columnDef.enableColumnOrdering !== false ? (_jsx(MRT_GrabHandleButton, { onDragEnd: handleDragEnd, onDragStart: handleDragStart, table: table })) : (_jsx(Box, { className: classes.grab }))), enableColumnPinning &&
                            (column.getCanPin() ? (_jsx(MRT_ColumnPinningButtons, { column: column, table: table })) : (_jsx(Box, { className: classes.pin }))), enableHiding ? (_jsx(Tooltip, { label: localization.toggleVisibility, openDelay: 1000, withinPortal: true, children: _jsx(Switch, { checked: switchChecked, className: classes.switch, disabled: !column.getCanHide(), label: columnDef.header, onChange: () => handleToggleColumnHidden(column) }) })) : (_jsx(Text, { className: classes.header, children: columnDef.header }))] }) }), column.columns?.map((c, i) => (_jsx(MRT_ShowHideColumnsMenuItems, { allColumns: allColumns, column: c, hoveredColumn: hoveredColumn, setHoveredColumn: setHoveredColumn, table: table }, `${i}-${c.id}`)))] }));
};
//# sourceMappingURL=MRT_ShowHideColumnsMenuItems.js.map