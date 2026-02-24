import { jsx as _jsx } from "react/jsx-runtime";
import { ItemsHelper } from 'lotus-core';
import { Primitive } from '#components/Common';
const styleContainerItem = {};
export function TableViewSelectView(props) {
    const { property, row, cell, contextRender, imageDatabase } = props;
    // Собственный режим отображения
    if (property.rendering && property.rendering.enabled) {
        return property.rendering.renderField(row.original, contextRender);
    }
    else {
        const id = cell.getValue();
        const items = property.possibleValues;
        const item = ItemsHelper.getItemByValueOrUndefined(items, id);
        const size = contextRender.size;
        return _jsx(Primitive.Item, { imageDatabase: imageDatabase, item: item, size: size, wrapContainer: styleContainerItem });
    }
}
//# sourceMappingURL=TableViewSelectView.js.map