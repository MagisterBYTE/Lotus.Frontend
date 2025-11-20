import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_ToolbarDropZone.module.css';
import { useEffect } from 'react';
import { Flex, Text, Transition } from '@mantine/core';
export const MRT_ToolbarDropZone = ({ table, ...rest }) => {
    const { getState, options: { enableGrouping, localization }, setHoveredColumn, setShowToolbarDropZone, } = table;
    const { draggingColumn, grouping, hoveredColumn, showToolbarDropZone } = getState();
    const handleDragEnter = (_event) => {
        setHoveredColumn({ id: 'drop-zone' });
    };
    useEffect(() => {
        if (table.options.state?.showToolbarDropZone !== undefined) {
            setShowToolbarDropZone(!!enableGrouping &&
                !!draggingColumn &&
                draggingColumn.columnDef.enableGrouping !== false &&
                !grouping.includes(draggingColumn.id));
        }
    }, [enableGrouping, draggingColumn, grouping]);
    return (_jsx(Transition, { mounted: showToolbarDropZone, transition: "fade", children: () => (_jsx(Flex, { className: clsx('mrt-toolbar-dropzone', classes.root, hoveredColumn?.id === 'drop-zone' && classes.hovered), onDragEnter: handleDragEnter, ...rest, children: _jsx(Text, { children: localization.dropToGroupBy.replace('{column}', draggingColumn?.columnDef?.header ?? '') }) })) }));
};
//# sourceMappingURL=MRT_ToolbarDropZone.js.map