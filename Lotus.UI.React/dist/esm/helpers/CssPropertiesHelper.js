/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assert } from 'lotus-core/utils';
import { BackgroundPropertiesHelper, BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper, TextPropertiesHelper } from '#base';
import { DesignSystemConstants } from '#designSystem';
import { InteractivityLogic } from '#interactivity';
export class CssPropertiesHelper {
    // eslint-disable-next-line complexity
    static buildInteractivityElement(model, props, context) {
        const isDisabled = Boolean(context?.isDisabled);
        const isSelected = Boolean(context?.isSelected);
        const { bgColor, 
        // @ts-expect-error hasScaleEffect
        hasScaleEffect, hasShadowBorderEffect, hasShadowBoxEffect } = props;
        return {
            cursor: 'pointer',
            display: 'inline-block',
            ...MarginPropertiesHelper.createMarginProps(props),
            ...PaddingPropertiesHelper.createPaddingProps(props),
            ...ContainerPropertiesHelper.createContainerProps(props),
            ...BorderPropertiesHelper.createBorderProps(props),
            ...TextPropertiesHelper.createTextProps(props),
            ...CssPropertiesHelper.getTransitionColorsProps(),
            ...InteractivityLogic.getEffectProps(model, 'normal', props, context),
            ...((!isDisabled && hasShadowBoxEffect) ? BackgroundPropertiesHelper.createBoxShadowProps({ bgColor: bgColor, bgShadow: isSelected ? 8 : 2 }) : {}),
            ...((!isDisabled && hasShadowBorderEffect && isSelected) ? BorderPropertiesHelper.createBorderShadowProps({ bdColor: bgColor, bdShadow: 6 }) : {}),
            ...((!isDisabled && hasScaleEffect && isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.2) : {}),
            // @ts-expect-error IInteractivityBackgroundEffect 
            '&:hover': {
                ...InteractivityLogic.getEffectProps(model, 'hover', props, context),
                ...((!isDisabled && hasShadowBoxEffect && !isSelected) ? BackgroundPropertiesHelper.createBoxShadowProps({ bgColor: bgColor, bgShadow: 4 }) : {}),
                ...((!isDisabled && hasShadowBorderEffect && !isSelected) ? BorderPropertiesHelper.createBorderShadowProps({ bdColor: bgColor, bdShadow: 4 }) : {}),
                ...((!isDisabled && hasScaleEffect && !isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.05) : {})
            },
            '&:active': {
                ...InteractivityLogic.getEffectProps(model, 'pressed', props, context),
                ...((!isDisabled && hasShadowBoxEffect) ? BackgroundPropertiesHelper.createBoxShadowProps({ bgColor: bgColor, bgShadow: 8 }) : {}),
                ...((!isDisabled && hasShadowBorderEffect) ? BorderPropertiesHelper.createBorderShadowProps({ bdColor: bgColor, bdShadow: 6 }) : {}),
                ...((!isDisabled && hasScaleEffect && !isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.05) : {})
            },
            '&:checked': {
                ...InteractivityLogic.getEffectProps(model, 'normal', props, context),
                ...((!isDisabled && hasShadowBoxEffect) ? BackgroundPropertiesHelper.createBoxShadowProps({ bgColor: bgColor, bgShadow: 8 }) : {}),
                ...((!isDisabled && hasShadowBorderEffect) ? BorderPropertiesHelper.createBorderShadowProps({ bdColor: bgColor, bdShadow: 6 }) : {}),
                ...((!isDisabled && hasScaleEffect) ? CssPropertiesHelper.getTransformScaleProps(1.05) : {})
            },
            '&:disabled': {
                ...InteractivityLogic.getEffectProps(model, 'normal', props, context)
            }
        };
    }
    // #region Common
    static filterDOMProps(props) {
        const domProps = {};
        const nonDOMProps = [
            // IGeneralBackgroundProperties
            'bgColor',
            'bgImage',
            'bgShadow',
            // IGeneralBorderProperties
            'withBorder',
            'bdRadius',
            'bdWidth',
            'bdStyle',
            'bdColor',
            'bdRadius',
            'bdRadiusTopLeft',
            'bdRadiusBottomLeft',
            'bdRadiusTopRight',
            'bdRadiusBottomRight',
            'bdShadow',
            // IGeneralContainerProperties
            'w',
            'h',
            'grow',
            'shrink',
            'gridColumn',
            'gridColumnSpan',
            'gridRow',
            'gridRowSpan',
            // IGeneralMarginProperties
            'm',
            'ml',
            'mt',
            'mr',
            'mb',
            // IGeneralPaddingProperties
            'p',
            'pl',
            'pt',
            'pr',
            'pb',
            // IGeneralTextProperties
            'fontSize',
            'fontBold',
            'fontAccent',
            'textEffect',
            'textAlign',
            'textColorHarmonious',
            'textColor',
            'textLineSpacing',
            // IGeneralIconProperties
            'icon',
            'iconSize',
            'iconStyle',
            'iconColor',
            'iconPlacement',
            'imageDatabase'
        ];
        for (const key in props) {
            if (!nonDOMProps.includes(key)) {
                domProps[key] = props[key];
            }
        }
        return domProps;
    }
    static overrideStyleValue(source, key, value, override) {
        if (Assert.existValue(value)) {
            const currentValue = source[key];
            if (Assert.existValue(currentValue)) {
                if (override) {
                    source[key] = value;
                }
            }
            else {
                source[key] = value;
            }
        }
    }
    static overrideStyle(source, override) {
        for (const key in override) {
            // @ts-expect-error prop
            const prop = override[key];
            // @ts-expect-error prop
            source[key] = prop;
        }
        // убираем общий свойства если установлены конкретные значения
        // borderRadius
        if (override.borderTopLeftRadius ?? override.borderTopRightRadius ?? override.borderBottomLeftRadius ?? override.borderBottomRightRadius) {
            source.borderRadius = undefined;
        }
    }
    // #endregion
    // #region TransitionColors
    /**
     * Получить свойства CSS по переходу цвета и тени в виде TCssProperties
     * @returns Свойства CSS по переходу цвета и тени в виде TCssProperties
     */
    static getTransitionColorsProps() {
        return {
            transition: `background-color ${DesignSystemConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${DesignSystemConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${DesignSystemConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${DesignSystemConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
        };
    }
    // #endregion
    // #region TransformScale
    /**
     * Получить свойства CSS по трансформации масштабирования в виде TCssProperties
     * @param scale Масштаб
     * @returns Свойства CSS трансформации масштабирования в виде TCssProperties
     */
    static getTransformScaleProps(scale) {
        if (scale) {
            return { transform: `scale(${scale});` };
        }
        return {};
    }
}
//# sourceMappingURL=CssPropertiesHelper.js.map