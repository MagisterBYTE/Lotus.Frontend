import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { useMemo } from 'react';
import { BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper, TextPropertiesHelper } from '#base';
import { DesignSystemConstants } from '#designSystem';
import { CssPropertiesHelper } from '#helpers';
export function Text(props) {
    const { isBlock = false, asBadge, disabled, children, ...otherProps } = props;
    const isBadge = Assert.existValue(asBadge);
    const isDisabled = Boolean(disabled);
    // 1. Мемоизируем объект стилей
    const textStyle = useMemo(() => ({
        lineHeight: 'normal',
        display: isBlock ? 'block' : 'inline-block',
        ...MarginPropertiesHelper.createMarginProps(otherProps),
        ...PaddingPropertiesHelper.createPaddingProps(otherProps),
        ...ContainerPropertiesHelper.createContainerProps(otherProps),
        ...BorderPropertiesHelper.createBorderProps(otherProps),
        ...BorderPropertiesHelper.createBorderShadowProps(otherProps),
        ...TextPropertiesHelper.createTextProps(otherProps, isDisabled ? DesignSystemConstants.OpacityForDisabled : undefined),
        backgroundColor: isBadge ? ColorCssHelper.getColorWithAlpha(asBadge, DesignSystemConstants.OpacityForBadge) : undefined
    }), [props, isBlock, isBadge, isDisabled]);
    // 2. Мемоизируем сгенерированный класс Emotion
    const textClass = useMemo(() => css({ ...textStyle, label: 'Text' }), [textStyle]);
    // 3. Фильтруем кастомные пропсы перед передачей в div
    const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);
    return (_jsx("div", { className: textClass, ...domProps, children: children }));
}
//# sourceMappingURL=Text.js.map