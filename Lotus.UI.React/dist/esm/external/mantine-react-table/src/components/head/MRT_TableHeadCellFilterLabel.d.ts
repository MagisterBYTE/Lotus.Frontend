import type { MRT_Header, MRT_RowData, MRT_TableInstance } from '../../types';
import type { ActionIconProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends ActionIconProps {
    header: MRT_Header<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableHeadCellFilterLabel: <TData extends MRT_RowData>({ header, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableHeadCellFilterLabel.d.ts.map