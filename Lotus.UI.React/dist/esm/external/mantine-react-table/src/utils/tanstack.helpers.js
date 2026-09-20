import { constructRow as _createRow, flexRender as _flexRender, } from '@tanstack/react-table';
import { getAllLeafColumnDefs, getColumnId } from './column.utils';
export const flexRender = _flexRender;
/**
 * A helper utility for creating MRT column definitions with type inference
 * for each individual column's `TValue`. Mirrors v9's `createColumnHelper`
 * surface (`accessor`, `columns`, `display`, `group`) but bound to MRT's
 * column-def shape (extra MRT-specific props, `StockFeatures` pre-bound).
 *
 * From a JavaScript perspective, `display` / `group` / `columns` are identity
 * functions — they exist purely to anchor TypeScript inference.
 *
 * @example
 * ```tsx
 * const helper = createMRTColumnHelper<Person>()
 * const columns = helper.columns([
 *   helper.accessor('firstName', { header: 'First' }),
 *   helper.accessor((row) => row.lastName, { id: 'lastName' }),
 *   helper.display({ id: 'actions', header: 'Actions' }),
 * ])
 * ```
 */
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
        columns: (columns) => columns,
        display: (column) => column,
        group: (column) => column,
    };
}
export const createRow = (table, originalRow, rowIndex = -1, depth = 0, subRows, parentId) => _createRow(table, 'mrt-row-create', originalRow ??
    Object.assign({}, ...getAllLeafColumnDefs(table.options.columns).map((col) => ({
        [getColumnId(col)]: '',
    }))), rowIndex, depth, subRows, parentId);
//# sourceMappingURL=tanstack.helpers.js.map