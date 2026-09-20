import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { ActionIcon, Tooltip } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
import classes from './MRT_ExpandAllButton.module.css';
export const MRT_ExpandAllButton = ({ table, ...rest }) => {
    const { getCanSomeRowsExpand, getIsAllRowsExpanded, getIsSomeRowsExpanded, state, options: { icons: { IconChevronsDown }, localization, mantineExpandAllButtonProps, renderDetailPanel, }, toggleAllRowsExpanded, } = table;
    const { density, isLoading } = state;
    const actionIconProps = {
        ...parseFromValuesOrFunc(mantineExpandAllButtonProps, {
            table,
        }),
        ...rest,
    };
    const isAllRowsExpanded = getIsAllRowsExpanded();
    return (_jsx(Tooltip, { label: (actionIconProps?.title ?? isAllRowsExpanded)
            ? localization.collapseAll
            : localization.expandAll, openDelay: 1000, withinPortal: true, children: _jsx(ActionIcon, { "aria-label": localization.expandAll, color: "gray", variant: "subtle", ...actionIconProps, className: clsx('mrt-expand-all-button', classes.root, actionIconProps?.className, density), disabled: isLoading || (!renderDetailPanel && !getCanSomeRowsExpand()), onClick: () => toggleAllRowsExpanded(!isAllRowsExpanded), title: undefined, children: actionIconProps?.children ?? (_jsx(IconChevronsDown, { className: clsx(classes.chevron, isAllRowsExpanded
                    ? classes.up
                    : getIsSomeRowsExpanded()
                        ? classes.right
                        : undefined) })) }) }));
};
//# sourceMappingURL=MRT_ExpandAllButton.js.map