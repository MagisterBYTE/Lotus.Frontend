import { type ProgressProps } from '@mantine/core';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends Partial<ProgressProps> {
    isTopToolbar: boolean;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ProgressBar: <TData extends MRT_RowData>({ isTopToolbar, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_ProgressBar.d.ts.map