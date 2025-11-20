import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_ExpandButton.module.css';
import { ActionIcon, Tooltip, useDirection, } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';
export const MRT_ExpandButton = ({ row, table, ...rest }) => {
    const direction = useDirection();
    const { options: { icons: { IconChevronDown }, localization, mantineExpandButtonProps, positionExpandColumn, renderDetailPanel, }, } = table;
    const actionIconProps = {
        ...parseFromValuesOrFunc(mantineExpandButtonProps, {
            row,
            table,
        }),
        ...rest,
    };
    const internalEditComponents = row
        .getAllCells()
        .filter((cell) => cell.column.columnDef.columnDefType === 'data')
        .map((cell) => (_jsx(MRT_EditCellTextInput, { cell: cell, table: table }, cell.id)));
    const canExpand = row.getCanExpand();
    const isExpanded = row.getIsExpanded();
    const DetailPanel = !!renderDetailPanel?.({
        internalEditComponents,
        row,
        table,
    });
    const handleToggleExpand = (event) => {
        event.stopPropagation();
        row.toggleExpanded();
        actionIconProps?.onClick?.(event);
    };
    const rtl = direction.dir === 'rtl' || positionExpandColumn === 'last';
    return (_jsx(Tooltip, { disabled: !canExpand && !DetailPanel, label: actionIconProps?.title ??
            (isExpanded ? localization.collapse : localization.expand), openDelay: 1000, withinPortal: true, children: _jsx(ActionIcon, { "aria-label": localization.expand, color: "gray", disabled: !canExpand && !DetailPanel, variant: "subtle", ...actionIconProps, __vars: {
                '--mrt-row-depth': `${row.depth}`,
            }, className: clsx('mrt-expand-button', classes.root, classes[`root-${rtl ? 'rtl' : 'ltr'}`], actionIconProps?.className), onClick: handleToggleExpand, title: undefined, children: actionIconProps?.children ?? (_jsx(IconChevronDown, { className: clsx('mrt-expand-button-chevron', classes.chevron, !canExpand && !renderDetailPanel
                    ? classes.right
                    : isExpanded
                        ? classes.up
                        : undefined) })) }) }));
};
//# sourceMappingURL=MRT_ExpandButton.js.map