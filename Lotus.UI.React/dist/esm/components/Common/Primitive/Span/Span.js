import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useMemo } from 'react';
import { TextPropertiesHelper } from '#base';
import { DesignSystemConstants } from '#designSystem';
export const Span = memo((props) => {
    const spanStyle = useMemo(() => TextPropertiesHelper.createTextProps(props, props.disabled ? DesignSystemConstants.OpacityForDisabled : undefined), [props]);
    return _jsx("span", { style: spanStyle, children: props.text });
});
// Назначаем имя для отладки в DevTools
Span.displayName = 'Span';
//# sourceMappingURL=Span.js.map