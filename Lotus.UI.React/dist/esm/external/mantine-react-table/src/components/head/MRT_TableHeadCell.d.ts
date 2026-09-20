import type { MRT_ColumnVirtualizer, MRT_Header, MRT_RowData, MRT_TableInstance } from '../../types';
import type { TableThProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends TableThProps {
    columnVirtualizer?: MRT_ColumnVirtualizer;
    header: MRT_Header<TData>;
    renderedHeaderIndex?: number;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableHeadCell: <TData extends MRT_RowData>({ columnVirtualizer, header, renderedHeaderIndex, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableHeadCell.d.ts.map