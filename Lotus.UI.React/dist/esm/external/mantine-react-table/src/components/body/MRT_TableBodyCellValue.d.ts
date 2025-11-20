import { type MRT_Cell, type MRT_CellValue, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> {
    cell: MRT_Cell<TData, TValue>;
    renderedColumnIndex?: number;
    renderedRowIndex?: number;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableBodyCellValue: <TData extends MRT_RowData>({ cell, renderedColumnIndex, renderedRowIndex, table }: Props<TData>) => import("react").ReactNode;
export {};
//# sourceMappingURL=MRT_TableBodyCellValue.d.ts.map