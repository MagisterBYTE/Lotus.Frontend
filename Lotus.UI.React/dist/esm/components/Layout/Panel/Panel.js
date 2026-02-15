import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { Assert } from 'lotus-core/utils';
import { isValidElement, useMemo } from 'react';
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
    // 1. Мемоизируем объект стилей
    const panelStyle = useMemo(() => ({
        ...MarginPropertiesHelper.createMarginProps(otherProps),
        ...PaddingPropertiesHelper.createPaddingProps(otherProps),
        ...ContainerPropertiesHelper.createContainerProps(otherProps),
        ...BackgroundPropertiesHelper.createBackgroundProps(otherProps),
        ...BackgroundPropertiesHelper.createBoxShadowProps(otherProps),
        ...BorderPropertiesHelper.createBorderProps(otherProps),
        ...BorderPropertiesHelper.createBorderShadowProps(otherProps),
        ...buildPanelProps(props),
        position: 'relative', // Добавляем для абсолютного позиционирования заголовка
        paddingTop: paddingSizeTopNeed.add(paddingSizeTopProps).toRem()
    }), [otherProps, size, p, pt, centerContent]);
    // 1. Мемоизируем объект стилей
    const headerStyle = useMemo(() => {
        const headerBaseStyle = {
            position: 'absolute',
            background: headerProps?.style?.backgroundColor ?? BackgroundPropertiesHelper.getBackgroundColorPropsValue(otherProps.bgColor) ?? 'var(--mantine-color-default)',
            top: 0,
            left: `${headerOffsetPercent}%`,
            zIndex: 1, // Чтобы заголовок был над границей
            transform: 'translate(-50%, -50%)' // Сдвигаем на половину ширины и высоты
        };
        return { ...headerBaseStyle, ...headerProps?.style };
    }, [headerProps, headerOffsetPercent]);
    // 2. Мемоизируем сгенерированный класс Emotion
    const panelClass = useMemo(() => css({ ...panelStyle, label: 'Panel' }), [panelStyle]);
    // 3. Фильтруем кастомные пропсы перед передачей в div
    const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);
    if (Assert.existValue(headerProps) || isHeaderText) {
        return (_jsxs("div", { className: panelClass, ...domProps, children: [isHeaderComponent && header, isHeaderComponent === false && (_jsx(Label, { ...headerProps, 
                    // eslint-disable-next-line react/no-children-prop
                    children: isHeaderText ? header : headerProps?.children, bdColor: headerProps?.bdColor ?? otherProps.bdColor, bdRadius: headerProps?.bdRadius ?? otherProps.bdRadius, bdShadow: headerProps?.bdShadow ?? otherProps.bdShadow, bdStyle: headerProps?.bdStyle ?? otherProps.bdStyle, bdWidth: headerProps?.bdWidth ?? otherProps.bdWidth, fontSize: headerProps?.fontSize ?? size, p: headerProps?.p ?? 'xxs', style: headerStyle, withBorder: headerProps?.withBorder ?? otherProps.withBorder })), children] }));
    }
    if (isHeaderComponent) {
        return (_jsxs("div", { className: panelClass, ...domProps, children: [header, children] }));
    }
    return (_jsx("div", { className: panelClass, ...domProps, children: children }));
}
//# sourceMappingURL=Panel.js.map