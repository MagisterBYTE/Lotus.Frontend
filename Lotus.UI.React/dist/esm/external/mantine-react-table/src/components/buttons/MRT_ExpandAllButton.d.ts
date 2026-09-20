import type { ActionIconProps } from '@mantine/core';
import type { MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends ActionIconProps {
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ExpandAllButton: <TData extends MRT_RowData>({ table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_ExpandAllButton.d.ts.map