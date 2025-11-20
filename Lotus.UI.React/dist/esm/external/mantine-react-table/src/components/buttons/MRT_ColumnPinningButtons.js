import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_ColumnPinningButtons.module.css';
import { ActionIcon, Flex, Tooltip } from '@mantine/core';
export const MRT_ColumnPinningButtons = ({ column, table, }) => {
    const { options: { icons: { IconPinned, IconPinnedOff }, localization, }, } = table;
    return (_jsx(Flex, { className: clsx('mrt-column-pinning-buttons', classes.root), children: column.getIsPinned() ? (_jsx(Tooltip, { label: localization.unpin, withinPortal: true, children: _jsx(ActionIcon, { color: "gray", onClick: () => column.pin(false), size: "md", variant: "subtle", children: _jsx(IconPinnedOff, {}) }) })) : (_jsxs(_Fragment, { children: [_jsx(Tooltip, { label: localization.pinToLeft, withinPortal: true, children: _jsx(ActionIcon, { color: "gray", onClick: () => column.pin('left'), size: "md", variant: "subtle", children: _jsx(IconPinned, { className: classes.left }) }) }), _jsx(Tooltip, { label: localization.pinToRight, withinPortal: true, children: _jsx(ActionIcon, { color: "gray", onClick: () => column.pin('right'), size: "md", variant: "subtle", children: _jsx(IconPinned, { className: classes.right }) }) })] })) }));
};
//# sourceMappingURL=MRT_ColumnPinningButtons.js.map