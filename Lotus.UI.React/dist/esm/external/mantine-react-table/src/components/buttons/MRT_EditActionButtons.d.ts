import type { BoxProps } from '@mantine/core';
import type { MRT_Row, MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends BoxProps {
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
    variant?: 'icon' | 'text';
}
export declare const MRT_EditActionButtons: <TData extends MRT_RowData>({ row, table, variant, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_EditActionButtons.d.ts.map