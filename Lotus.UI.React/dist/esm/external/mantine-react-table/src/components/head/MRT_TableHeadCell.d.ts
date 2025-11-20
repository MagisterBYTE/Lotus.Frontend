import { type TableThProps } from '@mantine/core';
import { type MRT_ColumnVirtualizer, type MRT_Header, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends TableThProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    header: MRT_Header<TData>;
    renderedHeaderIndex?: number;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableHeadCell: <TData extends MRT_RowData>({ columnVirtualizer, header, renderedHeaderIndex, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableHeadCell.d.ts.map