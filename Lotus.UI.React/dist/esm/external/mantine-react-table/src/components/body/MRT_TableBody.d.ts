import { type TableProps, type TableTbodyProps } from '@mantine/core';
import { type MRT_ColumnVirtualizer, type MRT_RowData, type MRT_TableInstance } from '../../types';
export interface MRT_TableBodyProps<TData extends MRT_RowData> extends TableTbodyProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    table: MRT_TableInstance<TData>;
    tableProps: Partial<TableProps>;
}
export declare const MRT_TableBody: <TData extends MRT_RowData>({ columnVirtualizer, table, tableProps, ...rest }: MRT_TableBodyProps<TData>) => import("react/jsx-runtime").JSX.Element;
export declare const Memo_MRT_TableBody: typeof MRT_TableBody;
//# sourceMappingURL=MRT_TableBody.d.ts.map