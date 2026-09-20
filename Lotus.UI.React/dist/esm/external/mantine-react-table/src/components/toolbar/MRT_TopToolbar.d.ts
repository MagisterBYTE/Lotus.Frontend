import type { MRT_RowData, MRT_TableInstance } from '../../types';
import type { BoxProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends BoxProps {
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TopToolbar: <TData extends MRT_RowData>({ table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TopToolbar.d.ts.map