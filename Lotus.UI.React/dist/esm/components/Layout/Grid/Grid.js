import { jsx as _jsx } from "react/jsx-runtime";
import { BuilderCssProperties } from '#builder';
import { CssPropertiesHelper, CssSpacingHelper } from '#helpers';
export function Grid(props) {
    const { gridTemplateColumns, gridTemplateRows, columnGap, rowGap, hAlign, vAlign, hContentAlign, vContentAlign, children, ...otherProps } = props;
    const styleDiv = {
        display: 'grid',
        gridTemplateColumns: gridTemplateColumns,
        gridTemplateRows: gridTemplateRows,
        columnGap: CssSpacingHelper.getGapPropsValue(columnGap),
        rowGap: CssSpacingHelper.getGapPropsValue(rowGap),
        justifyContent: hAlign ?? 'stretch',
        alignContent: vAlign ?? 'center',
        justifyItems: hContentAlign ?? 'start',
        alignItems: vContentAlign ?? 'center',
        ...otherProps.style
    };
    BuilderCssProperties.fillContainer(styleDiv, props, false);
    BuilderCssProperties.fillBackground(styleDiv, props, false);
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return (_jsx("div", { ...domProps, style: styleDiv, children: children }));
}
//# sourceMappingURL=Grid.js.map