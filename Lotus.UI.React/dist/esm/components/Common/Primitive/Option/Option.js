import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Assert } from 'lotus-core/utils';
import { memo } from 'react';
import { HorizontalStack } from '#components/Layout';
import { TSizeTypes } from '#types';
import { Icon } from '../Icon';
import { Span } from '../Span';
export const Option = memo((props) => {
    const { option, size = 'md', wrapContainer, ...iconProps } = props;
    if (Assert.emptyValue(option.label)) {
        if (Assert.existValue(option.icon)) {
            return _jsx(Icon, { ...iconProps, icon: option.icon, iconSize: size });
        }
        else {
            return _jsx(_Fragment, {});
        }
    }
    else {
        if (Assert.existValue(option.icon)) {
            if (wrapContainer) {
                return (_jsxs(HorizontalStack, { ...wrapContainer, hAlign: wrapContainer.hAlign ?? 'flex-start', spacing: TSizeTypes.clamp(size, 'xs', 'lg'), vAlign: wrapContainer.vAlign ?? 'center', children: [_jsx(Icon, { ...iconProps, icon: option.icon, iconSize: size }), _jsx(Span, { disabled: option.disabled, fontSize: size, text: option.label })] }));
            }
            else {
                return (_jsxs(_Fragment, { children: [_jsx(Icon, { ...iconProps, icon: option.icon, iconSize: size }), _jsx(Span, { disabled: option.disabled, fontSize: size, text: option.label })] }));
            }
        }
        else {
            if (wrapContainer) {
                return (_jsx(HorizontalStack, { ...wrapContainer, hAlign: wrapContainer.hAlign ?? 'flex-start', spacing: TSizeTypes.clamp(size, 'xs', 'lg'), vAlign: wrapContainer.vAlign ?? 'center', children: _jsx(Span, { disabled: option.disabled, fontSize: size, text: option.label }) }));
            }
            else {
                return _jsx(Span, { disabled: option.disabled, fontSize: size, text: option.label });
            }
        }
    }
});
// Назначаем имя для отладки в DevTools
Option.displayName = 'Option';
//# sourceMappingURL=Option.js.map