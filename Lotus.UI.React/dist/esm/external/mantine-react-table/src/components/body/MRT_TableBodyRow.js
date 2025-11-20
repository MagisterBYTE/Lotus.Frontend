import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_TableBodyRow.module.css';
import { memo, useMemo, useRef } from 'react';
import { Box, TableTr, } from '@mantine/core';
import { Memo_MRT_TableBodyCell, MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { getIsRowSelected } from '../../utils/row.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_TableBodyRow = ({ children, columnVirtualizer, numRows, pinnedRowIds, renderedRowIndex = 0, row, rowVirtualizer, table, tableProps, virtualRow, ...rest }) => {
    const { getState, options: { enableRowOrdering, enableRowPinning, enableStickyFooter, enableStickyHeader, layoutMode, mantineTableBodyRowProps, memoMode, renderDetailPanel, rowPinningDisplayMode, }, refs: { tableFooterRef, tableHeadRef }, setHoveredRow, } = table;
    const { density, draggingColumn, draggingRow, editingCell, editingRow, hoveredRow, isFullScreen, rowPinning, } = getState();
    const visibleCells = row.getVisibleCells();
    const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } = columnVirtualizer ?? {};
    const isRowSelected = getIsRowSelected({ row, table });
    const isRowPinned = enableRowPinning && row.getIsPinned();
    const isRowStickyPinned = isRowPinned && rowPinningDisplayMode?.includes('sticky') && 'sticky';
    const isDraggingRow = draggingRow?.id === row.id;
    const isHoveredRow = hoveredRow?.id === row.id;
    const tableRowProps = {
        ...parseFromValuesOrFunc(mantineTableBodyRowProps, {
            renderedRowIndex,
            row,
            table,
        }),
        ...rest,
    };
    const [bottomPinnedIndex, topPinnedIndex] = useMemo(() => {
        if (!enableRowPinning ||
            !isRowStickyPinned ||
            !pinnedRowIds ||
            !row.getIsPinned())
            return [];
        return [
            [...pinnedRowIds].reverse().indexOf(row.id),
            pinnedRowIds.indexOf(row.id),
        ];
    }, [pinnedRowIds, rowPinning]);
    const tableHeadHeight = ((enableStickyHeader || isFullScreen) &&
        tableHeadRef.current?.clientHeight) ||
        0;
    const tableFooterHeight = (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;
    const defaultRowHeightByDensity = {
        lg: 61,
        md: 53,
        sm: 45,
        xl: 69,
        xs: 37,
    };
    const rowHeight = 
    // @ts-ignore
    parseInt(tableRowProps?.style?.height, 10) ||
        (defaultRowHeightByDensity[density] ?? defaultRowHeightByDensity['md']);
    const handleDragEnter = (_e) => {
        if (enableRowOrdering && draggingRow) {
            setHoveredRow(row);
        }
    };
    const rowRef = useRef(null);
    let striped = tableProps.striped;
    if (striped) {
        if (striped === true) {
            striped = 'odd';
        }
        if (striped === 'odd' && renderedRowIndex % 2 !== 0) {
            striped = false;
        }
        if (striped === 'even' && renderedRowIndex % 2 === 0) {
            striped = false;
        }
    }
    return (_jsxs(_Fragment, { children: [_jsxs(TableTr, { "data-dragging-row": isDraggingRow || undefined, "data-hovered-row-target": isHoveredRow || undefined, "data-index": renderDetailPanel ? renderedRowIndex * 2 : renderedRowIndex, "data-row-pinned": isRowStickyPinned || isRowPinned || undefined, "data-selected": isRowSelected || undefined, "data-striped": striped, onDragEnter: handleDragEnter, ref: (node) => {
                    if (node) {
                        rowRef.current = node;
                        rowVirtualizer?.measureElement(node);
                    }
                }, ...tableRowProps, __vars: {
                    ...tableRowProps?.__vars,
                    '--mrt-pinned-row-bottom': !virtualRow && bottomPinnedIndex !== undefined && isRowPinned
                        ? `${bottomPinnedIndex * rowHeight +
                            (enableStickyFooter ? tableFooterHeight - 1 : 0)}`
                        : undefined,
                    '--mrt-pinned-row-top': virtualRow
                        ? undefined
                        : topPinnedIndex !== undefined && isRowPinned
                            ? `${topPinnedIndex * rowHeight +
                                (enableStickyHeader || isFullScreen ? tableHeadHeight - 1 : 0)}`
                            : undefined,
                    '--mrt-virtual-row-start': virtualRow
                        ? `${virtualRow.start}`
                        : undefined,
                }, className: clsx(classes.root, layoutMode?.startsWith('grid') && classes['root-grid'], virtualRow && classes['root-virtualized'], tableRowProps?.className), children: [virtualPaddingLeft ? (_jsx(Box, { component: "td", display: "flex", w: virtualPaddingLeft })) : null, children
                        ? children
                        : (virtualColumns ?? row.getVisibleCells()).map((cellOrVirtualCell, renderedColumnIndex) => {
                            let cell = cellOrVirtualCell;
                            if (columnVirtualizer) {
                                renderedColumnIndex = cellOrVirtualCell
                                    .index;
                                cell = visibleCells[renderedColumnIndex];
                            }
                            const cellProps = {
                                cell,
                                numRows,
                                renderedColumnIndex,
                                renderedRowIndex,
                                rowRef,
                                table,
                                virtualCell: columnVirtualizer
                                    ? cellOrVirtualCell
                                    : undefined,
                            };
                            return memoMode === 'cells' &&
                                cell.column.columnDef.columnDefType === 'data' &&
                                !draggingColumn &&
                                !draggingRow &&
                                editingCell?.id !== cell.id &&
                                editingRow?.id !== row.id ? (
                            // @ts-expect-error rowRef
                            _jsx(Memo_MRT_TableBodyCell, { ...cellProps }, cell.id)) : (
                            // @ts-expect-error rowRef
                            _jsx(MRT_TableBodyCell, { ...cellProps }, cell.id));
                        }), virtualPaddingRight ? (_jsx(Box, { component: "td", display: "flex", w: virtualPaddingRight })) : null] }), renderDetailPanel && !row.getIsGrouped() && (_jsx(MRT_TableDetailPanel
            // @ts-expect-error rowRef
            , { 
                // @ts-expect-error rowRef
                parentRowRef: rowRef, renderedRowIndex: renderedRowIndex, row: row, rowVirtualizer: rowVirtualizer, striped: striped, table: table, virtualRow: virtualRow }))] }));
};
export const Memo_MRT_TableBodyRow = memo(MRT_TableBodyRow, (prev, next) => prev.row === next.row);
//# sourceMappingURL=MRT_TableBodyRow.js.map