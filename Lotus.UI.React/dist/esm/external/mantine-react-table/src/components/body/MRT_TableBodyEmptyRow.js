import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { useMemo } from 'react';
import { createRow } from '@tanstack/react-table';
import { TableTd, Text } from '@mantine/core';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import classes from './MRT_TableBody.module.css';
export const MRT_TableBodyEmptyRow = ({ table, tableProps, ...commonRowProps }) => {
    const { getState, options: { layoutMode, localization, renderDetailPanel, renderEmptyRowsFallback }, refs: { tablePaperRef } } = table;
    const { columnFilters, globalFilter } = getState();
    const emptyRow = useMemo(() => createRow(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table, 'mrt-row-empty', {}, 0, 0), []);
    const emptyRowProps = {
        ...commonRowProps,
        renderedRowIndex: 0,
        row: emptyRow,
        virtualRow: undefined
    };
    return (_jsxs(MRT_TableBodyRow, { className: clsx('mrt-table-body-row', layoutMode?.startsWith('grid') && classes['empty-row-tr-grid']), table: table, tableProps: tableProps, ...emptyRowProps, children: [renderDetailPanel && (_jsx(TableTd, { className: clsx('mrt-table-body-cell', layoutMode?.startsWith('grid') && classes['empty-row-td-grid']), colSpan: 1, children: _jsx(MRT_ExpandButton, { row: emptyRow, table: table }) })), _jsx("td", { className: clsx('mrt-table-body-cell', layoutMode?.startsWith('grid') && classes['empty-row-td-grid']), colSpan: table.getVisibleLeafColumns().length, children: renderEmptyRowsFallback?.({ table }) ?? (_jsx(Text, { __vars: {
                        '--mrt-paper-width': `${tablePaperRef.current?.clientWidth}`
                    }, className: clsx(classes['empty-row-td-content']), children: globalFilter || columnFilters.length
                        ? localization.noResultsFound
                        : localization.noRecordsToDisplay })) })] }));
};
//# sourceMappingURL=MRT_TableBodyEmptyRow.js.map