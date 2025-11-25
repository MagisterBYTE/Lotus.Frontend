import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
import { css } from '@emotion/css';
import { CssBorderHelper, CssContainerHelper, CssFontHelper, CssPropertiesHelper, CssSpacingHelper } from '#helpers';
export function Text(props) {
    const styleSpan = {
        lineHeight: 'normal',
        display: 'inline-block',
        ...CssSpacingHelper.getPaddingProps(props),
        ...CssSpacingHelper.getMarginProps(props),
        ...CssContainerHelper.getContainerProps(props),
        ...CssBorderHelper.getBorderProps(props),
        ...CssBorderHelper.getBorderShadowProps(props),
        ...CssFontHelper.getFontProps(props),
        ...CssFontHelper.getTextEffectProps(props)
    };
    const textClass = css({ ...styleSpan, label: 'Text' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(props);
    return (_jsx("div", { className: textClass, ...domProps, children: props.children }));
}
//# sourceMappingURL=Text.js.map