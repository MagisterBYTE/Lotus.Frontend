import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
export const MRT_RowPinButton = ({ pinningPosition, row, table, ...rest }) => {
    const { options: { icons: { IconPinned, IconX }, localization, rowPinningDisplayMode, }, } = table;
    const isPinned = row.getIsPinned();
    const [tooltipOpened, setTooltipOpened] = useState(false);
    const handleTogglePin = (event) => {
        setTooltipOpened(false);
        event.stopPropagation();
        row.pin(isPinned ? false : pinningPosition);
    };
    return (_jsx(Tooltip, { label: isPinned ? localization.unpin : localization.pin, openDelay: 1000, opened: tooltipOpened, children: _jsx(ActionIcon, { "aria-label": localization.pin, color: "gray", onClick: handleTogglePin, onMouseEnter: () => setTooltipOpened(true), onMouseLeave: () => setTooltipOpened(false), size: "xs", style: {
                height: '24px',
                width: '24px',
            }, variant: "subtle", ...rest, children: isPinned ? (_jsx(IconX, {})) : (_jsx(IconPinned, { fontSize: "small", style: {
                    transform: `rotate(${rowPinningDisplayMode === 'sticky'
                        ? 135
                        : pinningPosition === 'top'
                            ? 180
                            : 0}deg)`,
                } })) }) }));
};
//# sourceMappingURL=MRT_RowPinButton.js.map