import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from '#components/Display';
export function TableViewTextView(props) {
    const { property, cell, row, contextRender } = props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actualValue = cell.getValue();
    if (property.rendering && property.rendering.enabled) {
        // Собственный режим отображения
        return property.rendering.renderField(row.original, contextRender, actualValue);
    }
    return _jsx(Text, { fontSize: contextRender.size, ...property.visualSettings?.propsView, children: actualValue });
}
//# sourceMappingURL=TableViewTextView.js.map