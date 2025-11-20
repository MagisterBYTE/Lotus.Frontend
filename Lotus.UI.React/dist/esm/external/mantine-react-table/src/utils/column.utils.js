export const getColumnId = (columnDef) => columnDef.id ?? columnDef.accessorKey?.toString?.() ?? columnDef.header;
export const getAllLeafColumnDefs = (columns) => {
    const allLeafColumnDefs = [];
    const getLeafColumns = (cols) => {
        cols.forEach((col) => {
            if (col.columns) {
                getLeafColumns(col.columns);
            }
            else {
                allLeafColumnDefs.push(col);
            }
        });
    };
    getLeafColumns(columns);
    return allLeafColumnDefs;
};
export const prepareColumns = ({ columnDefs, tableOptions, }) => {
    const { aggregationFns = {}, defaultDisplayColumn, filterFns = {}, sortingFns = {}, state: { columnFilterFns = {} } = {}, } = tableOptions;
    return columnDefs.map((columnDef) => {
        //assign columnId
        if (!columnDef.id)
            columnDef.id = getColumnId(columnDef);
        //assign columnDefType
        if (!columnDef.columnDefType)
            columnDef.columnDefType = 'data';
        if (columnDef.columns?.length) {
            columnDef.columnDefType = 'group';
            //recursively prepare columns if this is a group column
            columnDef.columns = prepareColumns({
                columnDefs: columnDef.columns,
                tableOptions,
            });
        }
        else if (columnDef.columnDefType === 'data') {
            //assign aggregationFns if multiple aggregationFns are provided
            if (Array.isArray(columnDef.aggregationFn)) {
                const aggFns = columnDef.aggregationFn;
                columnDef.aggregationFn = (columnId, leafRows, childRows) => aggFns.map((fn) => aggregationFns[fn]?.(columnId, leafRows, childRows));
            }
            //assign filterFns
            if (Object.keys(filterFns).includes(columnFilterFns[columnDef.id])) {
                columnDef.filterFn =
                    filterFns[columnFilterFns[columnDef.id]] ?? filterFns.fuzzy;
                columnDef._filterFn =
                    columnFilterFns[columnDef.id];
            }
            //assign sortingFns
            if (Object.keys(sortingFns).includes(columnDef.sortingFn)) {
                // @ts-ignore
                columnDef.sortingFn = sortingFns[columnDef.sortingFn];
            }
        }
        else if (columnDef.columnDefType === 'display') {
            columnDef = {
                ...defaultDisplayColumn,
                ...columnDef,
            };
        }
        return columnDef;
    });
};
export const reorderColumn = (draggedColumn, targetColumn, columnOrder) => {
    if (draggedColumn.getCanPin()) {
        draggedColumn.pin(targetColumn.getIsPinned());
    }
    const newColumnOrder = [...columnOrder];
    newColumnOrder.splice(newColumnOrder.indexOf(targetColumn.id), 0, newColumnOrder.splice(newColumnOrder.indexOf(draggedColumn.id), 1)[0]);
    return newColumnOrder;
};
export const getDefaultColumnFilterFn = (columnDef) => {
    const { filterVariant } = columnDef;
    if (filterVariant === 'multi-select')
        return 'arrIncludesSome';
    if (filterVariant?.includes('range'))
        return 'betweenInclusive';
    if (['checkbox', 'date', 'select'].includes(filterVariant || ''))
        return 'equals';
    return 'fuzzy';
};
//# sourceMappingURL=column.utils.js.map