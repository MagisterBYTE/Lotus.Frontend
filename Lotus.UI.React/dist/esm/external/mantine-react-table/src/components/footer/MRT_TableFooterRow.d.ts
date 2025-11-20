import { type TableTrProps } from '@mantine/core';
import { type MRT_ColumnVirtualizer, type MRT_HeaderGroup, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends TableTrProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    footerGroup: MRT_HeaderGroup<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableFooterRow: <TData extends MRT_RowData>({ columnVirtualizer, footerGroup, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=MRT_TableFooterRow.d.ts.map