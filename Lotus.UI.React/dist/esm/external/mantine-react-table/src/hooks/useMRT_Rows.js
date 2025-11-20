import { useMemo } from 'react';
import { getMRT_Rows } from '../utils/row.utils';
export const useMRT_Rows = (table) => {
    const { getRowModel, getState, options: { data, enableGlobalFilterRankedResults, positionCreatingRow }, } = table;
    const { creatingRow, expanded, globalFilter, pagination, rowPinning, sorting, } = getState();
    const rows = useMemo(() => getMRT_Rows(table), [
        creatingRow,
        data,
        enableGlobalFilterRankedResults,
        expanded,
        getRowModel().rows,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        positionCreatingRow,
        rowPinning,
        sorting,
    ]);
    return rows;
};
//# sourceMappingURL=useMRT_Rows.js.map