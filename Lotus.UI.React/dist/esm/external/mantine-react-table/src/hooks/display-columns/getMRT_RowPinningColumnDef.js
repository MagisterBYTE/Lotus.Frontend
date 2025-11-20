import { jsx as _jsx } from "react/jsx-runtime";
import { MRT_TableBodyRowPinButton } from '../../components/body/MRT_TableBodyRowPinButton';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';
export const getMRT_RowPinningColumnDef = (tableOptions) => {
    return {
        Cell: ({ row, table }) => (_jsx(MRT_TableBodyRowPinButton, { row: row, table: table })),
        grow: false,
        ...defaultDisplayColumnProps({
            header: 'pin',
            id: 'mrt-row-pin',
            size: 60,
            tableOptions,
        }),
    };
};
//# sourceMappingURL=getMRT_RowPinningColumnDef.js.map