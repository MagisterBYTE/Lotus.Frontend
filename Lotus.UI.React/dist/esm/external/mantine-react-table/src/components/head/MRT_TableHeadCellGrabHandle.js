import { jsx as _jsx } from "react/jsx-runtime";
import { reorderColumn } from '../../utils/column.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
export const MRT_TableHeadCellGrabHandle = ({ column, table, tableHeadCellRef, ...rest }) => {
    const { getState, options: { enableColumnOrdering, mantineColumnDragHandleProps }, setColumnOrder, setDraggingColumn, setHoveredColumn, } = table;
    const { columnDef } = column;
    const { columnOrder, draggingColumn, hoveredColumn } = getState();
    const arg = { column, table };
    const actionIconProps = {
        ...parseFromValuesOrFunc(mantineColumnDragHandleProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineColumnDragHandleProps, arg),
        ...rest,
    };
    const handleDragStart = (event) => {
        actionIconProps?.onDragStart?.(event);
        setDraggingColumn(column);
        event.dataTransfer.setDragImage(tableHeadCellRef.current, 0, 0);
    };
    const handleDragEnd = (event) => {
        actionIconProps?.onDragEnd?.(event);
        if (hoveredColumn?.id === 'drop-zone') {
            column.toggleGrouping();
        }
        else if (enableColumnOrdering &&
            hoveredColumn &&
            hoveredColumn?.id !== draggingColumn?.id) {
            setColumnOrder(reorderColumn(column, hoveredColumn, columnOrder));
        }
        setDraggingColumn(null);
        setHoveredColumn(null);
    };
    return (_jsx(MRT_GrabHandleButton, { actionIconProps: actionIconProps, onDragEnd: handleDragEnd, onDragStart: handleDragStart, table: table }));
};
//# sourceMappingURL=MRT_TableHeadCellGrabHandle.js.map