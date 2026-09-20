import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { isValidElement, useMemo } from 'react';
import { Table, darken, lighten, useMantineColorScheme } from '@mantine/core';
import { useMRT_ColumnVirtualizer } from '../../hooks/useMRT_ColumnVirtualizer';
import { parseCSSVarId } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_TableBody, Memo_MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { MRT_TableHead } from '../head/MRT_TableHead';
import classes from './MRT_Table.module.css';
export const MRT_Table = ({ table, specificTableBody, ...rest }) => {
    const { getFlatHeaders, state, options: { columns, enableBottomToolbar, enableTableFooter, enableTableHead, enableTopToolbar, layoutMode, mantineTableProps, memoMode, }, } = table;
    const { columnSizing, columnResizing, columnVisibility, density } = state;
    const tableProps = {
        highlightOnHover: true,
        horizontalSpacing: density,
        verticalSpacing: density,
        ...parseFromValuesOrFunc(mantineTableProps, { table }),
        ...rest,
    };
    const columnSizeVars = useMemo(() => {
        const headers = getFlatHeaders();
        const colSizes = {};
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const colSize = header.getSize();
            colSizes[`--header-${parseCSSVarId(header.id)}-size`] = colSize;
            colSizes[`--col-${parseCSSVarId(header.column.id)}-size`] = colSize;
        }
        return colSizes;
    }, [columns, columnSizing, columnResizing, columnVisibility]);
    const columnVirtualizer = useMRT_ColumnVirtualizer(table);
    const commonTableGroupProps = {
        columnVirtualizer,
        table,
    };
    const { colorScheme } = useMantineColorScheme();
    const { stripedColor } = tableProps;
    return (_jsx(Table, { className: clsx('mrt-table', classes.root, layoutMode?.startsWith('grid') && classes['root-grid'], tableProps.className), ...tableProps, __vars: {
            ...columnSizeVars,
            '--mrt-striped-row-background-color': stripedColor,
            '--mrt-striped-row-hover-background-color': stripedColor
                ? colorScheme === 'dark'
                    ? lighten(stripedColor, 0.08)
                    : darken(stripedColor, 0.12)
                : undefined,
            ...tableProps.__vars,
        }, children: isValidElement(specificTableBody) ? (_jsxs("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                height: `calc(100vh - ${(enableTableHead ? 60 : 0) +
                    (enableTableFooter ? 60 : 0) +
                    (enableTopToolbar ? 70 : 0) +
                    (enableBottomToolbar ? 60 : 0)}px)`,
            }, children: [enableTableHead && _jsx(MRT_TableHead, { ...commonTableGroupProps }), specificTableBody] })) : (_jsxs(_Fragment, { children: [enableTableHead && _jsx(MRT_TableHead, { ...commonTableGroupProps }), memoMode === 'table-body' || columnResizing.isResizingColumn ? (_jsx(Memo_MRT_TableBody, { ...commonTableGroupProps, tableProps: tableProps })) : (_jsx(MRT_TableBody, { ...commonTableGroupProps, tableProps: tableProps })), enableTableFooter && _jsx(MRT_TableFooter, { ...commonTableGroupProps })] })) }));
};
//# sourceMappingURL=MRT_Table.js.map