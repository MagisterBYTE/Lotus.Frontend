import { type FlexProps } from '@mantine/core';
import { type MRT_Header, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends FlexProps {
    header: MRT_Header<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableHeadCellFilterContainer: <TData extends MRT_RowData>({ header, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableHeadCellFilterContainer.d.ts.map