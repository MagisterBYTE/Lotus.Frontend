import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
export const MRT_ToggleFullScreenButton = ({ table: { getState, options: { icons: { IconMaximize, IconMinimize }, localization: { toggleFullScreen }, }, setIsFullScreen, }, title, ...rest }) => {
    const { isFullScreen } = getState();
    const [tooltipOpened, setTooltipOpened] = useState(false);
    const handleToggleFullScreen = () => {
        setTooltipOpened(false);
        setIsFullScreen((current) => !current);
    };
    return (_jsx(Tooltip, { label: title ?? toggleFullScreen, opened: tooltipOpened, withinPortal: true, children: _jsx(ActionIcon, { "aria-label": title ?? toggleFullScreen, color: "gray", onClick: handleToggleFullScreen, onMouseEnter: () => setTooltipOpened(true), onMouseLeave: () => setTooltipOpened(false), size: "lg", variant: "subtle", ...rest, children: isFullScreen ? _jsx(IconMinimize, {}) : _jsx(IconMaximize, {}) }) }));
};
//# sourceMappingURL=MRT_ToggleFullScreenButton.js.map