import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { useMemo } from 'react';
import { BackgroundPropertiesHelper, BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { GapSizes } from '#designSystem/sizes';
import { CssPropertiesHelper } from '#helpers';
export function HorizontalStack(props) {
    const { spacing, vAlign, hAlign = 'flex-start', wrap = false, children, ...otherProps } = props;
    // 1. Мемоизируем объект стилей
    const stackStyle = useMemo(() => {
        const gapValue = GapSizes.getFromCssVariable(spacing);
        return {
            display: 'flex',
            flexDirection: 'row',
            alignItems: vAlign,
            justifyContent: hAlign,
            columnGap: gapValue,
            rowGap: gapValue,
            flexWrap: wrap ? 'wrap' : 'nowrap',
            ...MarginPropertiesHelper.createMarginProps(otherProps),
            ...PaddingPropertiesHelper.createPaddingProps(otherProps),
            ...ContainerPropertiesHelper.createContainerProps(otherProps),
            ...BackgroundPropertiesHelper.createBackgroundProps(otherProps),
            ...BackgroundPropertiesHelper.createBoxShadowProps(otherProps),
            ...BorderPropertiesHelper.createBorderProps(otherProps),
            ...BorderPropertiesHelper.createBorderShadowProps(otherProps)
        };
    }, [otherProps, spacing, vAlign, hAlign, wrap]);
    // 2. Мемоизируем сгенерированный класс Emotion
    const stackClass = useMemo(() => css({ ...stackStyle, label: 'HorizontalStack' }), [stackStyle]);
    // 3. Фильтруем кастомные пропсы перед передачей в div
    const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);
    return (_jsx("div", { className: stackClass, ...domProps, children: children }));
}
//# sourceMappingURL=HorizontalStack.js.map