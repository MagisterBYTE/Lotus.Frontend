import { jsx as _jsx } from "react/jsx-runtime";
import { Highlight } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
const allowedTypes = ['string', 'number'];
const allowedFilterVariants = ['text', 'autocomplete'];
export const MRT_TableBodyCellValue = ({ cell, renderedColumnIndex = 0, renderedRowIndex = 0, table }) => {
    const { getState, options: { enableFilterMatchHighlighting, mantineHighlightProps = { size: 'sm' } } } = table;
    const { column, row } = cell;
    const { columnDef } = column;
    const { globalFilter, globalFilterFn } = getState();
    const filterValue = column.getFilterValue();
    const highlightProps = parseFromValuesOrFunc(mantineHighlightProps, {
        cell,
        column,
        row,
        table
    });
    let renderedCellValue = cell.getIsAggregated() && columnDef.AggregatedCell
        ? columnDef.AggregatedCell({
            cell,
            column,
            row,
            table
        })
        : row.getIsGrouped() && !cell.getIsGrouped()
            ? null
            : cell.getIsGrouped() && columnDef.GroupedCell
                ? columnDef.GroupedCell({
                    cell,
                    column,
                    row,
                    table
                })
                : undefined;
    const isGroupedValue = renderedCellValue !== undefined;
    if (!isGroupedValue) {
        renderedCellValue = cell.renderValue();
    }
    if (enableFilterMatchHighlighting &&
        columnDef.enableFilterMatchHighlighting !== false &&
        renderedCellValue &&
        allowedTypes.includes(typeof renderedCellValue) &&
        ((filterValue &&
            allowedTypes.includes(typeof filterValue) &&
            allowedFilterVariants.includes(columnDef.filterVariant)) ||
            (globalFilter &&
                allowedTypes.includes(typeof globalFilter) &&
                column.getCanGlobalFilter()))) {
        let highlight = (column.getFilterValue() ??
            globalFilter ??
            '').toString();
        if ((filterValue ? columnDef._filterFn : globalFilterFn) === 'fuzzy') {
            highlight = highlight.split(' ');
        }
        renderedCellValue = (_jsx(Highlight, { color: 'yellow.3', highlight: highlight, ...highlightProps, children: renderedCellValue?.toString() }));
    }
    if (columnDef.Cell && !isGroupedValue) {
        renderedCellValue = columnDef.Cell({
            cell,
            column,
            renderedCellValue,
            renderedColumnIndex,
            renderedRowIndex,
            row,
            table
        });
    }
    return renderedCellValue;
};
//# sourceMappingURL=MRT_TableBodyCellValue.js.map