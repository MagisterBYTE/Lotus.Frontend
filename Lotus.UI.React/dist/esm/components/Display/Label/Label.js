import { jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
import { css } from '@emotion/css';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { useMemo } from 'react';
import { BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper, TextPropertiesHelper } from '#base';
import { DesignSystemConstants } from '#designSystem';
import { CssVariables } from '#designSystem/сssVariables';
import { CssPropertiesHelper } from '#helpers';
import { RenderIcon } from '#render';
const getFlexContainer = (iconPlacement, gap) => {
    switch (iconPlacement) {
        case 'left':
            return ContainerPropertiesHelper.getFlexRowContainer(Assert.existValue(gap) ? gap : 'md');
        case 'right':
            return ContainerPropertiesHelper.getFlexRowContainer(Assert.existValue(gap) ? gap : 'md', true);
        case 'top':
            return ContainerPropertiesHelper.getFlexColumnContainer(Assert.existValue(gap) ? gap : 'md');
        case 'bottom':
            return ContainerPropertiesHelper.getFlexColumnContainer(Assert.existValue(gap) ? gap : 'md', true);
    }
    return ContainerPropertiesHelper.getFlexRowContainer(Assert.existValue(gap) ? gap : 'md');
};
export function Label(props) {
    const { isBlock = false, asBadge, disabled, children, icon, iconPlacement, iconSize = 'md', iconStyle, iconColor, imageDatabase, ...otherProps } = props;
    const isIcon = Assert.existValue(icon);
    const isBadge = Assert.existValue(asBadge);
    const isDisabled = Boolean(disabled);
    // 1. Мемоизируем объект стилей
    const styleSpan = useMemo(() => {
        const baseStyles = {
            lineHeight: 'normal',
            // Используем inline-flex/inline-block по умолчанию для Label
            display: isBlock ? (isIcon ? 'flex' : 'block') : isIcon ? 'inline-flex' : 'inline-block',
            ...MarginPropertiesHelper.createMarginProps(props),
            ...PaddingPropertiesHelper.createPaddingProps(props),
            ...ContainerPropertiesHelper.createContainerProps(props),
            ...BorderPropertiesHelper.createBorderProps(props),
            ...BorderPropertiesHelper.createBorderShadowProps(props),
            ...TextPropertiesHelper.createTextProps(props, isDisabled ? DesignSystemConstants.OpacityForDisabled : undefined),
            ...(isIcon ? getFlexContainer(iconPlacement, 'md') : {}),
            backgroundColor: isBadge ? ColorCssHelper.getColorWithAlpha(asBadge, DesignSystemConstants.OpacityForBadge) : undefined,
            borderColor: isBadge
                ? Assert.existValue(props.bdColor)
                    ? BorderPropertiesHelper.getBorderColorPropsValue(props.bdColor)
                    : ColorCssHelper.getColorWithAlpha(asBadge, 0.5)
                : BorderPropertiesHelper.hasBorderProps(props)
                    ? (BorderPropertiesHelper.getBorderColorPropsValue(props.bdColor) ?? CssVariables.BorderColor)
                    : undefined
        };
        return baseStyles;
    }, [props, isBlock, isIcon, isBadge, isDisabled, iconPlacement, asBadge]);
    // 2. Мемоизируем сгенерированный класс Emotion
    const labelClassName = useMemo(() => css({ ...styleSpan, label: isIcon ? 'LabelContainer' : 'Label' }), [styleSpan, isIcon]);
    // 3. Подготавливаем стили иконки
    const actualIconStyle = useMemo(() => (isDisabled ? { ...iconStyle, opacity: DesignSystemConstants.OpacityForDisabled } : iconStyle), [iconStyle, isDisabled]);
    // 4. Фильтруем кастомные пропсы перед передачей в span
    const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);
    // 5. Единый рендер без дублирования обертки
    return (_jsxs("span", { className: labelClassName, ...domProps, children: [isIcon && RenderIcon.renderIcon(iconSize, icon, undefined, actualIconStyle, iconColor, imageDatabase), children] }));
}
//# sourceMappingURL=Label.js.map