import type { MRT_Cell, MRT_CellValue, MRT_Row, MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> {
    cell: MRT_Cell<TData, TValue>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ToggleRowActionMenuButton: <TData extends MRT_RowData>({ cell, row, table, }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_ToggleRowActionMenuButton.d.ts.map