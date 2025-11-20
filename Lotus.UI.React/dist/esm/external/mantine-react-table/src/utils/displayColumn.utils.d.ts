import { type MRT_ColumnDef, type MRT_DefinedTableOptions, type MRT_DisplayColumnIds, type MRT_Localization, type MRT_RowData, type MRT_StatefulTableOptions } from '../types';
export declare function defaultDisplayColumnProps<TData extends MRT_RowData>({ header, id, size, tableOptions, }: {
    header?: keyof MRT_Localization;
    id: MRT_DisplayColumnIds;
    size: number;
    tableOptions: MRT_DefinedTableOptions<TData>;
}): MRT_ColumnDef<TData>;
export declare const showRowPinningColumn: <TData extends MRT_RowData>(tableOptions: MRT_StatefulTableOptions<TData>) => boolean;
export declare const showRowDragColumn: <TData extends MRT_RowData>(tableOptions: MRT_StatefulTableOptions<TData>) => boolean;
export declare const showRowExpandColumn: <TData extends MRT_RowData>(tableOptions: MRT_StatefulTableOptions<TData>) => boolean;
export declare const showRowActionsColumn: <TData extends MRT_RowData>(tableOptions: MRT_StatefulTableOptions<TData>) => boolean;
export declare const showRowSelectionColumn: <TData extends MRT_RowData>(tableOptions: MRT_StatefulTableOptions<TData>) => boolean;
export declare const showRowNumbersColumn: <TData extends MRT_RowData>(tableOptions: MRT_StatefulTableOptions<TData>) => boolean;
export declare const showRowSpacerColumn: <TData extends MRT_RowData>(tableOptions: MRT_StatefulTableOptions<TData>) => boolean;
export declare const getLeadingDisplayColumnIds: <TData extends MRT_RowData>(tableOptions: MRT_StatefulTableOptions<TData>) => MRT_DisplayColumnIds[];
export declare const getTrailingDisplayColumnIds: <TData extends MRT_RowData>(tableOptions: MRT_StatefulTableOptions<TData>) => MRT_DisplayColumnIds[];
export declare const getDefaultColumnOrderIds: <TData extends MRT_RowData>(tableOptions: MRT_StatefulTableOptions<TData>, reset?: boolean) => string[];
//# sourceMappingURL=displayColumn.utils.d.ts.map