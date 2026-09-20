import type { BoxProps } from '@mantine/core';
import type { MRT_Header, MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends BoxProps {
    header: MRT_Header<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_FilterRangeFields: <TData extends MRT_RowData>({ header, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_FilterRangeFields.d.ts.map