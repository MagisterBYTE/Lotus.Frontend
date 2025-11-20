import { jsx as _jsx } from "react/jsx-runtime";
import { BuilderCssProperties } from '#builder';
import { CssPropertiesHelper, CssSpacingHelper } from '#helpers';
export function HorizontalStack(props) {
    const { spacing, vAlign, hAlign, children, ...otherProps } = props;
    const styleDiv = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: vAlign ?? 'baseline',
        justifyContent: hAlign ?? 'flex-start',
        columnGap: CssSpacingHelper.getGapPropsValue(spacing),
        ...otherProps.style
    };
    BuilderCssProperties.fillContainer(styleDiv, props, false);
    BuilderCssProperties.fillBackground(styleDiv, props, false);
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return _jsx("div", { ...domProps, style: styleDiv, children: children });
}
;
//# sourceMappingURL=HorizontalStack.js.map