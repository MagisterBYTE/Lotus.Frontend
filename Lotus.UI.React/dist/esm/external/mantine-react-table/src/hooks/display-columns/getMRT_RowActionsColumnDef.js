import { jsx as _jsx } from "react/jsx-runtime";
import { MRT_ToggleRowActionMenuButton } from '../../components/buttons/MRT_ToggleRowActionMenuButton';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';
export const getMRT_RowActionsColumnDef = (tableOptions) => {
    return {
        Cell: ({ cell, row, table }) => (_jsx(MRT_ToggleRowActionMenuButton, { cell: cell, row: row, table: table })),
        ...defaultDisplayColumnProps({
            header: 'actions',
            id: 'mrt-row-actions',
            size: 70,
            tableOptions,
        }),
    };
};
//# sourceMappingURL=getMRT_RowActionsColumnDef.js.map