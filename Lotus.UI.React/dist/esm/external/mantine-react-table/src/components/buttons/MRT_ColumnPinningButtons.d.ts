import type { MRT_Column, MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> {
    column: MRT_Column<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ColumnPinningButtons: <TData extends MRT_RowData>({ column, table, }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_ColumnPinningButtons.d.ts.map