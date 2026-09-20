import type { MRT_ColumnVirtualizer, MRT_RowData, MRT_TableInstance } from '../../types';
import type { TableTfootProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends TableTfootProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableFooter: <TData extends MRT_RowData>({ columnVirtualizer, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableFooter.d.ts.map