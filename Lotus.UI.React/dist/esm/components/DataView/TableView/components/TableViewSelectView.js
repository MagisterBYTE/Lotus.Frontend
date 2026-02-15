import { ItemsHelper } from 'lotus-core';
import { RenderItem } from '#render';
export function TableViewSelectView(props) {
    const { property, row, cell, contextRender } = props;
    // Собственный режим отображения
    if (property.rendering && property.rendering.enabled) {
        return property.rendering.renderField(row.original, contextRender);
    }
    else {
        const id = cell.getValue();
        const items = property.possibleValues;
        const item = ItemsHelper.getItemByValueOrUndefined(items, id);
        const size = contextRender.size ?? 'md';
        return RenderItem.renderItem(size, item, undefined, {});
    }
}
//# sourceMappingURL=TableViewSelectView.js.map