import { jsx as _jsx } from "react/jsx-runtime";
import { ActionIcon, Tooltip } from '@mantine/core';
export const MRT_ToggleFiltersButton = ({ table: { getState, options: { icons: { IconFilter, IconFilterOff }, localization: { showHideFilters }, }, setShowColumnFilters, }, title, ...rest }) => {
    const { showColumnFilters } = getState();
    return (_jsx(Tooltip, { label: title ?? showHideFilters, withinPortal: true, children: _jsx(ActionIcon, { "aria-label": title ?? showHideFilters, color: "gray", onClick: () => setShowColumnFilters((current) => !current), size: "lg", variant: "subtle", ...rest, children: showColumnFilters ? _jsx(IconFilterOff, {}) : _jsx(IconFilter, {}) }) }));
};
//# sourceMappingURL=MRT_ToggleFiltersButton.js.map