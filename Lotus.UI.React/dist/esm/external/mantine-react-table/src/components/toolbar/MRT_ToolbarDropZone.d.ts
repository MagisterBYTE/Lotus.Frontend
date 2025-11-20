import { type FlexProps } from '@mantine/core';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends FlexProps {
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ToolbarDropZone: <TData extends MRT_RowData>({ table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_ToolbarDropZone.d.ts.map