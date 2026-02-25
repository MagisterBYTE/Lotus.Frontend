import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_TableContainer.module.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import { MRT_Table } from './MRT_Table';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_EditRowModal } from '../modals/MRT_EditRowModal';
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
export const MRT_TableContainer = ({ table, specificTableBody, ...rest }) => {
    const { getState, options: { createDisplayMode, editDisplayMode, enableStickyHeader, mantineLoadingOverlayProps, mantineTableContainerProps, }, refs: { bottomToolbarRef, tableContainerRef, topToolbarRef }, } = table;
    const { creatingRow, editingRow, isFullScreen, isLoading, showLoadingOverlay, } = getState();
    const [totalToolbarHeight, setTotalToolbarHeight] = useState(0);
    const tableContainerProps = {
        ...parseFromValuesOrFunc(mantineTableContainerProps, { table }),
        ...rest,
    };
    const loadingOverlayProps = parseFromValuesOrFunc(mantineLoadingOverlayProps, { table });
    useIsomorphicLayoutEffect(() => {
        const topToolbarHeight = typeof document !== 'undefined'
            ? (topToolbarRef.current?.offsetHeight ?? 0)
            : 0;
        const bottomToolbarHeight = typeof document !== 'undefined'
            ? (bottomToolbarRef?.current?.offsetHeight ?? 0)
            : 0;
        setTotalToolbarHeight(topToolbarHeight + bottomToolbarHeight);
    });
    const createModalOpen = createDisplayMode === 'modal' && creatingRow;
    const editModalOpen = editDisplayMode === 'modal' && editingRow;
    return (_jsxs(Box, { ...tableContainerProps, __vars: {
            '--mrt-top-toolbar-height': `${totalToolbarHeight}`,
            ...tableContainerProps?.__vars,
        }, className: clsx('mrt-table-container', classes.root, enableStickyHeader && classes['root-sticky'], isFullScreen && classes['root-fullscreen'], tableContainerProps?.className), ref: (node) => {
            if (node) {
                tableContainerRef.current = node;
                if (tableContainerProps?.ref) {
                    //@ts-ignore
                    tableContainerProps.ref.current = node;
                }
            }
        }, children: [_jsx(LoadingOverlay, { visible: isLoading || showLoadingOverlay, zIndex: 2, ...loadingOverlayProps }), _jsx(MRT_Table, { table: table, specificTableBody: specificTableBody }), (createModalOpen || editModalOpen) && (_jsx(MRT_EditRowModal, { open: true, table: table }))] }));
};
//# sourceMappingURL=MRT_TableContainer.js.map