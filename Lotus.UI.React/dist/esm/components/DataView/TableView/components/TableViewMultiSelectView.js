import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { ItemsHelper } from 'lotus-core';
import { HorizontalStack } from '#components/Layout';
import { RenderItem } from '#render';
import { TSizeTypes } from '#types';
export function TableViewMultiSelectView(props) {
    const { property, cell, row, contextRender } = props;
    if (property.rendering && property.rendering.enabled) {
        return _jsx(_Fragment, { children: property.rendering.renderField(row.original, contextRender) });
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const massive = cell.getValue();
        const items = property.possibleValues;
        const selectedItems = ItemsHelper.getItemsByValues(items, massive);
        const size = contextRender.size ?? 'md';
        return (_jsx(HorizontalStack, { wrap: true, spacing: 'md', children: selectedItems.map((x) => {
                return RenderItem.renderItem(size, x, undefined, { withBorder: true, bdRadius: size, p: TSizeTypes.prev(size, 3) });
            }) }));
    }
}
//# sourceMappingURL=TableViewMultiSelectView.js.map