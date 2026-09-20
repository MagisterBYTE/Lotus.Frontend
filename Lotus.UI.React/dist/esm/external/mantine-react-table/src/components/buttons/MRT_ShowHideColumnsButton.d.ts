import type { ActionIconProps } from '@mantine/core';
import type { HTMLPropsRef, MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends ActionIconProps, HTMLPropsRef<HTMLButtonElement> {
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ShowHideColumnsButton: <TData extends MRT_RowData>({ table, title, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_ShowHideColumnsButton.d.ts.map