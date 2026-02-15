import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { useMemo } from 'react';
import { BackgroundPropertiesHelper, BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { CssPropertiesHelper } from '#helpers';
function buildBoxProps(props) {
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
export function Box(props) {
    const { centerContent, children, ...otherProps } = props;
    // 1. Мемоизируем объект стилей
    const boxStyle = useMemo(() => ({
        ...MarginPropertiesHelper.createMarginProps(otherProps),
        ...PaddingPropertiesHelper.createPaddingProps(otherProps),
        ...ContainerPropertiesHelper.createContainerProps(otherProps),
        ...BackgroundPropertiesHelper.createBackgroundProps(otherProps),
        ...BackgroundPropertiesHelper.createBoxShadowProps(otherProps),
        ...BorderPropertiesHelper.createBorderProps(otherProps),
        ...BorderPropertiesHelper.createBorderShadowProps(otherProps),
        ...buildBoxProps(props)
    }), [otherProps, centerContent]);
    // 2. Мемоизируем сгенерированный класс Emotion
    const boxClass = useMemo(() => css({ ...boxStyle, label: 'Box' }), [boxStyle]);
    // 3. Фильтруем кастомные пропсы перед передачей в div
    const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);
    return (_jsx("div", { className: boxClass, ...domProps, children: children }));
}
//# sourceMappingURL=Box.js.map