import { jsx as _jsx } from "react/jsx-runtime";
import { ItemsHelper } from 'lotus-core';
import { Primitive } from '#components/Common';
import { HorizontalStack } from '#components/Layout';
import { TSizeTypes } from '#types';
export function TableViewMultiSelectView(props) {
    const { property, cell, row, contextRender, imageDatabase } = props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const massive = cell.getValue();
    const items = property.possibleValues;
    const selectedItems = ItemsHelper.getItemsByValues(items, massive);
    if (property.rendering && property.rendering.enabled) {
        return property.rendering.renderField(row.original, contextRender, selectedItems);
    }
    else {
        const size = contextRender.size ?? 'md';
        const styleContainerItem = { withBorder: true, bdRadius: size, p: TSizeTypes.prev(size, 3) };
        return (_jsx(HorizontalStack, { wrap: true, spacing: 'md', children: selectedItems.map((item, index) => {
                // eslint-disable-next-line react/no-array-index-key
                return _jsx(Primitive.Item, { imageDatabase: imageDatabase, item: item, size: size, wrapContainer: styleContainerItem }, index);
            }) }));
    }
}
//# sourceMappingURL=TableViewMultiSelectView.js.map