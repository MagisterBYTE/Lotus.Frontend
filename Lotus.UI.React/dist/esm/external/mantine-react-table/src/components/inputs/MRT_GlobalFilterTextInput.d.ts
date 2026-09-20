import type { MRT_RowData, MRT_TableInstance } from '../../types';
import type { TextInputProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends TextInputProps {
    table: MRT_TableInstance<TData>;
}
export declare const MRT_GlobalFilterTextInput: <TData extends MRT_RowData>({ table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_GlobalFilterTextInput.d.ts.map