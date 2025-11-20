import { type ActionIconProps } from '@mantine/core';
import type { MRT_Header, MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends ActionIconProps {
    header: MRT_Header<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableHeadCellSortLabel: <TData extends MRT_RowData>({ header, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableHeadCellSortLabel.d.ts.map