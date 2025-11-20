import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_RowPinButton } from '../buttons/MRT_RowPinButton';
export const MRT_TableBodyRowPinButton = ({ row, table, ...rest }) => {
    const { getState, options: { enableRowPinning, rowPinningDisplayMode }, } = table;
    const { density } = getState();
    const canPin = parseFromValuesOrFunc(enableRowPinning, row);
    if (!canPin)
        return null;
    const rowPinButtonProps = {
        row,
        table,
        ...rest,
    };
    if (rowPinningDisplayMode === 'top-and-bottom' && !row.getIsPinned()) {
        return (_jsxs(Box, { style: {
                display: 'flex',
                flexDirection: density === 'xs' ? 'row' : 'column',
            }, children: [_jsx(MRT_RowPinButton, { pinningPosition: "top", ...rowPinButtonProps }), _jsx(MRT_RowPinButton, { pinningPosition: "bottom", ...rowPinButtonProps })] }));
    }
    return (_jsx(MRT_RowPinButton, { pinningPosition: rowPinningDisplayMode === 'bottom' ? 'bottom' : 'top', ...rowPinButtonProps }));
};
//# sourceMappingURL=MRT_TableBodyRowPinButton.js.map