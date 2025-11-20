import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_GrabHandleButton.module.css';
import { ActionIcon, Tooltip } from '@mantine/core';
export const MRT_GrabHandleButton = ({ actionIconProps, onDragEnd, onDragStart, table: { options: { icons: { IconGripHorizontal }, localization: { move }, }, }, }) => {
    return (_jsx(Tooltip, { label: actionIconProps?.title ?? move, openDelay: 1000, withinPortal: true, children: _jsx(ActionIcon, { "aria-label": actionIconProps?.title ?? move, draggable: true, ...actionIconProps, className: clsx('mrt-grab-handle-button', classes['grab-icon'], actionIconProps?.className), color: "gray", onClick: (e) => {
                e.stopPropagation();
                actionIconProps?.onClick?.(e);
            }, onDragEnd: onDragEnd, onDragStart: onDragStart, size: "sm", title: undefined, variant: "transparent", children: _jsx(IconGripHorizontal, { size: "100%" }) }) }));
};
//# sourceMappingURL=MRT_GrabHandleButton.js.map