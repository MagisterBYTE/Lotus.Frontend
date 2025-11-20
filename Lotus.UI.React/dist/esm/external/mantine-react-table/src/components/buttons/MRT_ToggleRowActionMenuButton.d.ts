import { type MRT_Cell, type MRT_CellValue, type MRT_Row, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> {
    cell: MRT_Cell<TData, TValue>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ToggleRowActionMenuButton: <TData extends MRT_RowData>({ cell, row, table, }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_ToggleRowActionMenuButton.d.ts.map