import { jsx as _jsx } from "react/jsx-runtime";
import { BuilderCssProperties } from '#builder';
import { CssPropertiesHelper } from '#helpers';
export function Box(props) {
    const { centerContent, children, ...otherProps } = props;
    const styleDiv = {
        ...otherProps.style
    };
    BuilderCssProperties.fillContainer(styleDiv, props, false);
    BuilderCssProperties.fillBackground(styleDiv, props, false);
    if (centerContent === 'horizontally') {
        styleDiv.display = 'grid';
        styleDiv.justifyItems = 'center';
        styleDiv.alignItems = 'start';
    }
    if (centerContent === 'vertically') {
        styleDiv.display = 'grid';
        styleDiv.alignItems = 'center';
    }
    if (centerContent === 'center') {
        styleDiv.display = 'grid';
        styleDiv.justifyItems = 'center';
        styleDiv.alignItems = 'center';
    }
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return _jsx("div", { ...domProps, style: styleDiv, children: children });
}
//# sourceMappingURL=Box.js.map