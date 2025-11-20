import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_TableDetailPanel.module.css';
import { Collapse, TableTd, TableTr } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';
export const MRT_TableDetailPanel = ({ parentRowRef, renderedRowIndex = 0, row, rowVirtualizer, striped, table, virtualRow, ...rest }) => {
    const { getState, getVisibleLeafColumns, options: { layoutMode, mantineDetailPanelProps, mantineTableBodyRowProps, renderDetailPanel, }, } = table;
    const { isLoading } = getState();
    const tableRowProps = parseFromValuesOrFunc(mantineTableBodyRowProps, {
        isDetailPanel: true,
        row,
        table,
    });
    const tableCellProps = {
        ...parseFromValuesOrFunc(mantineDetailPanelProps, {
            row,
            table,
        }),
        ...rest,
    };
    const internalEditComponents = row
        .getAllCells()
        .filter((cell) => cell.column.columnDef.columnDefType === 'data')
        .map((cell) => (_jsx(MRT_EditCellTextInput, { cell: cell, table: table }, cell.id)));
    const DetailPanel = !isLoading &&
        row.getIsExpanded() &&
        renderDetailPanel?.({ internalEditComponents, row, table });
    return (_jsx(TableTr, { "data-index": renderDetailPanel ? renderedRowIndex * 2 + 1 : renderedRowIndex, "data-striped": striped, ref: (node) => {
            if (node) {
                rowVirtualizer?.measureElement?.(node);
            }
        }, ...tableRowProps, __vars: {
            '--mrt-parent-row-height': virtualRow
                ? `${parentRowRef.current?.getBoundingClientRect()?.height}px`
                : undefined,
            '--mrt-virtual-row-start': virtualRow
                ? `${virtualRow.start}px`
                : undefined,
            ...tableRowProps?.__vars,
        }, className: clsx('mantine-Table-tr-detail-panel', classes.root, layoutMode?.startsWith('grid') && classes['root-grid'], virtualRow && classes['root-virtual-row'], tableRowProps?.className), children: _jsx(TableTd, { colSpan: getVisibleLeafColumns().length, component: "td", ...tableCellProps, __vars: {
                '--mrt-inner-width': `${table.getTotalSize()}px`,
            }, className: clsx('mantine-Table-td-detail-panel', classes.inner, layoutMode?.startsWith('grid') && classes['inner-grid'], row.getIsExpanded() && classes['inner-expanded'], virtualRow && classes['inner-virtual']), p: row.getIsExpanded() && DetailPanel ? 'md' : 0, children: rowVirtualizer ? (row.getIsExpanded() && DetailPanel) : (_jsx(Collapse, { in: row.getIsExpanded(), children: DetailPanel })) }) }));
};
//# sourceMappingURL=MRT_TableDetailPanel.js.map