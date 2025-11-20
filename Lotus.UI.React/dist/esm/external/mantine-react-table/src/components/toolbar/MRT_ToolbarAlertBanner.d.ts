import { type AlertProps } from '@mantine/core';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends Partial<AlertProps> {
    stackAlertBanner?: boolean;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ToolbarAlertBanner: <TData extends MRT_RowData>({ stackAlertBanner, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_ToolbarAlertBanner.d.ts.map