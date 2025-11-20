import { type ActionIconProps } from '@mantine/core';
import { type MRT_Row, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends ActionIconProps {
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableBodyRowPinButton: <TData extends MRT_RowData>({ row, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=MRT_TableBodyRowPinButton.d.ts.map