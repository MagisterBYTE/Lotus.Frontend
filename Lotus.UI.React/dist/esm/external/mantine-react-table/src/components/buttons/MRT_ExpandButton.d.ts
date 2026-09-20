import type { MRT_Row, MRT_RowData, MRT_TableInstance } from '../../types';
import type { ActionIconProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends ActionIconProps {
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ExpandButton: <TData extends MRT_RowData>({ row, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_ExpandButton.d.ts.map