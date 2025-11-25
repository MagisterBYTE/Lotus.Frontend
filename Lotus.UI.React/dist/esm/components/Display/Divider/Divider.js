import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { CssBorderHelper, CssPropertiesHelper, CssSpacingHelper } from '#helpers';
export function Divider(props) {
    const { isVertical = false, lineStyle = 'solid', lineColor, lineThickness = '1px', nml, nmr, nmt, nmb, children, ...otherProps } = props;
    const styleDiv = {
        borderTopStyle: lineStyle,
        borderTopWidth: lineThickness,
        borderTopColor: CssBorderHelper.getBorderColorPropsValue(lineColor),
        ...CssSpacingHelper.getPaddingProps(props),
        ...CssSpacingHelper.getMarginProps(props)
    };
    if (nml) {
        styleDiv.marginLeft = CssSpacingHelper.getMarginPropsValue(props.ml, true);
    }
    if (nmr) {
        styleDiv.marginRight = CssSpacingHelper.getMarginPropsValue(props.mr, true);
    }
    if (nmt) {
        styleDiv.marginTop = CssSpacingHelper.getMarginPropsValue(props.mt, true);
    }
    if (nmb) {
        styleDiv.marginBottom = CssSpacingHelper.getMarginPropsValue(props.mb, true);
    }
    const dividerClass = css({ ...styleDiv, label: 'Divider' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return (_jsx("div", { className: dividerClass, ...domProps, children: children }));
}
//# sourceMappingURL=Divider.js.map