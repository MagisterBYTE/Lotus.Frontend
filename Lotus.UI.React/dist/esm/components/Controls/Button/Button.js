import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { Assert } from 'lotus-core/utils';
import { useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { Primitive } from '#components/Common';
import { CssPropertiesHelper } from '#helpers';
const getFlexContainer = (iconPlacement, gap) => {
    switch (iconPlacement) {
        case 'left':
            return ContainerPropertiesHelper.getFlexRowContainer(gap ?? 'md');
        case 'right':
            return ContainerPropertiesHelper.getFlexRowContainer(gap ?? 'md', true);
        case 'top':
            return ContainerPropertiesHelper.getFlexColumnContainer(gap ?? 'md');
        case 'bottom':
            return ContainerPropertiesHelper.getFlexColumnContainer(gap ?? 'md', true);
    }
    return ContainerPropertiesHelper.getFlexRowContainer(gap ?? 'md');
};
export const Button = (props) => {
    const { variant = 'filled', isSelectedStatus, isSelected, onSelected, hasRippleEffect, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hasScaleEffect, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hasShadowBorderEffect, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hasShadowBoxEffect, icon, iconSize, iconPlacement, iconStyle, iconColor, imageDatabase, disabled, onClick, children, ...propsButton } = props;
    const isIcon = Assert.existValue(icon);
    const [selectedButton, setSelectedButton] = useState(isSelected);
    const context = {
        isSelected: selectedButton,
        isDisabled: disabled,
        hasRippleEffect: hasRippleEffect
    };
    let cssProperties = CssPropertiesHelper.buildInteractivityElement(variant, props, context);
    if (isIcon) {
        cssProperties = { ...cssProperties, ...getFlexContainer(iconPlacement, 'md') };
        cssProperties.display = 'flex';
    }
    // const rippleColor = Colors.red_2.toCSSRgbValue();
    // const [ripple, event] = useRippleEffect({ duration: DesignSystemConstants.TransitionSpeed * 2, color: rippleColor, disabled: props.disabled });
    const handleSelect = (event) => {
        setSelectedButton(!selectedButton);
        if (onSelected)
            onSelected(!selectedButton, event.currentTarget.value);
        if (onClick)
            onClick(event);
    };
    useEffect(() => {
        setSelectedButton(isSelected);
    }, [isSelected]);
    const buttonClass = css({ ...cssProperties, label: 'Button' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(propsButton);
    if (isIcon) {
        return (_jsxs("button", { className: buttonClass, ...domProps, onClick: isSelectedStatus ? handleSelect : onClick, children: [_jsx(Primitive.Icon, { icon: icon, iconColor: iconColor, iconSize: iconSize, iconStyle: iconStyle, imageDatabase: imageDatabase }), children] }));
    }
    else {
        return (_jsx("button", { className: buttonClass, ...domProps, onClick: isSelectedStatus ? handleSelect : onClick, children: children }));
    }
};
//# sourceMappingURL=Button.js.map