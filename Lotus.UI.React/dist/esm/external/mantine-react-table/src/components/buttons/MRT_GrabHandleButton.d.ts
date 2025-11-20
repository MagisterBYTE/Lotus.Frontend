import { type DragEventHandler } from 'react';
import { type ActionIconProps } from '@mantine/core';
import { type HTMLPropsRef, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> {
    actionIconProps?: ActionIconProps & HTMLPropsRef<HTMLButtonElement>;
    onDragEnd: DragEventHandler<HTMLButtonElement>;
    onDragStart: DragEventHandler<HTMLButtonElement>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_GrabHandleButton: <TData extends MRT_RowData>({ actionIconProps, onDragEnd, onDragStart, table: { options: { icons: { IconGripHorizontal }, localization: { move }, }, }, }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_GrabHandleButton.d.ts.map