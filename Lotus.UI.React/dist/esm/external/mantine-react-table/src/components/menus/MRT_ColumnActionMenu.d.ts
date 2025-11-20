import { type MenuProps } from '@mantine/core';
import { type MRT_Header, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends MenuProps {
    header: MRT_Header<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ColumnActionMenu: <TData extends MRT_RowData>({ header, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_ColumnActionMenu.d.ts.map