import { type ActionIconProps } from '@mantine/core';
import { type HTMLPropsRef, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends ActionIconProps, HTMLPropsRef<HTMLButtonElement> {
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ToggleGlobalFilterButton: <TData extends MRT_RowData>({ table: { getState, options: { icons: { IconSearch, IconSearchOff }, localization: { showHideSearch }, }, refs: { searchInputRef }, setShowGlobalFilter, }, title, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_ToggleGlobalFilterButton.d.ts.map