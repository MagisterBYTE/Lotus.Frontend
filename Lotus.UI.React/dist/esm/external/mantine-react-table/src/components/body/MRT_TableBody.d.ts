import type { MRT_ColumnVirtualizer, MRT_RowData, MRT_TableInstance } from '../../types';
import type { TableProps, TableTbodyProps } from '@mantine/core';
export interface MRT_TableBodyProps<TData extends MRT_RowData> extends TableTbodyProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    table: MRT_TableInstance<TData>;
    tableProps: Partial<TableProps>;
}
export declare const MRT_TableBody: <TData extends MRT_RowData>({ columnVirtualizer, table, tableProps, ...rest }: MRT_TableBodyProps<TData>) => import("react").JSX.Element;
export declare const Memo_MRT_TableBody: typeof MRT_TableBody;
//# sourceMappingURL=MRT_TableBody.d.ts.map