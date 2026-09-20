import type { MRT_ColumnVirtualizer, MRT_Row, MRT_RowData, MRT_RowVirtualizer, MRT_TableInstance, MRT_VirtualItem } from '../../types';
import type { TableProps, TableTrProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends TableTrProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    numRows?: number;
    pinnedRowIds?: Array<string>;
    renderedRowIndex?: number;
    row: MRT_Row<TData>;
    rowVirtualizer?: MRT_RowVirtualizer;
    table: MRT_TableInstance<TData>;
    tableProps: Partial<TableProps>;
    virtualRow?: MRT_VirtualItem;
}
export declare const MRT_TableBodyRow: <TData extends MRT_RowData>({ children, columnVirtualizer, numRows, pinnedRowIds, renderedRowIndex, row, rowVirtualizer, table, tableProps, virtualRow, ...rest }: Props<TData>) => import("react").JSX.Element;
export declare const Memo_MRT_TableBodyRow: typeof MRT_TableBodyRow;
export {};
//# sourceMappingURL=MRT_TableBodyRow.d.ts.map