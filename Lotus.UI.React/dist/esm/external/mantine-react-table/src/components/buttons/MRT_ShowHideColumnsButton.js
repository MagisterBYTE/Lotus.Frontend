import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu';
export const MRT_ShowHideColumnsButton = ({ table, title, ...rest }) => {
    const { icons: { IconColumns }, localization: { showHideColumns }, } = table.options;
    return (_jsxs(Menu, { closeOnItemClick: false, withinPortal: true, children: [_jsx(Tooltip, { label: title ?? showHideColumns, withinPortal: true, children: _jsx(Menu.Target, { children: _jsx(ActionIcon, { "aria-label": title ?? showHideColumns, color: "gray", size: "lg", variant: "subtle", ...rest, children: _jsx(IconColumns, {}) }) }) }), _jsx(MRT_ShowHideColumnsMenu, { table: table })] }));
};
//# sourceMappingURL=MRT_ShowHideColumnsButton.js.map