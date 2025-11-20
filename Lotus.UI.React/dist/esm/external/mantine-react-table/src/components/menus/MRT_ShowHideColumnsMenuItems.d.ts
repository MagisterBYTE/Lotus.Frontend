import { type Dispatch, type SetStateAction } from 'react';
import { type MRT_CellValue, type MRT_Column, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> {
    allColumns: MRT_Column<TData>[];
    column: MRT_Column<TData, TValue>;
    hoveredColumn: MRT_Column<TData> | null;
    setHoveredColumn: Dispatch<SetStateAction<MRT_Column<TData> | null>>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ShowHideColumnsMenuItems: <TData extends MRT_RowData>({ allColumns, column, hoveredColumn, setHoveredColumn, table, }: Props<TData>) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=MRT_ShowHideColumnsMenuItems.d.ts.map