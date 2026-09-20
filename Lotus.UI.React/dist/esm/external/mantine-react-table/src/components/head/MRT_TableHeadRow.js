import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { Box, TableTr } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import classes from './MRT_TableHeadRow.module.css';
export const MRT_TableHeadRow = ({ columnVirtualizer, headerGroup, table, ...rest }) => {
    const { state, options: { enableStickyHeader, layoutMode, mantineTableHeadRowProps }, } = table;
    const { isFullScreen } = state;
    const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } = columnVirtualizer ?? {};
    const tableRowProps = {
        ...parseFromValuesOrFunc(mantineTableHeadRowProps, {
            headerGroup,
            table,
        }),
        ...rest,
    };
    return (_jsxs(TableTr, { ...tableRowProps, className: clsx(classes.root, (enableStickyHeader || isFullScreen) && classes.sticky, layoutMode?.startsWith('grid') && classes['layout-mode-grid'], tableRowProps?.className), children: [virtualPaddingLeft ? (_jsx(Box, { component: "th", display: "flex", w: virtualPaddingLeft })) : null, (virtualColumns ?? headerGroup.headers).map((headerOrVirtualHeader, renderedHeaderIndex) => {
                let header = headerOrVirtualHeader;
                if (columnVirtualizer) {
                    renderedHeaderIndex = headerOrVirtualHeader
                        .index;
                    header = headerGroup.headers[renderedHeaderIndex];
                }
                return (_jsx(MRT_TableHeadCell, { columnVirtualizer: columnVirtualizer, header: header, renderedHeaderIndex: renderedHeaderIndex, table: table }, header.id));
            }), virtualPaddingRight ? (_jsx(Box, { component: "th", display: "flex", w: virtualPaddingRight })) : null] }));
};
//# sourceMappingURL=MRT_TableHeadRow.js.map