import { type RefObject } from 'react';
import { type ActionIconProps } from '@mantine/core';
import { type MRT_CellValue, type MRT_Column, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> extends ActionIconProps {
    column: MRT_Column<TData, TValue>;
    table: MRT_TableInstance<TData>;
    tableHeadCellRef: RefObject<HTMLTableCellElement>;
}
export declare const MRT_TableHeadCellGrabHandle: <TData extends MRT_RowData>({ column, table, tableHeadCellRef, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableHeadCellGrabHandle.d.ts.map