import { type CheckboxProps } from '@mantine/core';
import { type MRT_CellValue, type MRT_Column, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> extends CheckboxProps {
    column: MRT_Column<TData, TValue>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_FilterCheckbox: <TData extends MRT_RowData>({ column, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_FilterCheckbox.d.ts.map