import { CssSpacingHelper, CssBorderHelper, CssBackgroundHelper, CssContainerHelper } from '#helpers';
export class BuilderCssProperties {
    static fillContainer(style, props, override) {
        // Padding и Margin 
        CssSpacingHelper.fillPaddingProps(style, props, override);
        CssSpacingHelper.fillMarginProps(style, props, override);
        // Border
        CssBorderHelper.fillBorderProps(style, props, override);
        CssBorderHelper.fillBorderShadowProps(style, props, override);
        // Container
        CssContainerHelper.fillContainerProps(style, props, override);
        return style;
    }
    static buildContainer(props) {
        return {
            // Padding и Margin 
            ...CssSpacingHelper.getPaddingProps(props),
            ...CssSpacingHelper.getMarginProps(props),
            // Border
            ...CssBorderHelper.getBorderProps(props),
            ...CssBorderHelper.getBorderShadowProps(props),
            // Container
            ...CssContainerHelper.getContainerProps(props),
        };
    }
    static fillBackground(style, props, override) {
        CssBackgroundHelper.fillBackgroundProps(style, props, override);
        CssBackgroundHelper.fillBoxShadowProps(style, props, override);
        return style;
    }
    static buildBackground(props) {
        return {
            ...CssBackgroundHelper.getBackgroundProps(props),
            ...CssBackgroundHelper.getBoxShadowProps(props),
        };
    }
}
//# sourceMappingURL=BuilderCssProperties.js.map