import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_ToolbarAlertBanner.module.css';
import { Fragment, useMemo } from 'react';
import { ActionIcon, Alert, Badge, Button, Collapse, Flex, Stack, } from '@mantine/core';
import { getMRT_SelectAllHandler } from '../../utils/row.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';
export const MRT_ToolbarAlertBanner = ({ stackAlertBanner, table, ...rest }) => {
    const { getFilteredSelectedRowModel, getPrePaginationRowModel, getState, options: { enableRowSelection, enableSelectAll, icons: { IconX }, localization, mantineToolbarAlertBannerBadgeProps, mantineToolbarAlertBannerProps, manualPagination, positionToolbarAlertBanner, renderToolbarAlertBannerContent, rowCount, }, } = table;
    const { density, grouping, rowSelection, showAlertBanner } = getState();
    const alertProps = {
        ...parseFromValuesOrFunc(mantineToolbarAlertBannerProps, {
            table,
        }),
        ...rest,
    };
    const badgeProps = parseFromValuesOrFunc(mantineToolbarAlertBannerBadgeProps, { table });
    const totalRowCount = rowCount ?? getPrePaginationRowModel().flatRows.length;
    const selectedRowCount = useMemo(() => manualPagination
        ? Object.values(rowSelection).filter(Boolean).length
        : getFilteredSelectedRowModel().rows.length, [rowSelection, totalRowCount, manualPagination]);
    const selectedAlert = selectedRowCount ? (_jsxs(Flex, { align: "center", gap: "sm", children: [localization.selectedCountOfRowCountRowsSelected
                ?.replace('{selectedCount}', selectedRowCount.toString())
                ?.replace('{rowCount}', totalRowCount.toString()), _jsx(Button, { onClick: (event) => getMRT_SelectAllHandler({ table })(event, false, true), size: "compact-xs", variant: "subtle", children: localization.clearSelection })] })) : null;
    const groupedAlert = grouping.length > 0 ? (_jsxs(Flex, { children: [localization.groupedBy, ' ', grouping.map((columnId, index) => (_jsxs(Fragment, { children: [index > 0 ? localization.thenBy : '', _jsxs(Badge, { className: classes['alert-badge'], rightSection: _jsx(ActionIcon, { color: "white", onClick: () => table.getColumn(columnId).toggleGrouping(), size: "xs", variant: "subtle", children: _jsx(IconX, { style: { transform: 'scale(0.8)' } }) }), variant: "filled", ...badgeProps, children: [table.getColumn(columnId).columnDef.header, ' '] })] }, `${index}-${columnId}`)))] })) : null;
    return (_jsx(Collapse, { in: showAlertBanner || !!selectedAlert || !!groupedAlert, transitionDuration: stackAlertBanner ? 200 : 0, children: _jsx(Alert, { color: "blue", icon: false, ...alertProps, className: clsx(classes.alert, stackAlertBanner &&
                !positionToolbarAlertBanner &&
                classes['alert-stacked'], !stackAlertBanner &&
                positionToolbarAlertBanner === 'bottom' &&
                classes['alert-bottom'], alertProps?.className), children: renderToolbarAlertBannerContent?.({
                groupedAlert,
                selectedAlert,
                table,
            }) ?? (_jsxs(Flex, { className: clsx(classes['toolbar-alert'], positionToolbarAlertBanner === 'head-overlay' &&
                    classes['head-overlay'], density), children: [enableRowSelection &&
                        enableSelectAll &&
                        positionToolbarAlertBanner === 'head-overlay' && (_jsx(MRT_SelectCheckbox, { table: table })), _jsxs(Stack, { children: [alertProps?.children, selectedAlert, groupedAlert] })] })) }) }));
};
//# sourceMappingURL=MRT_ToolbarAlertBanner.js.map