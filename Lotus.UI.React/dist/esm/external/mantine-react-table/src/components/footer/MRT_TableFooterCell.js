import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { TableTh, useDirection } from '@mantine/core';
import { parseCSSVarId } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import classes from './MRT_TableFooterCell.module.css';
export const MRT_TableFooterCell = ({ footer, renderedColumnIndex, table, ...rest }) => {
    const direction = useDirection();
    const { options: { enableColumnPinning, layoutMode, mantineTableFooterCellProps }, } = table;
    const { column } = footer;
    const { columnDef } = column;
    const { columnDefType } = columnDef;
    const isColumnPinned = enableColumnPinning &&
        columnDef.columnDefType !== 'group' &&
        column.getIsPinned();
    const args = { column, table };
    const tableCellProps = {
        ...parseFromValuesOrFunc(mantineTableFooterCellProps, args),
        ...parseFromValuesOrFunc(columnDef.mantineTableFooterCellProps, args),
        ...rest,
    };
    const widthStyles = {
        minWidth: `max(calc(var(--header-${parseCSSVarId(footer?.id)}-size) * 1px), ${columnDef.minSize ?? 30}px)`,
        width: `calc(var(--header-${parseCSSVarId(footer.id)}-size) * 1px)`,
    };
    if (layoutMode === 'grid') {
        widthStyles.flex = `${[0, false].includes(columnDef.grow)
            ? 0
            : `var(--header-${parseCSSVarId(footer.id)}-size)`} 0 auto`;
    }
    else if (layoutMode === 'grid-no-grow') {
        widthStyles.flex = `${+(columnDef.grow || 0)} 0 auto`;
    }
    return (_jsx(TableTh, { colSpan: footer.colSpan, "data-column-pinned": isColumnPinned || undefined, "data-first-end-pinned": (isColumnPinned === 'end' && column.getIsFirstColumn(isColumnPinned)) ||
            undefined, "data-index": renderedColumnIndex, "data-last-start-pinned": (isColumnPinned === 'start' &&
            column.getIsLastColumn(isColumnPinned)) ||
            undefined, ...tableCellProps, __vars: {
            '--mrt-cell-align': tableCellProps.align ??
                (columnDefType === 'group'
                    ? 'center'
                    : direction.dir === 'rtl'
                        ? 'right'
                        : 'left'),
            '--mrt-table-cell-start': isColumnPinned === 'start'
                ? `${column.getStart(isColumnPinned)}`
                : undefined,
            '--mrt-table-cell-end': isColumnPinned === 'end'
                ? `${column.getAfter(isColumnPinned)}`
                : undefined,
            ...tableCellProps?.__vars,
        }, className: clsx(classes.root, layoutMode?.startsWith('grid') && classes.grid, columnDefType === 'group' && classes.group, tableCellProps?.className), style: (theme) => ({
            ...widthStyles,
            ...parseFromValuesOrFunc(tableCellProps.style, theme),
        }), children: tableCellProps.children ??
            (footer.isPlaceholder
                ? null
                : (parseFromValuesOrFunc(columnDef.Footer, {
                    column,
                    footer,
                    table,
                }) ??
                    columnDef.footer ??
                    null)) }));
};
//# sourceMappingURL=MRT_TableFooterCell.js.map