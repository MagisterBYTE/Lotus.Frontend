import { MRT_DefaultDisplayColumn } from '../useMRT_TableOptions';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';
const blankColProps = {
    children: null,
    style: {
        minWidth: 0,
        padding: 0,
        width: 0,
    },
};
export const getMRT_RowSpacerColumnDef = (tableOptions) => {
    return {
        ...defaultDisplayColumnProps({
            id: 'mrt-row-spacer',
            size: 0,
            tableOptions,
        }),
        grow: true,
        ...MRT_DefaultDisplayColumn,
        mantineTableBodyCellProps: blankColProps,
        mantineTableFooterCellProps: blankColProps,
        mantineTableHeadCellProps: blankColProps,
    };
};
//# sourceMappingURL=getMRT_RowSpacerColumnDef.js.map