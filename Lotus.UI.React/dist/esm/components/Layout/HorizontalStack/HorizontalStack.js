import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { BuilderCssProperties } from '#builder';
import { CssPropertiesHelper, CssSpacingHelper } from '#helpers';
export function HorizontalStack(props) {
    const { spacing, vAlign, hAlign, wrap, children, ...otherProps } = props;
    const styleDiv = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: vAlign,
        justifyContent: hAlign ?? 'flex-start',
        columnGap: CssSpacingHelper.getGapPropsValue(spacing),
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...BuilderCssProperties.buildContainer(props),
        ...BuilderCssProperties.buildBackground(props)
    };
    const stackClass = css({ ...styleDiv, label: 'HorizontalStack' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return _jsx("div", { className: stackClass, ...domProps, children: children });
}
//# sourceMappingURL=HorizontalStack.js.map