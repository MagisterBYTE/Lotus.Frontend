import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { useMemo } from 'react';
import { BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { CssPropertiesHelper } from '#helpers';
import { TBorderSideFlags } from '#types';
import { Label } from '../Label';
// eslint-disable-next-line complexity
export function BlockValue(props) {
    const { size = 'md', label, labelProps, value, valueProps, accentColor = 'blueGray', accentBackground = false, asBadge = false, monospaceValue = false, ...otherProps } = props;
    // 1. Подготовка пропсов для границ (без мутации входящих данных)
    const borderSides = TBorderSideFlags.Right | TBorderSideFlags.Top | TBorderSideFlags.Bottom;
    const borderProps = useMemo(() => ({
        ...otherProps,
        withBorder: BorderPropertiesHelper.hasBorderProps(otherProps) ? borderSides : undefined
    }), [otherProps]);
    // 2. Мемоизация основного стиля контейнера
    const blockValueStyle = useMemo(() => ({
        // background: accentBackground ? ColorCssHelper.getColorWithAlpha(accentColor, 0.1) : undefined,
        borderLeft: `4px solid ${ColorCssHelper.getColor(accentColor)}`,
        width: 'max-content',
        ...MarginPropertiesHelper.createMarginProps(otherProps),
        ...PaddingPropertiesHelper.createPaddingProps(otherProps),
        ...ContainerPropertiesHelper.createContainerProps(otherProps),
        ...BorderPropertiesHelper.createBorderProps(borderProps),
        ...BorderPropertiesHelper.createBorderShadowProps(otherProps)
    }), [otherProps, borderProps, accentColor, accentBackground]);
    // 3. Мемоизируем сгенерированный класс Emotion
    const blockValueClass = useMemo(() => css({ ...blockValueStyle, label: 'BlockValue' }), [blockValueStyle]);
    // 4. Фильтруем кастомные пропсы перед передачей в div
    const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);
    // 5. Расчет отступа для Label (зависит от size)
    const labelMarginBottom = useMemo(() => {
        switch (size) {
            case 'xxs': return '0.3rem';
            case 'xs': return '0.5rem';
            case 'sm': return '0.5rem';
            case 'md': return '0.5rem';
            case 'lg': return '0.75rem';
            case 'xl': return '0.75rem';
            case 'xxl': return '0.75rem';
        }
    }, [size]);
    return (_jsxs("div", { className: blockValueClass, ...domProps, children: [_jsx(Label, { fontBold: labelProps?.fontBold ?? true, fontSize: labelProps?.fontSize ?? size, iconSize: labelProps?.iconSize ?? size, isBlock: true, mb: labelMarginBottom, textColor: accentColor, ...labelProps, children: label }), _jsx(Label, { asBadge: asBadge ? accentColor : undefined, bdRadius: asBadge ? (valueProps?.bdRadius ?? size) : undefined, fontAccent: monospaceValue ? 'monospace' : undefined, fontSize: valueProps?.fontSize ?? size, iconSize: valueProps?.iconSize ?? size, isBlock: true, p: asBadge ? (valueProps?.p ?? otherProps.p ?? size) : undefined, ...valueProps, children: value })] }));
}
//# sourceMappingURL=BlockValue.js.map