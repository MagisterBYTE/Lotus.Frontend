import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Text } from '#components/Display';
export function TableViewTextView(props) {
    const { property, row, cell, contextRender } = props;
    if (property.rendering && property.rendering.enabled) {
        // Собственный режим отображения
        return _jsx(_Fragment, { children: property.rendering.renderField(row.original, contextRender) });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return _jsx(Text, { fontSize: contextRender.size, ...property.visualSettings?.propsView, children: cell.getValue() });
}
//# sourceMappingURL=TableViewTextView.js.map