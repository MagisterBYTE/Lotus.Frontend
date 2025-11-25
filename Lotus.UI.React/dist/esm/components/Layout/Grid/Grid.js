import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
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
        ...BuilderCssProperties.buildContainer(props),
        ...BuilderCssProperties.buildBackground(props)
    };
    const gridClass = css({ ...styleDiv, label: 'Grid' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return (_jsx("div", { className: gridClass, ...domProps, children: children }));
}
//# sourceMappingURL=Grid.js.map