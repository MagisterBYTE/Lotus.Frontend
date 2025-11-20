import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
export const MRT_RowActionMenu = ({ handleEdit, row, table, ...rest }) => {
    const { options: { editDisplayMode, enableEditing, icons: { IconDots, IconEdit }, localization, positionActionsColumn, renderRowActionMenuItems, }, } = table;
    return (_jsxs(Menu, { closeOnItemClick: true, position: positionActionsColumn === 'first'
            ? 'bottom-start'
            : positionActionsColumn === 'last'
                ? 'bottom-end'
                : undefined, withinPortal: true, children: [_jsx(Tooltip, { label: localization.rowActions, openDelay: 1000, withinPortal: true, children: _jsx(Menu.Target, { children: _jsx(ActionIcon, { "aria-label": localization.rowActions, color: "gray", onClick: (event) => event.stopPropagation(), size: "sm", variant: "subtle", ...rest, children: _jsx(IconDots, {}) }) }) }), _jsxs(Menu.Dropdown, { onClick: (event) => event.stopPropagation(), children: [enableEditing && editDisplayMode !== 'table' && (_jsx(Menu.Item, { leftSection: _jsx(IconEdit, {}), onClick: handleEdit, children: localization.edit })), renderRowActionMenuItems?.({
                        row,
                        table,
                    })] })] }));
};
//# sourceMappingURL=MRT_RowActionMenu.js.map