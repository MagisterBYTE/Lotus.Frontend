import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';
export const getMRT_RowNumbersColumnDef = (tableOptions) => {
    const { localization, rowNumberDisplayMode } = tableOptions;
    const { pagination: { pageIndex, pageSize }, } = tableOptions.state;
    return {
        Cell: ({ renderedRowIndex = 0, row }) => ((rowNumberDisplayMode === 'static'
            ? renderedRowIndex + pageSize * pageIndex
            : row.index) ?? 0) + 1,
        grow: false,
        Header: () => localization.rowNumber,
        ...defaultDisplayColumnProps({
            header: 'rowNumbers',
            id: 'mrt-row-numbers',
            size: 50,
            tableOptions,
        }),
    };
};
//# sourceMappingURL=getMRT_RowNumbersColumnDef.js.map