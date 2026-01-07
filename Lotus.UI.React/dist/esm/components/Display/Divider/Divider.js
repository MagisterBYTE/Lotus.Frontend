import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { BorderPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { MarginSizes } from '#designSystem/sizes';
import { CssVariables } from '#designSystem/сssVariables';
import { CssPropertiesHelper } from '#helpers';
export function Divider(props) {
    const { isVertical = false, lineStyle = 'solid', lineColor, lineThickness = '1px', nml, nmr, nmt, nmb, children, ...otherProps } = props;
    const styleDiv = {
        borderTopStyle: lineStyle,
        borderTopWidth: lineThickness,
        borderTopColor: BorderPropertiesHelper.getBorderColorPropsValue(lineColor) ?? CssVariables.BorderColor,
        ...MarginPropertiesHelper.createMarginProps(props),
        ...PaddingPropertiesHelper.createPaddingProps(props)
    };
    if (nml) {
        styleDiv.marginLeft = MarginSizes.Default.toCssNegative(props.ml);
    }
    if (nmr) {
        styleDiv.marginRight = MarginSizes.Default.toCssNegative(props.mr);
    }
    if (nmt) {
        styleDiv.marginTop = MarginSizes.Default.toCssNegative(props.mt);
    }
    if (nmb) {
        styleDiv.marginBottom = MarginSizes.Default.toCssNegative(props.mb);
    }
    const dividerClass = css({ ...styleDiv, label: 'Divider' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return (_jsx("div", { className: dividerClass, ...domProps, children: children }));
}
//# sourceMappingURL=Divider.js.map