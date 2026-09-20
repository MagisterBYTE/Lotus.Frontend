import type { MRT_ColumnVirtualizer, MRT_HeaderGroup, MRT_RowData, MRT_TableInstance } from '../../types';
import type { TableTrProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends TableTrProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    footerGroup: MRT_HeaderGroup<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableFooterRow: <TData extends MRT_RowData>({ columnVirtualizer, footerGroup, table, ...rest }: Props<TData>) => import("react").JSX.Element | null;
export {};
//# sourceMappingURL=MRT_TableFooterRow.d.ts.map