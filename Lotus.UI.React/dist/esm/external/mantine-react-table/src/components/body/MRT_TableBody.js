import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_TableBody.module.css';
import { memo, useMemo } from 'react';
import { TableTbody, } from '@mantine/core';
import { MRT_TableBodyEmptyRow } from './MRT_TableBodyEmptyRow';
import { Memo_MRT_TableBodyRow, MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMRT_Rows } from '../../hooks/useMRT_Rows';
import { useMRT_RowVirtualizer } from '../../hooks/useMRT_RowVirtualizer';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_TableBody = ({ columnVirtualizer, table, tableProps, ...rest }) => {
    const { getBottomRows, getIsSomeRowsPinned, getRowModel, getState, getTopRows, options: { enableStickyFooter, enableStickyHeader, layoutMode, mantineTableBodyProps, memoMode, renderDetailPanel, rowPinningDisplayMode, }, refs: { tableFooterRef, tableHeadRef }, } = table;
    const { isFullScreen, rowPinning } = getState();
    const tableBodyProps = {
        ...parseFromValuesOrFunc(mantineTableBodyProps, { table }),
        ...rest,
    };
    const tableHeadHeight = ((enableStickyHeader || isFullScreen) &&
        tableHeadRef.current?.clientHeight) ||
        0;
    const tableFooterHeight = (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;
    const pinnedRowIds = useMemo(() => {
        if (!rowPinning.bottom?.length && !rowPinning.top?.length)
            return [];
        return getRowModel()
            .rows.filter((row) => row.getIsPinned())
            .map((r) => r.id);
    }, [rowPinning, getRowModel().rows]);
    const rows = useMRT_Rows(table);
    const rowVirtualizer = useMRT_RowVirtualizer(table, rows);
    const { virtualRows } = rowVirtualizer ?? {};
    const commonRowProps = {
        columnVirtualizer,
        numRows: rows.length,
        table,
        tableProps,
    };
    return (_jsxs(_Fragment, { children: [!rowPinningDisplayMode?.includes('sticky') &&
                getIsSomeRowsPinned('top') && (_jsx(TableTbody, { ...tableBodyProps, __vars: {
                    '--mrt-table-head-height': `${tableHeadHeight}`,
                    ...tableBodyProps?.__vars,
                }, className: clsx(classes.pinned, layoutMode?.startsWith('grid') && classes['root-grid'], tableBodyProps?.className), children: getTopRows().map((row, renderedRowIndex) => {
                    const rowProps = {
                        ...commonRowProps,
                        renderedRowIndex,
                        row,
                    };
                    return memoMode === 'rows' ? (_jsx(Memo_MRT_TableBodyRow, { ...rowProps }, row.id)) : (_jsx(MRT_TableBodyRow, { ...rowProps }, row.id));
                }) })), _jsx(TableTbody, { ...tableBodyProps, __vars: {
                    '--mrt-table-body-height': rowVirtualizer
                        ? `${rowVirtualizer.getTotalSize()}px`
                        : undefined,
                    ...tableBodyProps?.__vars,
                }, className: clsx(classes.root, layoutMode?.startsWith('grid') && classes['root-grid'], !rows.length && classes['root-no-rows'], rowVirtualizer && classes['root-virtualized'], tableBodyProps?.className), children: tableBodyProps?.children ??
                    (!rows.length ? (_jsx(MRT_TableBodyEmptyRow, { ...commonRowProps })) : (_jsx(_Fragment, { children: (virtualRows ?? rows).map((rowOrVirtualRow, renderedRowIndex) => {
                            if (rowVirtualizer) {
                                if (renderDetailPanel) {
                                    if (rowOrVirtualRow.index % 2 === 1) {
                                        return null;
                                    }
                                    else {
                                        renderedRowIndex = rowOrVirtualRow.index / 2;
                                    }
                                }
                                else {
                                    renderedRowIndex = rowOrVirtualRow.index;
                                }
                            }
                            const row = rowVirtualizer
                                ? rows[renderedRowIndex]
                                : rowOrVirtualRow;
                            const props = {
                                ...commonRowProps,
                                pinnedRowIds,
                                renderedRowIndex,
                                row,
                                rowVirtualizer,
                                virtualRow: rowVirtualizer
                                    ? rowOrVirtualRow
                                    : undefined,
                            };
                            const key = `${row.id}-${row.index}`;
                            return memoMode === 'rows' ? (_jsx(Memo_MRT_TableBodyRow, { ...props }, key)) : (_jsx(MRT_TableBodyRow, { ...props }, key));
                        }) }))) }), !rowPinningDisplayMode?.includes('sticky') &&
                getIsSomeRowsPinned('bottom') && (_jsx(TableTbody, { ...tableBodyProps, __vars: {
                    '--mrt-table-footer-height': `${tableFooterHeight}`,
                    ...tableBodyProps?.__vars,
                }, className: clsx(classes.pinned, layoutMode?.startsWith('grid') && classes['root-grid'], tableBodyProps?.className), children: getBottomRows().map((row, renderedRowIndex) => {
                    const props = {
                        ...commonRowProps,
                        renderedRowIndex,
                        row,
                    };
                    return memoMode === 'rows' ? (_jsx(Memo_MRT_TableBodyRow, { ...props }, row.id)) : (_jsx(MRT_TableBodyRow, { ...props }, row.id));
                }) }))] }));
};
export const Memo_MRT_TableBody = memo(MRT_TableBody, (prev, next) => prev.table.options.data === next.table.options.data);
//# sourceMappingURL=MRT_TableBody.js.map