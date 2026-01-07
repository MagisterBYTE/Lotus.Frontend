import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { BackgroundPropertiesHelper, BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { GapSizes } from '#designSystem/sizes';
import { CssPropertiesHelper } from '#helpers';
export function Grid(props) {
    const { gridTemplateColumns, gridTemplateRows, columnGap, rowGap, hAlign, vAlign, hContentAlign, vContentAlign, children, ...otherProps } = props;
    const styleDiv = {
        display: 'grid',
        gridTemplateColumns: gridTemplateColumns,
        gridTemplateRows: gridTemplateRows,
        columnGap: GapSizes.getFromCssVariable(columnGap),
        rowGap: GapSizes.getFromCssVariable(rowGap),
        justifyContent: hAlign ?? 'stretch',
        alignContent: vAlign ?? 'center',
        justifyItems: hContentAlign ?? 'start',
        alignItems: vContentAlign ?? 'center',
        ...MarginPropertiesHelper.createMarginProps(props),
        ...PaddingPropertiesHelper.createPaddingProps(props),
        ...ContainerPropertiesHelper.createContainerProps(props),
        ...BackgroundPropertiesHelper.createBackgroundProps(props),
        ...BackgroundPropertiesHelper.createBoxShadowProps(props),
        ...BorderPropertiesHelper.createBorderProps(props),
        ...BorderPropertiesHelper.createBorderShadowProps(props)
    };
    const gridClass = css({ ...styleDiv, label: 'Grid' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return (_jsx("div", { className: gridClass, ...domProps, children: children }));
}
//# sourceMappingURL=Grid.js.map