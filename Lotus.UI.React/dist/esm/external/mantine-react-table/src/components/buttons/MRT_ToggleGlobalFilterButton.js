import { jsx as _jsx } from "react/jsx-runtime";
import { ActionIcon, Tooltip } from '@mantine/core';
export const MRT_ToggleGlobalFilterButton = ({ table: { getState, options: { icons: { IconSearch, IconSearchOff }, localization: { showHideSearch }, }, refs: { searchInputRef }, setShowGlobalFilter, }, title, ...rest }) => {
    const { globalFilter, showGlobalFilter } = getState();
    const handleToggleSearch = () => {
        setShowGlobalFilter(!showGlobalFilter);
        setTimeout(() => searchInputRef.current?.focus(), 100);
    };
    return (_jsx(Tooltip, { label: title ?? showHideSearch, withinPortal: true, children: _jsx(ActionIcon, { "aria-label": title ?? showHideSearch, color: "gray", disabled: !!globalFilter, onClick: handleToggleSearch, size: "lg", variant: "subtle", ...rest, children: showGlobalFilter ? _jsx(IconSearchOff, {}) : _jsx(IconSearch, {}) }) }));
};
//# sourceMappingURL=MRT_ToggleGlobalFilterButton.js.map