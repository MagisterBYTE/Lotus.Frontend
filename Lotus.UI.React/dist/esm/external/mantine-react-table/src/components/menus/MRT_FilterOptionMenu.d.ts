import type { MRT_Header, MRT_InternalFilterOption, MRT_Localization, MRT_RowData, MRT_TableInstance } from '../../types';
export declare const mrtFilterOptions: (localization: MRT_Localization) => Array<MRT_InternalFilterOption>;
interface Props<TData extends MRT_RowData> {
    header?: MRT_Header<TData>;
    onSelect?: () => void;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_FilterOptionMenu: <TData extends MRT_RowData>({ header, onSelect, table, }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_FilterOptionMenu.d.ts.map