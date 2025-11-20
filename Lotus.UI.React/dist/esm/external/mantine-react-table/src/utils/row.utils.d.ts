import { type ChangeEvent, type MouseEvent } from 'react';
import { type MRT_Row, type MRT_RowData, type MRT_TableInstance } from '../types';
export declare const getMRT_Rows: <TData extends MRT_RowData>(table: MRT_TableInstance<TData>, all?: boolean) => MRT_Row<TData>[];
export declare const getCanRankRows: <TData extends MRT_RowData>(table: MRT_TableInstance<TData>) => boolean | undefined;
export declare const getIsRankingRows: <TData extends MRT_RowData>(table: MRT_TableInstance<TData>) => any;
export declare const getIsRowSelected: <TData extends MRT_RowData>({ row, table, }: {
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
}) => boolean | undefined;
export declare const getMRT_RowSelectionHandler: <TData extends MRT_RowData>({ renderedRowIndex, row, table, }: {
    renderedRowIndex?: number;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
}) => (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLTableRowElement>, value?: boolean) => void;
export declare const getMRT_SelectAllHandler: <TData extends MRT_RowData>({ table }: {
    table: MRT_TableInstance<TData>;
}) => (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>, value?: boolean, forceAll?: boolean) => void;
//# sourceMappingURL=row.utils.d.ts.map