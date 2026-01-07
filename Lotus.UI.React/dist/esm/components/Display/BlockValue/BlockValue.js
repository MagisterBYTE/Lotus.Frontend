import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper, TBorderSideSet } from '#base';
import { CssPropertiesHelper } from '#helpers';
import { Label } from '../Label';
export function BlockValue(props) {
    const { size = 'md', label, labelProps, value, valueProps, accentColor = 'blueGrey', accentBackground = false, asBadge = false, monospaceValue = false, ...otherProps } = props;
    // Радиус отключен
    if (Assert.emptyValue(otherProps.withBorder)) {
        // if (Assert.emptyValue(otherProps.bdRadius)) otherProps.bdRadius = size;
        if (Assert.emptyValue(otherProps.withBorder))
            otherProps.withBorder = true;
    }
    const modifyProps = { ...otherProps };
    modifyProps.withBorder = TBorderSideSet.Right | TBorderSideSet.Top | TBorderSideSet.Bottom;
    const styleBaseContainer = {
        background: accentBackground ? ColorCssHelper.getColorCssWithAlpha(accentColor, 0.1) : '(var --mantine-color-body)',
        // borderRadius: BorderPropertiesHelper.getBorderRadiusPropsValue(size),
        borderLeft: `4px solid ${ColorCssHelper.getColorCss(accentColor)}`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        width: 'max-content',
        ...MarginPropertiesHelper.createMarginProps(props),
        ...PaddingPropertiesHelper.createPaddingProps(props),
        ...ContainerPropertiesHelper.createContainerProps(props),
        ...BorderPropertiesHelper.createBorderProps(modifyProps),
        ...BorderPropertiesHelper.createBorderShadowProps(props)
    };
    const blockValueClass = css({ ...styleBaseContainer, label: 'BlockValue' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return (_jsxs("div", { className: blockValueClass, ...domProps, children: [_jsx(Label, { fontBold: true, fontSize: size, isBlock: true, mb: size, textColor: accentColor, ...labelProps, children: label }), _jsx(Label, { asBadge: asBadge ? accentColor : undefined, bdRadius: asBadge ? (valueProps?.bdRadius ?? size) : undefined, fontSize: size, isBlock: true, p: asBadge ? (valueProps?.p ?? otherProps.p ?? size) : undefined, ...valueProps, children: value })] }));
}
//# sourceMappingURL=BlockValue.js.map