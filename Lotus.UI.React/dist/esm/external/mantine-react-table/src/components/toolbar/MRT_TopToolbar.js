import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import commonClasses from './common.styles.module.css';
import classes from './MRT_TopToolbar.module.css';
import { Box, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MRT_ProgressBar } from './MRT_ProgressBar';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_GlobalFilterTextInput } from '../inputs/MRT_GlobalFilterTextInput';
export const MRT_TopToolbar = ({ table, ...rest }) => {
    const { getState, options: { enableGlobalFilter, enablePagination, enableToolbarInternalActions, mantineTopToolbarProps, positionGlobalFilter, positionPagination, positionToolbarAlertBanner, positionToolbarDropZone, renderTopToolbarCustomActions, }, refs: { topToolbarRef }, } = table;
    const { isFullScreen, showGlobalFilter } = getState();
    const isMobile = useMediaQuery('(max-width:720px)');
    const isTablet = useMediaQuery('(max-width:1024px)');
    const toolbarProps = {
        ...parseFromValuesOrFunc(mantineTopToolbarProps, { table }),
        ...rest,
    };
    const stackAlertBanner = isMobile ||
        !!renderTopToolbarCustomActions ||
        (showGlobalFilter && isTablet);
    const globalFilterProps = {
        style: !isTablet
            ? {
                zIndex: 3,
            }
            : undefined,
        table,
    };
    return (_jsxs(Box, { ...toolbarProps, className: clsx(commonClasses['common-toolbar-styles'], classes['root'], isFullScreen && classes['root-fullscreen'], toolbarProps?.className), ref: (node) => {
            if (node) {
                topToolbarRef.current = node;
                if (toolbarProps?.ref) {
                    toolbarProps.ref.current = node;
                }
            }
        }, children: [positionToolbarAlertBanner === 'top' && (_jsx(MRT_ToolbarAlertBanner, { stackAlertBanner: stackAlertBanner, table: table })), ['both', 'top'].includes(positionToolbarDropZone ?? '') && (_jsx(MRT_ToolbarDropZone, { table: table })), _jsxs(Flex, { className: clsx(classes['actions-container'], stackAlertBanner && classes['actions-container-stack-alert']), children: [enableGlobalFilter && positionGlobalFilter === 'left' && (_jsx(MRT_GlobalFilterTextInput, { ...globalFilterProps })), renderTopToolbarCustomActions?.({ table }) ?? _jsx("span", {}), enableToolbarInternalActions ? (_jsxs(Flex, { justify: 'end', wrap: 'wrap-reverse', children: [enableGlobalFilter && positionGlobalFilter === 'right' && (_jsx(MRT_GlobalFilterTextInput, { ...globalFilterProps })), _jsx(MRT_ToolbarInternalButtons, { table: table })] })) : (enableGlobalFilter &&
                        positionGlobalFilter === 'right' && (_jsx(MRT_GlobalFilterTextInput, { ...globalFilterProps })))] }), enablePagination &&
                ['both', 'top'].includes(positionPagination ?? '') && (_jsx(Flex, { justify: "end", children: _jsx(MRT_TablePagination, { position: "top", table: table }) })), _jsx(MRT_ProgressBar, { isTopToolbar: true, table: table })] }));
};
//# sourceMappingURL=MRT_TopToolbar.js.map