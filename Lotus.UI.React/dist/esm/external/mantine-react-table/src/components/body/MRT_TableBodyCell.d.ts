import { type RefObject } from 'react';
import { type TableTdProps } from '@mantine/core';
import { type MRT_Cell, type MRT_CellValue, type MRT_RowData, type MRT_TableInstance, type MRT_VirtualItem } from '../../types';
interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> extends TableTdProps {
    cell: MRT_Cell<TData, TValue>;
    numRows?: number;
    renderedColumnIndex?: number;
    renderedRowIndex?: number;
    rowRef: RefObject<HTMLTableRowElement>;
    table: MRT_TableInstance<TData>;
    virtualCell?: MRT_VirtualItem;
}
export declare const MRT_TableBodyCell: <TData extends MRT_RowData>({ cell, numRows, renderedColumnIndex, renderedRowIndex, rowRef, table, virtualCell, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export declare const Memo_MRT_TableBodyCell: typeof MRT_TableBodyCell;
export {};
//# sourceMappingURL=MRT_TableBodyCell.d.ts.map