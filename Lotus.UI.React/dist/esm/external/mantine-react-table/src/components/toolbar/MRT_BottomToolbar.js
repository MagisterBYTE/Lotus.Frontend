import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import commonClasses from './common.styles.module.css';
import classes from './MRT_BottomToolbar.module.css';
import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MRT_ProgressBar } from './MRT_ProgressBar';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_BottomToolbar = ({ table, ...rest }) => {
    const { getState, options: { enablePagination, mantineBottomToolbarProps, positionPagination, positionToolbarAlertBanner, positionToolbarDropZone, renderBottomToolbarCustomActions, }, refs: { bottomToolbarRef }, } = table;
    const { isFullScreen } = getState();
    const isMobile = useMediaQuery('(max-width: 720px)');
    const toolbarProps = {
        ...parseFromValuesOrFunc(mantineBottomToolbarProps, {
            table,
        }),
        ...rest,
    };
    const stackAlertBanner = isMobile || !!renderBottomToolbarCustomActions;
    return (_jsxs(Box, { ...toolbarProps, className: clsx('mrt-bottom-toolbar', classes.root, commonClasses['common-toolbar-styles'], isFullScreen && classes['root-fullscreen'], toolbarProps?.className), ref: (node) => {
            if (node) {
                bottomToolbarRef.current = node;
                if (toolbarProps?.ref) {
                    toolbarProps.ref.current = node;
                }
            }
        }, children: [_jsx(MRT_ProgressBar, { isTopToolbar: false, table: table }), positionToolbarAlertBanner === 'bottom' && (_jsx(MRT_ToolbarAlertBanner, { stackAlertBanner: stackAlertBanner, table: table })), ['both', 'bottom'].includes(positionToolbarDropZone ?? '') && (_jsx(MRT_ToolbarDropZone, { table: table })), _jsxs(Box, { className: classes['custom-toolbar-container'], children: [renderBottomToolbarCustomActions ? (renderBottomToolbarCustomActions({ table })) : (_jsx("span", {})), _jsx(Box, { className: clsx(classes['paginator-container'], stackAlertBanner && classes['paginator-container-alert-banner']), children: enablePagination &&
                            ['both', 'bottom'].includes(positionPagination ?? '') && (_jsx(MRT_TablePagination, { position: "bottom", table: table })) })] })] }));
};
//# sourceMappingURL=MRT_BottomToolbar.js.map