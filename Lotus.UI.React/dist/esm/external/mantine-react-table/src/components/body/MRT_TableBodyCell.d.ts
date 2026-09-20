import type { MRT_Cell, MRT_CellValue, MRT_RowData, MRT_TableInstance, MRT_VirtualItem } from '../../types';
import type { RefObject } from 'react';
import type { TableTdProps } from '@mantine/core';
interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> extends TableTdProps {
    cell: MRT_Cell<TData, TValue>;
    numRows?: number;
    renderedColumnIndex?: number;
    renderedRowIndex?: number;
    rowRef: RefObject<HTMLTableRowElement | null>;
    table: MRT_TableInstance<TData>;
    virtualCell?: MRT_VirtualItem;
}
export declare const MRT_TableBodyCell: <TData extends MRT_RowData>({ cell, numRows, renderedColumnIndex, renderedRowIndex, rowRef, table, virtualCell, ...rest }: Props<TData>) => import("react").JSX.Element;
export declare const Memo_MRT_TableBodyCell: typeof MRT_TableBodyCell;
export {};
//# sourceMappingURL=MRT_TableBodyCell.d.ts.map