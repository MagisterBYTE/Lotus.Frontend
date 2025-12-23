import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { BuilderCssProperties } from '#builder';
import { CssPropertiesHelper, CssSpacingHelper } from '#helpers';
export function VerticalStack(props) {
    const { spacing, vAlign, hAlign, wrap = false, children, ...otherProps } = props;
    const styleDiv = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: hAlign,
        justifyContent: vAlign ?? 'flex-start',
        rowGap: CssSpacingHelper.getGapPropsValue(spacing),
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...BuilderCssProperties.buildContainer(props),
        ...BuilderCssProperties.buildBackground(props)
    };
    const stackClass = css({ ...styleDiv, label: 'VerticalStack' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return _jsx("div", { className: stackClass, ...domProps, children: children });
}
//# sourceMappingURL=VerticalStack.js.map