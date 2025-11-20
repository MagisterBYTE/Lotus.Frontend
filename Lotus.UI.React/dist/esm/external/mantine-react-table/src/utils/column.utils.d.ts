import { type MRT_Column, type MRT_ColumnDef, type MRT_ColumnOrderState, type MRT_DefinedColumnDef, type MRT_DefinedTableOptions, type MRT_FilterOption, type MRT_RowData } from '../types';
export declare const getColumnId: <TData extends MRT_RowData>(columnDef: MRT_ColumnDef<TData>) => string;
export declare const getAllLeafColumnDefs: <TData extends MRT_RowData>(columns: MRT_ColumnDef<TData>[]) => MRT_ColumnDef<TData>[];
export declare const prepareColumns: <TData extends MRT_RowData>({ columnDefs, tableOptions, }: {
    columnDefs: MRT_ColumnDef<TData>[];
    tableOptions: MRT_DefinedTableOptions<TData>;
}) => MRT_DefinedColumnDef<TData>[];
export declare const reorderColumn: <TData extends MRT_RowData>(draggedColumn: MRT_Column<TData>, targetColumn: MRT_Column<TData>, columnOrder: MRT_ColumnOrderState) => MRT_ColumnOrderState;
export declare const getDefaultColumnFilterFn: <TData extends MRT_RowData>(columnDef: MRT_ColumnDef<TData>) => MRT_FilterOption;
//# sourceMappingURL=column.utils.d.ts.map