import { type TableTheadProps } from '@mantine/core';
import { type MRT_ColumnVirtualizer, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends TableTheadProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableHead: <TData extends MRT_RowData>({ columnVirtualizer, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableHead.d.ts.map