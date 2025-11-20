import { jsx as _jsx } from "react/jsx-runtime";
import { MRT_TableBodyRowGrabHandle } from '../../components/body/MRT_TableBodyRowGrabHandle';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';
export const getMRT_RowDragColumnDef = (tableOptions) => {
    return {
        Cell: ({ row, rowRef, table }) => (_jsx(MRT_TableBodyRowGrabHandle, { row: row, rowRef: rowRef, table: table })),
        grow: false,
        ...defaultDisplayColumnProps({
            header: 'move',
            id: 'mrt-row-drag',
            size: 60,
            tableOptions,
        }),
    };
};
//# sourceMappingURL=getMRT_RowDragColumnDef.js.map