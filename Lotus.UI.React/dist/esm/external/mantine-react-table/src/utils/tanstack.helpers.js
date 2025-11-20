import { createRow as _createRow, flexRender as _flexRender, } from '@tanstack/react-table';
import { getAllLeafColumnDefs, getColumnId } from './column.utils';
export const flexRender = _flexRender;
export function createMRTColumnHelper() {
    return {
        accessor: (accessor, column) => {
            return typeof accessor === 'function'
                ? {
                    ...column,
                    accessorFn: accessor,
                }
                : {
                    ...column,
                    accessorKey: accessor,
                };
        },
        display: (column) => column,
        group: (column) => column,
    };
}
export const createRow = (table, originalRow, rowIndex = -1, depth = 0, subRows, parentId) => _createRow(table, 'mrt-row-create', originalRow ??
    Object.assign({}, ...getAllLeafColumnDefs(table.options.columns).map((col) => ({
        [getColumnId(col)]: '',
    }))), rowIndex, depth, subRows, parentId);
//# sourceMappingURL=tanstack.helpers.js.map