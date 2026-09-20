import type { MRT_Header, MRT_RowData, MRT_TableInstance } from '../../types';
import type { TextInputProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends TextInputProps {
    header: MRT_Header<TData>;
    rangeFilterIndex?: number;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_FilterTextInput: <TData extends MRT_RowData>({ header, rangeFilterIndex, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_FilterTextInput.d.ts.map