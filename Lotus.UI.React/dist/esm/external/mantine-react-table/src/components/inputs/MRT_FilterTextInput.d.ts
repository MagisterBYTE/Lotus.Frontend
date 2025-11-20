import { type TextInputProps } from '@mantine/core';
import { type MRT_Header, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends TextInputProps {
    header: MRT_Header<TData>;
    rangeFilterIndex?: number;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_FilterTextInput: <TData extends MRT_RowData>({ header, rangeFilterIndex, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_FilterTextInput.d.ts.map