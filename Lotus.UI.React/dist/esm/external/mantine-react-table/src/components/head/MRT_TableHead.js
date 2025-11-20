import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_TableHead.module.css';
import { TableTh, TableThead, TableTr, } from '@mantine/core';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_ToolbarAlertBanner } from '../toolbar/MRT_ToolbarAlertBanner';
export const MRT_TableHead = ({ columnVirtualizer, table, ...rest }) => {
    const { getHeaderGroups, getSelectedRowModel, getState, options: { enableStickyHeader, layoutMode, mantineTableHeadProps, positionToolbarAlertBanner, }, refs: { tableHeadRef }, } = table;
    const { isFullScreen, showAlertBanner } = getState();
    const tableHeadProps = {
        ...parseFromValuesOrFunc(mantineTableHeadProps, {
            table,
        }),
        ...rest,
    };
    const stickyHeader = enableStickyHeader || isFullScreen;
    return (_jsx(TableThead, { ...tableHeadProps, className: clsx(classes.root, layoutMode?.startsWith('grid')
            ? classes['root-grid']
            : classes['root-table-row-group'], stickyHeader && classes['root-sticky'], tableHeadProps?.className), pos: stickyHeader && layoutMode?.startsWith('grid') ? 'sticky' : 'relative', ref: (ref) => {
            tableHeadRef.current = ref;
            if (tableHeadProps?.ref) {
                // @ts-ignore
                tableHeadProps.ref.current = ref;
            }
        }, children: positionToolbarAlertBanner === 'head-overlay' &&
            (showAlertBanner || getSelectedRowModel().rows.length > 0) ? (_jsx(TableTr, { className: clsx(classes['banner-tr'], layoutMode?.startsWith('grid') && classes.grid), children: _jsx(TableTh, { className: clsx(classes['banner-th'], layoutMode?.startsWith('grid') && classes.grid), colSpan: table.getVisibleLeafColumns().length, children: _jsx(MRT_ToolbarAlertBanner, { table: table }) }) })) : (getHeaderGroups().map((headerGroup) => (_jsx(MRT_TableHeadRow, { columnVirtualizer: columnVirtualizer, headerGroup: headerGroup, table: table }, headerGroup.id)))) }));
};
//# sourceMappingURL=MRT_TableHead.js.map