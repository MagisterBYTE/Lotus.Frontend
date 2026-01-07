import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
import { css } from '@emotion/css';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper, TextPropertiesHelper } from '#base';
import { CssPropertiesHelper } from '#helpers';
export function Text(props) {
    const { isBlock = false, asBadge } = props;
    const isBadge = Assert.existValue(asBadge);
    const styleSpan = {
        lineHeight: 'normal',
        display: isBlock ? 'block' : 'inline-block',
        ...MarginPropertiesHelper.createMarginProps(props),
        ...PaddingPropertiesHelper.createPaddingProps(props),
        ...ContainerPropertiesHelper.createContainerProps(props),
        ...BorderPropertiesHelper.createBorderProps(props),
        ...BorderPropertiesHelper.createBorderShadowProps(props),
        ...TextPropertiesHelper.createTextProps(props),
        backgroundColor: isBadge ? ColorCssHelper.getColorCssWithAlpha(asBadge, 0.2) : undefined
    };
    const textClass = css({ ...styleSpan, label: 'Text' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(props);
    return (_jsx("div", { className: textClass, ...domProps, children: props.children }));
}
//# sourceMappingURL=Text.js.map