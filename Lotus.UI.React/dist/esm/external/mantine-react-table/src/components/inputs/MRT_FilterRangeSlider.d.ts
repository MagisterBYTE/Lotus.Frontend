import type { RangeSliderProps } from '@mantine/core';
import type { MRT_Header, MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends RangeSliderProps {
    header: MRT_Header<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_FilterRangeSlider: <TData extends MRT_RowData>({ header, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_FilterRangeSlider.d.ts.map