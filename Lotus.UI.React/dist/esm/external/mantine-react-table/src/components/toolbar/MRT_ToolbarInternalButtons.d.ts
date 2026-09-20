import type { MRT_RowData, MRT_TableInstance } from '../../types';
import type { FlexProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends FlexProps {
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ToolbarInternalButtons: <TData extends MRT_RowData>({ table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_ToolbarInternalButtons.d.ts.map