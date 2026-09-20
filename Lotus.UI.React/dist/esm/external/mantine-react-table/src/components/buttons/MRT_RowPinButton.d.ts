import type { RowPinningPosition } from '@tanstack/react-table';
import type { ActionIconProps } from '@mantine/core';
import type { MRT_Row, MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends ActionIconProps {
    pinningPosition: RowPinningPosition;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_RowPinButton: <TData extends MRT_RowData>({ pinningPosition, row, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_RowPinButton.d.ts.map