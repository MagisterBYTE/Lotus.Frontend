import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { TableTfoot } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import classes from './MRT_TableFooter.module.css';
export const MRT_TableFooter = ({ columnVirtualizer, table, ...rest }) => {
    const { getFooterGroups, state, options: { enableStickyFooter, layoutMode, mantineTableFooterProps }, refs: { tableFooterRef }, } = table;
    const { isFullScreen } = state;
    const tableFooterProps = {
        ...parseFromValuesOrFunc(mantineTableFooterProps, {
            table,
        }),
        ...rest,
    };
    const stickFooter = (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;
    return (_jsx(TableTfoot, { ...tableFooterProps, className: clsx(classes.root, tableFooterProps?.className, stickFooter && classes.sticky, layoutMode?.startsWith('grid') && classes.grid), ref: (ref) => {
            tableFooterRef.current = ref;
            if (tableFooterProps?.ref) {
                // @ts-ignore
                tableFooterProps.ref.current = ref;
            }
        }, children: getFooterGroups().map((footerGroup) => (_jsx(MRT_TableFooterRow, { columnVirtualizer: columnVirtualizer, footerGroup: footerGroup, table: table }, footerGroup.id))) }));
};
//# sourceMappingURL=MRT_TableFooter.js.map