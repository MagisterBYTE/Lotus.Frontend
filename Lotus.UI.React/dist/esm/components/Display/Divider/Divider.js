import { jsx as _jsx } from "react/jsx-runtime";
import { CssBorderHelper, CssPropertiesHelper, CssSpacingHelper } from '#helpers';
export function Divider(props) {
    const { isVertical, lineStyle = 'solid', lineColor, lineThickness = '1px', nml, nmr, nmt, nmb, children, ...otherProps } = props;
    const styleDiv = {
        borderTopStyle: lineStyle,
        borderTopWidth: lineThickness,
        borderTopColor: CssBorderHelper.getBorderColorPropsValue(lineColor),
        ...otherProps.style
    };
    // Padding и Margin
    CssSpacingHelper.fillPaddingProps(styleDiv, props, false);
    CssSpacingHelper.fillMarginProps(styleDiv, props, false);
    if (Boolean(nml)) {
        styleDiv.marginLeft = CssSpacingHelper.getMarginPropsValue(props.ml, true);
    }
    if (Boolean(nmr)) {
        styleDiv.marginRight = CssSpacingHelper.getMarginPropsValue(props.mr, true);
    }
    if (Boolean(nmt)) {
        styleDiv.marginTop = CssSpacingHelper.getMarginPropsValue(props.mt, true);
    }
    if (Boolean(nmb)) {
        styleDiv.marginBottom = CssSpacingHelper.getMarginPropsValue(props.mb, true);
    }
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return (_jsx("div", { ...domProps, style: styleDiv, children: children }));
}
//# sourceMappingURL=Divider.js.map