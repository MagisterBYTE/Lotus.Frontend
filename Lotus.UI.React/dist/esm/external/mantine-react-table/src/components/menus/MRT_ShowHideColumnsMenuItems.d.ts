import type { MRT_CellValue, MRT_Column, MRT_RowData, MRT_TableInstance } from '../../types';
import type { Dispatch, SetStateAction } from 'react';
interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> {
    allColumns: Array<MRT_Column<TData>>;
    column: MRT_Column<TData, TValue>;
    hoveredColumn: MRT_Column<TData> | null;
    setHoveredColumn: Dispatch<SetStateAction<MRT_Column<TData> | null>>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ShowHideColumnsMenuItems: <TData extends MRT_RowData>({ allColumns, column, hoveredColumn, setHoveredColumn, table, }: Props<TData>) => import("react").JSX.Element | null;
export {};
//# sourceMappingURL=MRT_ShowHideColumnsMenuItems.d.ts.map