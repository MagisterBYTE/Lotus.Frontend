import { type ActionIconProps } from '@mantine/core';
import { type HTMLPropsRef, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends ActionIconProps, HTMLPropsRef<HTMLButtonElement> {
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ToggleFullScreenButton: <TData extends MRT_RowData>({ table: { getState, options: { icons: { IconMaximize, IconMinimize }, localization: { toggleFullScreen }, }, setIsFullScreen, }, title, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_ToggleFullScreenButton.d.ts.map