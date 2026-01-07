import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { Assert } from 'lotus-core/utils';
import { isValidElement } from 'react';
import { BackgroundPropertiesHelper, BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { Label } from '#components/Display';
import { FontSizes, MarginSizes, PaddingSizes } from '#designSystem/sizes';
import { CssPropertiesHelper } from '#helpers';
function buildPanelProps(props) {
    if (props.centerContent === 'horizontally') {
        return {
            display: 'grid',
            justifyItems: 'center',
            alignItems: 'start'
        };
    }
    if (props.centerContent === 'vertically') {
        return {
            display: 'grid',
            alignItems: 'center'
        };
    }
    if (props.centerContent === 'center') {
        return {
            display: 'grid',
            justifyItems: 'center',
            alignItems: 'center'
        };
    }
    return {};
}
// eslint-disable-next-line complexity
export function Panel(props) {
    const { centerContent, size = 'md', header, headerProps, children, ...otherProps } = props;
    const isHeaderComponent = isValidElement(header);
    const isHeaderText = typeof header === 'string';
    const styleDiv = {
        ...MarginPropertiesHelper.createMarginProps(props),
        ...PaddingPropertiesHelper.createPaddingProps(props),
        ...ContainerPropertiesHelper.createContainerProps(props),
        ...BackgroundPropertiesHelper.createBackgroundProps(props),
        ...BackgroundPropertiesHelper.createBoxShadowProps(props),
        ...BorderPropertiesHelper.createBorderProps(props),
        ...BorderPropertiesHelper.createBorderShadowProps(props),
        ...buildPanelProps(props)
    };
    // eslint-disable-next-line complexity
    function getHeaderStyle() {
        const hFontSize = FontSizes.Default.toPixel(size ?? headerProps?.fontSize ?? 'md');
        let topOffset = hFontSize + (BorderPropertiesHelper.hasBorderProps(props) ? -MarginSizes.Default.toPixel(props.bdWidth ?? 2) : 0);
        topOffset -= PaddingSizes.Default.toPixel(headerProps?.p ?? headerProps?.pt ?? 'md');
        topOffset -= PaddingSizes.Default.toPixel(headerProps?.p ?? headerProps?.pb ?? 'md');
        topOffset -= 2;
        const headerStyle = {
            position: 'absolute',
            background: headerProps?.style?.backgroundColor ?? BackgroundPropertiesHelper.getBackgroundColorPropsValue(otherProps.bgColor) ?? 'var(--mantine-color-default)',
            top: headerProps?.style?.top ?? `${topOffset + MarginSizes.Default.toPixel(props.m ?? props.mt ?? 0)}px`,
            left: headerProps?.style?.left ?? `${40 + MarginSizes.Default.toPixel(props.m ?? props.ml ?? 0)}px`
        };
        return { ...headerStyle, ...headerProps?.style };
    }
    const panelClass = css({ ...styleDiv, label: 'Panel' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    if (Assert.existValue(headerProps) || isHeaderText) {
        return (_jsxs("div", { className: panelClass, ...domProps, children: [isHeaderComponent && header, isHeaderComponent === false && (_jsx(Label, { ...headerProps, 
                    // eslint-disable-next-line react/no-children-prop
                    children: isHeaderText ? header : headerProps?.children, bdColor: headerProps?.bdColor ?? otherProps.bdColor, bdRadius: headerProps?.bdRadius ?? otherProps.bdRadius, bdShadow: headerProps?.bdShadow ?? otherProps.bdShadow, bdStyle: headerProps?.bdStyle ?? otherProps.bdStyle, bdWidth: headerProps?.bdWidth ?? otherProps.bdWidth, p: headerProps?.p ?? 'xxs', style: getHeaderStyle(), withBorder: headerProps?.withBorder ?? otherProps.withBorder })), children] }));
    }
    if (isHeaderComponent) {
        return (_jsxs("div", { className: panelClass, ...domProps, children: [header, children] }));
    }
    return (_jsx("div", { className: panelClass, ...domProps, children: children }));
}
//# sourceMappingURL=Panel.js.map