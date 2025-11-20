import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useRippleEffect } from '#hooks';
import { useEffect, useState } from 'react';
import { ThemeConstant } from '#theme/constants';
import { Colors } from 'lotus-core/modules/color';
export const Button = (props) => {
    const { fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor, hoverTextColor, pressedTextColor, backColor, backImage, hoverBackColor, pressedBackColor, borderRadius, borderStyle, borderWidth, borderColor, hoverBorderColor, pressedBorderColor, size = 'medium', extraClass, overrideButtonStyle, variant = 'filled', isSelectedStatus, isSelected, onSelected, icon, iconColor, iconStyle, iconPlacement = 'left', imageDatabase, hasRippleEffect, hasScaleEffect, hasShadowBorderEffect, hasShadowBoxEffect, ...propsButton } = props;
    const [selectedButton, setSelectedButton] = useState(isSelected);
    // const cssProperties = CssPropertiesBuilder.buildInteractivityElement(variant, props, { isSelected: selectedButton });
    // if(overrideButtonStyle)
    // {
    //   CssPropertiesHelper.overrideStyle(cssProperties, overrideButtonStyle);
    // }
    //const buttonClass = css({ ...cssProperties })
    const rippleColor = Colors.red_2.toCSSRgbValue();
    const [ripple, event] = useRippleEffect({ duration: ThemeConstant.TransitionSpeed * 2, color: rippleColor, disabled: props.disabled });
    // const getFlexContainer = (): CSSProperties =>
    // {
    //   switch (iconPlacement)
    //   {
    //     case 'left': return CssContainerHelper.getFlexRowContainer(size, paddingControl);
    //     case 'right': return CssContainerHelper.getFlexRowContainer(size, paddingControl, true);
    //     case 'top': return CssContainerHelper.getFlexColumnContainer(size, paddingControl);
    //     case 'bottom': return CssContainerHelper.getFlexColumnContainer(size, paddingControl, true);
    //   }
    //   return {};
    // }
    const handleSelect = (event) => {
        setSelectedButton(!selectedButton);
        if (onSelected)
            onSelected(!selectedButton, event.currentTarget.value);
        if (props.onClick)
            props.onClick(event);
    };
    useEffect(() => {
        setSelectedButton(isSelected);
    }, [isSelected]);
    // if (icon)
    // {
    //   return (<button {...propsButton} ref={hasRippleEffect ? ripple : props.ref} className={cx(buttonClass, extraClass)}
    //     onClick={isSelectedStatus ? handleSelect : props.onClick}
    //     onPointerDown={event}>
    //     {/* {RenderComponentHelper.renderIconAndValue(size, icon, propsButton.children, iconStyle, iconColor, imageDatabase, true, getFlexContainer())} */}
    //   </button>);
    // }
    // else
    // {
    //   return (
    //     <button {...propsButton} ref={hasRippleEffect ? ripple : props.ref} className={cx(buttonClass, extraClass)}
    //       onClick={isSelectedStatus ? handleSelect : props.onClick}
    //       onPointerDown={event}>
    //       {propsButton.children}
    //     </button>);
    // }
    return _jsx(_Fragment, {});
};
//# sourceMappingURL=Button.js.map