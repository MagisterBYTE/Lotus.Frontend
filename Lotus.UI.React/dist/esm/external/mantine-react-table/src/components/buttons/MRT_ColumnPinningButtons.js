import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { ActionIcon, Flex, Tooltip } from '@mantine/core';
import classes from './MRT_ColumnPinningButtons.module.css';
export const MRT_ColumnPinningButtons = ({ column, table, }) => {
    const { options: { icons: { IconPinned, IconPinnedOff }, localization, }, } = table;
    return (_jsx(Flex, { className: clsx('mrt-column-pinning-buttons', classes.root), children: column.getIsPinned() ? (_jsx(Tooltip, { label: localization.unpin, withinPortal: true, children: _jsx(ActionIcon, { color: "gray", onClick: () => column.pin(false), size: "md", variant: "subtle", children: _jsx(IconPinnedOff, {}) }) })) : (_jsxs(_Fragment, { children: [_jsx(Tooltip, { label: localization.pinToLeft, withinPortal: true, children: _jsx(ActionIcon, { color: "gray", onClick: () => column.pin('start'), size: "md", variant: "subtle", children: _jsx(IconPinned, { className: classes.left }) }) }), _jsx(Tooltip, { label: localization.pinToRight, withinPortal: true, children: _jsx(ActionIcon, { color: "gray", onClick: () => column.pin('end'), size: "md", variant: "subtle", children: _jsx(IconPinned, { className: classes.right }) }) })] })) }));
};
//# sourceMappingURL=MRT_ColumnPinningButtons.js.map