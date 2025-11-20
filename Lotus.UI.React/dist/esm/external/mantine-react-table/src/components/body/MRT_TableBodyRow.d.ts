import { type TableProps, type TableTrProps } from '@mantine/core';
import { type MRT_ColumnVirtualizer, type MRT_Row, type MRT_RowData, type MRT_RowVirtualizer, type MRT_TableInstance, type MRT_VirtualItem } from '../../types';
interface Props<TData extends MRT_RowData> extends TableTrProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    numRows?: number;
    pinnedRowIds?: string[];
    renderedRowIndex?: number;
    row: MRT_Row<TData>;
    rowVirtualizer?: MRT_RowVirtualizer;
    table: MRT_TableInstance<TData>;
    tableProps: Partial<TableProps>;
    virtualRow?: MRT_VirtualItem;
}
export declare const MRT_TableBodyRow: <TData extends MRT_RowData>({ children, columnVirtualizer, numRows, pinnedRowIds, renderedRowIndex, row, rowVirtualizer, table, tableProps, virtualRow, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export declare const Memo_MRT_TableBodyRow: typeof MRT_TableBodyRow;
export {};
//# sourceMappingURL=MRT_TableBodyRow.d.ts.map