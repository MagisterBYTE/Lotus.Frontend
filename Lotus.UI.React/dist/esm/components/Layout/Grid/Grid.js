import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { useMemo } from 'react';
import { BackgroundPropertiesHelper, BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { GapSizes } from '#designSystem/sizes';
import { CssPropertiesHelper } from '#helpers';
export function Grid(props) {
    const { gridTemplateColumns, gridTemplateRows, columnGap, rowGap, hAlign = 'stretch', vAlign = 'center', hContentAlign = 'start', vContentAlign = 'center', children, ...otherProps } = props;
    // 1. Мемоизируем объект стилей
    const gridStyle = useMemo(() => ({
        display: 'grid',
        gridTemplateColumns,
        gridTemplateRows,
        columnGap: GapSizes.getFromCssVariable(columnGap),
        rowGap: GapSizes.getFromCssVariable(rowGap),
        justifyContent: hAlign,
        alignContent: vAlign,
        justifyItems: hContentAlign,
        alignItems: vContentAlign,
        ...MarginPropertiesHelper.createMarginProps(otherProps),
        ...PaddingPropertiesHelper.createPaddingProps(otherProps),
        ...ContainerPropertiesHelper.createContainerProps(otherProps),
        ...BackgroundPropertiesHelper.createBackgroundProps(otherProps),
        ...BackgroundPropertiesHelper.createBoxShadowProps(otherProps),
        ...BorderPropertiesHelper.createBorderProps(otherProps),
        ...BorderPropertiesHelper.createBorderShadowProps(otherProps)
    }), [otherProps, gridTemplateColumns, gridTemplateRows, columnGap, rowGap, hAlign, vAlign, hContentAlign, vContentAlign]);
    // 2. Мемоизируем сгенерированный класс Emotion
    const gridClass = useMemo(() => css({ ...gridStyle, label: 'Grid' }), [gridStyle]);
    // 3. Фильтруем кастомные пропсы перед передачей в div
    const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);
    return (_jsx("div", { className: gridClass, ...domProps, children: children }));
}
//# sourceMappingURL=Grid.js.map