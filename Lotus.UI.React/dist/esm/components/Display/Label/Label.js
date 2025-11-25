import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
import { css } from '@emotion/css';
import { Assert } from 'lotus-core/utils';
import { CssBorderHelper, CssContainerHelper, CssFontHelper, CssPropertiesHelper, CssSpacingHelper } from '#helpers';
import { RenderIcon } from '#render';
const getFlexContainer = (iconPlacement, gap) => {
    switch (iconPlacement) {
        case 'left': return CssContainerHelper.getFlexRowContainer(gap ?? 'md');
        case 'right': return CssContainerHelper.getFlexRowContainer(gap ?? 'md', true);
        case 'top': return CssContainerHelper.getFlexColumnContainer(gap ?? 'md');
        case 'bottom': return CssContainerHelper.getFlexColumnContainer(gap ?? 'md', true);
    }
    return undefined;
};
export function Label(props) {
    const isIcon = Assert.existValue(props.icon);
    const styleSpan = {
        lineHeight: 'normal',
        display: isIcon ? 'flex' : 'inline-block',
        ...CssSpacingHelper.getPaddingProps(props),
        ...CssSpacingHelper.getMarginProps(props),
        ...CssContainerHelper.getContainerProps(props),
        ...CssBorderHelper.getBorderProps(props),
        ...CssBorderHelper.getBorderShadowProps(props),
        ...CssFontHelper.getFontProps(props),
        ...CssFontHelper.getTextEffectProps(props),
        ...(isIcon ? getFlexContainer(props.iconPlacement, 'xxs') : undefined)
    };
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(props);
    if (isIcon) {
        const textClass = css({ ...styleSpan, label: 'LabelContainer' });
        return (_jsxs("div", { className: textClass, ...domProps, children: [RenderIcon.renderIcon(props.iconSize ?? 'md', props.icon, undefined, props.iconStyle, props.iconColor, props.imageDatabase), props.children] }));
    }
    else {
        const textClass = css({ ...styleSpan, label: 'Label' });
        return (_jsx("div", { className: textClass, ...domProps, children: props.children }));
    }
}
//# sourceMappingURL=Label.js.map