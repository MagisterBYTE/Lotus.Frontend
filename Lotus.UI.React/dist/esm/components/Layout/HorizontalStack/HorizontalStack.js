import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { BackgroundPropertiesHelper, BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { GapSizes } from '#designSystem/sizes';
import { CssPropertiesHelper } from '#helpers';
export function HorizontalStack(props) {
    const { spacing, vAlign, hAlign, wrap, children, ...otherProps } = props;
    const styleDiv = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: vAlign,
        justifyContent: hAlign ?? 'flex-start',
        columnGap: GapSizes.getFromCssVariable(spacing),
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...MarginPropertiesHelper.createMarginProps(props),
        ...PaddingPropertiesHelper.createPaddingProps(props),
        ...ContainerPropertiesHelper.createContainerProps(props),
        ...BackgroundPropertiesHelper.createBackgroundProps(props),
        ...BackgroundPropertiesHelper.createBoxShadowProps(props),
        ...BorderPropertiesHelper.createBorderProps(props),
        ...BorderPropertiesHelper.createBorderShadowProps(props)
    };
    const stackClass = css({ ...styleDiv, label: 'HorizontalStack' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return (_jsx("div", { className: stackClass, ...domProps, children: children }));
}
//# sourceMappingURL=HorizontalStack.js.map