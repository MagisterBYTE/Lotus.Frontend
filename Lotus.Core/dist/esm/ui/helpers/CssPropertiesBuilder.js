import { ObjectHelper } from '../../helpers';
import { InteractivityLogic } from '../interactivity/InteractivityLogic';
import { ThemeConstant } from '../theme/constants';
import { CssPropertiesHelper } from './CssPropertiesHelper';
import { CssSizerHelper } from './CssSizerHelper';
export class CssPropertiesBuilder {
    static buildElement(props, context) {
        // Element
        const borderRadius = ObjectHelper.getValue(props, 'borderRadius');
        const size = ObjectHelper.getValue(props, 'size');
        const paddingControl = ObjectHelper.getValue(props, 'paddingControl');
        // Text
        const fontBold = ObjectHelper.getValue(props, 'fontBold');
        const fontAccent = ObjectHelper.getValue(props, 'fontAccent');
        const textEffect = ObjectHelper.getValue(props, 'textEffect');
        const textAlign = ObjectHelper.getValue(props, 'textAlign');
        // Status
        const isDisabled = Boolean(props.disabled || props.isDisabled);
        const isSelected = Boolean(props.isSelected || context?.isSelected);
        // Settings
        const leftRight = ((context && context.leftRight) ? context.leftRight : 'normal');
        const topBottom = ((context && context.topBottom) ? context.topBottom : 'half');
        const isBorderRadiusIndividual = context && (context.isBottomLeft ?? context.isBottomRight ?? context.isTopLeft ?? context.isTopRight);
        return {
            // Element
            ...CssSizerHelper.getPaddingProps(size, paddingControl, leftRight, topBottom),
            ...(isBorderRadiusIndividual
                ? CssPropertiesHelper.getBorderRadiusIndividualProps(size, borderRadius, context?.isTopLeft, context?.isTopRight, context?.isBottomLeft, context?.isBottomRight)
                : CssPropertiesHelper.getBorderRadiusProps(size, borderRadius)),
            // Text
            ...CssPropertiesHelper.getFontProps(size, fontBold, fontAccent),
            ...CssPropertiesHelper.getTextEffectProps(size, textEffect, textAlign)
        };
    }
    static buildInteractivityElement(model, props, context) {
        // Status
        const isDisabled = Boolean(props.disabled || props.isDisabled);
        const isSelected = Boolean(context?.isSelected || props.isSelected);
        // Background
        const backColor = ObjectHelper.getValue(props, 'backColor');
        // BackgroundEffect
        const hasRippleEffect = Boolean(ObjectHelper.getValue(props, 'hasRippleEffect'));
        const hasScaleEffect = Boolean(ObjectHelper.getValue(props, 'hasScaleEffect'));
        const hasShadowBorderEffect = Boolean(ObjectHelper.getValue(props, 'hasShadowBorderEffect'));
        const hasShadowBoxEffect = Boolean(ObjectHelper.getValue(props, 'hasShadowBoxEffect'));
        const effectContext = {
            isDisabled: isDisabled,
            isSelected: isSelected,
            hasRippleEffect: hasRippleEffect
        };
        return {
            ...CssPropertiesBuilder.buildElement(props, context),
            ...CssPropertiesHelper.getTransitionColorsProps(),
            ...InteractivityLogic.getEffectProps(model, 'normal', props, effectContext),
            ...((!isDisabled && hasShadowBoxEffect) ? CssPropertiesHelper.getBoxShadowProps(isSelected ? 8 : 2, backColor) : {}),
            ...((!isDisabled && hasShadowBorderEffect && isSelected) ? CssPropertiesHelper.getBorderShadowProps(6, backColor, ThemeConstant.OpacityForBorderShadowActive) : {}),
            ...((!isDisabled && hasScaleEffect && isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.2) : {}),
            // @ts-expect-error IInteractivityBackgroundEffect 
            '&:hover': {
                ...InteractivityLogic.getEffectProps(model, 'hover', props, effectContext),
                ...((!isDisabled && hasShadowBorderEffect && !isSelected) ? CssPropertiesHelper.getBorderShadowProps(4, backColor, ThemeConstant.OpacityForBorderShadowHover) : {}),
                ...((!isDisabled && hasShadowBoxEffect && !isSelected) ? CssPropertiesHelper.getBoxShadowProps(4, backColor) : {}),
                ...((!isDisabled && hasScaleEffect && !isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.05) : {})
            },
            '&:active': {
                ...InteractivityLogic.getEffectProps(model, 'pressed', props, effectContext),
                ...((!isDisabled && hasShadowBorderEffect) ? CssPropertiesHelper.getBorderShadowProps(6, backColor, ThemeConstant.OpacityForBorderShadowActive) : {}),
                ...((!isDisabled && hasShadowBoxEffect) ? CssPropertiesHelper.getBoxShadowProps(8, backColor) : {}),
                ...((!isDisabled && hasScaleEffect && !isSelected) ? CssPropertiesHelper.getTransformScaleProps(0.95) : {})
            },
            '&:checked': {
                ...InteractivityLogic.getEffectProps(model, 'normal', props, effectContext),
                ...((!isDisabled && hasShadowBorderEffect) ? CssPropertiesHelper.getBorderShadowProps(6, backColor, ThemeConstant.OpacityForBorderShadowActive) : {}),
                ...((!isDisabled && hasShadowBoxEffect) ? CssPropertiesHelper.getBoxShadowProps(8, backColor) : {}),
                ...((!isDisabled && hasScaleEffect) ? CssPropertiesHelper.getTransformScaleProps(1.2) : {})
            },
            '&:disabled': {
                ...InteractivityLogic.getEffectProps(model, 'normal', props, effectContext)
            }
        };
    }
}
