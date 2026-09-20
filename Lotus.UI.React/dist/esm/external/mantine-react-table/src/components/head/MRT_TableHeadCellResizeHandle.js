import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { Box } from '@mantine/core';
import classes from './MRT_TableHeadCellResizeHandle.module.css';
export const MRT_TableHeadCellResizeHandle = ({ header, table, ...rest }) => {
    const { state, options: { columnResizeDirection, columnResizeMode }, setColumnResizing, } = table;
    const { density } = state;
    const { column } = header;
    const handler = header.getResizeHandler();
    const offset = column.getIsResizing() && columnResizeMode === 'onEnd'
        ? `translateX(${(columnResizeDirection === 'rtl' ? -1 : 1) *
            (state.columnResizing.deltaOffset ?? 0)}px)`
        : undefined;
    return (_jsx(Box, { onDoubleClick: () => {
            setColumnResizing((old) => ({
                ...old,
                isResizingColumn: false,
            }));
            column.resetSize();
        }, onMouseDown: handler, onTouchStart: handler, role: "separator", ...rest, __vars: { '--mrt-transform': offset, ...rest.__vars }, className: clsx('mrt-table-head-cell-resize-handle', classes.root, classes[`root-${columnResizeDirection}`], !header.subHeaders.length &&
            columnResizeMode === 'onChange' &&
            classes['root-hide'], density, rest.className) }));
};
//# sourceMappingURL=MRT_TableHeadCellResizeHandle.js.map