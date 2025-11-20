import { type ReactNode } from 'react';
import { type UnstyledButtonProps } from '@mantine/core';
import { type MRT_Cell, type MRT_CellValue, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> extends UnstyledButtonProps {
    cell: MRT_Cell<TData, TValue>;
    children: ReactNode;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_CopyButton: <TData extends MRT_RowData>({ cell, children, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_CopyButton.d.ts.map