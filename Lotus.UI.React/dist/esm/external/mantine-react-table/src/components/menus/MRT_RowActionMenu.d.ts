import { type MouseEvent } from 'react';
import { type ActionIconProps } from '@mantine/core';
import { type MRT_Row, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends ActionIconProps {
    handleEdit: (event: MouseEvent) => void;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_RowActionMenu: <TData extends MRT_RowData>({ handleEdit, row, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_RowActionMenu.d.ts.map