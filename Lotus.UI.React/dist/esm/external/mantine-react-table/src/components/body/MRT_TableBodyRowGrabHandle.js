import { jsx as _jsx } from "react/jsx-runtime";
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
export const MRT_TableBodyRowGrabHandle = ({ row, rowRef, table, ...rest }) => {
    const { options: { mantineRowDragHandleProps }, } = table;
    const actionIconProps = {
        ...parseFromValuesOrFunc(mantineRowDragHandleProps, {
            row,
            table,
        }),
        ...rest,
    };
    const handleDragStart = (event) => {
        actionIconProps?.onDragStart?.(event);
        event.dataTransfer.setDragImage(rowRef.current, 0, 0);
        table.setDraggingRow(row);
    };
    const handleDragEnd = (event) => {
        actionIconProps?.onDragEnd?.(event);
        table.setDraggingRow(null);
        table.setHoveredRow(null);
    };
    return (_jsx(MRT_GrabHandleButton, { actionIconProps: actionIconProps, onDragEnd: handleDragEnd, onDragStart: handleDragStart, table: table }));
};
//# sourceMappingURL=MRT_TableBodyRowGrabHandle.js.map