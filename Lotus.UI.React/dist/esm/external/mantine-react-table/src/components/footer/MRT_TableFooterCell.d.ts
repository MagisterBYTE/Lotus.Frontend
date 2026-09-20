import type { MRT_Header, MRT_RowData, MRT_TableInstance } from '../../types';
import type { TableThProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends TableThProps {
    footer: MRT_Header<TData>;
    renderedColumnIndex?: number;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableFooterCell: <TData extends MRT_RowData>({ footer, renderedColumnIndex, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableFooterCell.d.ts.map