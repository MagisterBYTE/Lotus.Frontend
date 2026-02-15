import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { useMemo } from 'react';
import { BorderPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { MarginSizes } from '#designSystem/sizes';
import { CssVariables } from '#designSystem/сssVariables';
import { CssPropertiesHelper } from '#helpers';
export function Divider(props) {
    const { isVertical = false, lineStyle = 'solid', lineColor, lineThickness = '1px', nml, nmr, nmt, nmb, children, ...otherProps } = props;
    // 1. Мемоизируем объект стилей
    const dividerStyle = useMemo(() => {
        const color = BorderPropertiesHelper.getBorderColorPropsValue(lineColor) ?? CssVariables.BorderColor;
        const styles = {
            // Динамическое переключение границы в зависимости от ориентации
            borderTop: !isVertical ? `${lineThickness} ${lineStyle} ${color}` : undefined,
            borderLeft: isVertical ? `${lineThickness} ${lineStyle} ${color}` : undefined,
            height: isVertical ? '100%' : undefined,
            width: !isVertical ? '100%' : undefined,
            display: isVertical ? 'inline-block' : 'block',
            ...MarginPropertiesHelper.createMarginProps(otherProps),
            ...PaddingPropertiesHelper.createPaddingProps(otherProps)
        };
        // Обработка отрицательных маржинов (Negative Margins)
        if (nml)
            styles.marginLeft = MarginSizes.Default.toCssNegative(otherProps.ml);
        if (nmr)
            styles.marginRight = MarginSizes.Default.toCssNegative(otherProps.mr);
        if (nmt)
            styles.marginTop = MarginSizes.Default.toCssNegative(otherProps.mt);
        if (nmb)
            styles.marginBottom = MarginSizes.Default.toCssNegative(otherProps.mb);
        return styles;
    }, [otherProps, isVertical, lineStyle, lineColor, lineThickness, nml, nmr, nmt, nmb]);
    // 2. Мемоизируем сгенерированный класс Emotion
    const dividerClass = useMemo(() => css({ ...dividerStyle, label: isVertical ? 'Divider-v' : 'Divider-h' }), [dividerStyle, isVertical]);
    // 3. Фильтруем кастомные пропсы перед передачей в div
    const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);
    return (_jsx("div", { className: dividerClass, ...domProps, children: children }));
}
//# sourceMappingURL=Divider.js.map