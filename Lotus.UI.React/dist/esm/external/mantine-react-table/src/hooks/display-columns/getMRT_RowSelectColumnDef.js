import { jsx as _jsx } from "react/jsx-runtime";
import { MRT_SelectCheckbox } from '../../components/inputs/MRT_SelectCheckbox';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';
export const getMRT_RowSelectColumnDef = (tableOptions) => {
    const { enableMultiRowSelection, enableSelectAll } = tableOptions;
    return {
        Cell: ({ renderedRowIndex, row, table }) => (_jsx(MRT_SelectCheckbox, { renderedRowIndex: renderedRowIndex, row: row, table: table })),
        grow: false,
        Header: enableSelectAll && enableMultiRowSelection
            ? ({ table }) => _jsx(MRT_SelectCheckbox, { table: table })
            : undefined,
        ...defaultDisplayColumnProps({
            header: 'select',
            id: 'mrt-row-select',
            size: enableSelectAll ? 60 : 70,
            tableOptions,
        }),
    };
};
//# sourceMappingURL=getMRT_RowSelectColumnDef.js.map