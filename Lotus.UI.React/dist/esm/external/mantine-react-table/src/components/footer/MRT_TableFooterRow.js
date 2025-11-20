import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_TableFooterRow.module.css';
import { Box, TableTr } from '@mantine/core';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_TableFooterRow = ({ columnVirtualizer, footerGroup, table, ...rest }) => {
    const { options: { layoutMode, mantineTableFooterRowProps }, } = table;
    const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } = columnVirtualizer ?? {};
    // if no content in row, skip row
    if (!footerGroup.headers?.some((header) => (typeof header.column.columnDef.footer === 'string' &&
        !!header.column.columnDef.footer) ||
        header.column.columnDef.Footer)) {
        return null;
    }
    const tableRowProps = {
        ...parseFromValuesOrFunc(mantineTableFooterRowProps, {
            footerGroup,
            table,
        }),
        ...rest,
    };
    return (_jsxs(TableTr, { className: clsx(classes.root, layoutMode?.startsWith('grid') && classes['layout-mode-grid']), ...tableRowProps, children: [virtualPaddingLeft ? (_jsx(Box, { component: "th", display: "flex", w: virtualPaddingLeft })) : null, (virtualColumns ?? footerGroup.headers).map((footerOrVirtualFooter, renderedColumnIndex) => {
                let footer = footerOrVirtualFooter;
                if (columnVirtualizer) {
                    renderedColumnIndex = footerOrVirtualFooter
                        .index;
                    footer = footerGroup.headers[renderedColumnIndex];
                }
                return (_jsx(MRT_TableFooterCell, { footer: footer, renderedColumnIndex: renderedColumnIndex, table: table }, footer.id));
            }), virtualPaddingRight ? (_jsx(Box, { component: "th", display: "flex", w: virtualPaddingRight })) : null] }));
};
//# sourceMappingURL=MRT_TableFooterRow.js.map