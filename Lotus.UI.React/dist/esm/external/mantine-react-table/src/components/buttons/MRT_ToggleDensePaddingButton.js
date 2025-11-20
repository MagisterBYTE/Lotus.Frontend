import { jsx as _jsx } from "react/jsx-runtime";
import { ActionIcon, Tooltip } from '@mantine/core';
const next = {
    md: 'xs',
    xl: 'md',
    xs: 'xl',
};
export const MRT_ToggleDensePaddingButton = ({ table: { getState, options: { icons: { IconBaselineDensityLarge, IconBaselineDensityMedium, IconBaselineDensitySmall, }, localization: { toggleDensity }, }, setDensity, }, title, ...rest }) => {
    const { density } = getState();
    return (_jsx(Tooltip, { label: title ?? toggleDensity, withinPortal: true, children: _jsx(ActionIcon, { "aria-label": title ?? toggleDensity, color: "gray", onClick: () => setDensity((current) => next[current]), size: "lg", variant: "subtle", ...rest, children: density === 'xs' ? (_jsx(IconBaselineDensitySmall, {})) : density === 'md' ? (_jsx(IconBaselineDensityMedium, {})) : (_jsx(IconBaselineDensityLarge, {})) }) }));
};
//# sourceMappingURL=MRT_ToggleDensePaddingButton.js.map