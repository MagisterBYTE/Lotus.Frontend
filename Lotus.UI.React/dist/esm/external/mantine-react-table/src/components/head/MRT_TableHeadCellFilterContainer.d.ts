import type { MRT_Header, MRT_RowData, MRT_TableInstance } from '../../types';
import type { FlexProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends FlexProps {
    header: MRT_Header<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableHeadCellFilterContainer: <TData extends MRT_RowData>({ header, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableHeadCellFilterContainer.d.ts.map