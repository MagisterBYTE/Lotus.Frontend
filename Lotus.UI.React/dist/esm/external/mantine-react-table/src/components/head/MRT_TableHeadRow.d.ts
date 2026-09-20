import type { MRT_ColumnVirtualizer, MRT_HeaderGroup, MRT_RowData, MRT_TableInstance } from '../../types';
import type { TableTrProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends TableTrProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    headerGroup: MRT_HeaderGroup<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableHeadRow: <TData extends MRT_RowData>({ columnVirtualizer, headerGroup, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableHeadRow.d.ts.map