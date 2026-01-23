import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { Assert } from 'lotus-core/utils';
import { isValidElement } from 'react';
import { BackgroundPropertiesHelper, BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { Label } from '#components/Display';
import { PaddingSizes } from '#designSystem/sizes';
import { CssPropertiesHelper } from '#helpers';
function buildPanelProps(props) {
    // Если есть заголовок, который будет абсолютно позиционирован,
    // возможно, не стоит использовать grid для центрирования основного контента
    if (props.centerContent === 'horizontally') {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
        };
    }
    if (props.centerContent === 'vertically') {
        return {
            display: 'flex',
            alignItems: 'center'
        };
    }
    if (props.centerContent === 'center') {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        };
    }
    return {};
}
// eslint-disable-next-line complexity
export function Panel(props) {
    const { centerContent, size = 'md', header, headerOffsetPercent = 5, headerProps, children, p, pt, ...otherProps } = props;
    const isHeaderComponent = isValidElement(header);
    const isHeaderText = typeof header === 'string';
    const paddingSizeTopNeed = PaddingSizes.Default.toSizePrimitive(size);
    const paddingSizeTopProps = PaddingSizes.Default.toPixel(p ?? pt);
    const styleDiv = {
        ...MarginPropertiesHelper.createMarginProps(props),
        ...PaddingPropertiesHelper.createPaddingProps(props),
        ...ContainerPropertiesHelper.createContainerProps(props),
        ...BackgroundPropertiesHelper.createBackgroundProps(props),
        ...BackgroundPropertiesHelper.createBoxShadowProps(props),
        ...BorderPropertiesHelper.createBorderProps(props),
        ...BorderPropertiesHelper.createBorderShadowProps(props),
        ...buildPanelProps(props),
        position: 'relative', // Добавляем для абсолютного позиционирования заголовка
        paddingTop: paddingSizeTopNeed.add(paddingSizeTopProps).toRem()
    };
    function getHeaderStyle() {
        const headerStyle = {
            position: 'absolute',
            background: headerProps?.style?.backgroundColor ?? BackgroundPropertiesHelper.getBackgroundColorPropsValue(otherProps.bgColor) ?? 'var(--mantine-color-default)',
            top: 0,
            left: `${headerOffsetPercent}%`,
            zIndex: 1, // Чтобы заголовок был над границей
            transform: 'translate(-50%, -50%)' // Сдвигаем на половину ширины и высоты
        };
        return { ...headerStyle, ...headerProps?.style };
    }
    const panelClass = css({ ...styleDiv, label: 'Panel' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    if (Assert.existValue(headerProps) || isHeaderText) {
        return (_jsxs("div", { className: panelClass, ...domProps, children: [isHeaderComponent && header, isHeaderComponent === false && (_jsx(Label, { ...headerProps, 
                    // eslint-disable-next-line react/no-children-prop
                    children: isHeaderText ? header : headerProps?.children, bdColor: headerProps?.bdColor ?? otherProps.bdColor, bdRadius: headerProps?.bdRadius ?? otherProps.bdRadius, bdShadow: headerProps?.bdShadow ?? otherProps.bdShadow, bdStyle: headerProps?.bdStyle ?? otherProps.bdStyle, bdWidth: headerProps?.bdWidth ?? otherProps.bdWidth, fontSize: headerProps?.fontSize ?? size, p: headerProps?.p ?? 'xxs', style: getHeaderStyle(), withBorder: headerProps?.withBorder ?? otherProps.withBorder })), children] }));
    }
    if (isHeaderComponent) {
        return (_jsxs("div", { className: panelClass, ...domProps, children: [header, children] }));
    }
    return (_jsx("div", { className: panelClass, ...domProps, children: children }));
}
//# sourceMappingURL=Panel.js.map