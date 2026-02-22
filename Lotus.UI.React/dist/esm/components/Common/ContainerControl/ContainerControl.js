import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputDescription, InputLabel, Stack } from '@mantine/core';
import { Assert } from 'lotus-core/utils';
import { HorizontalStack } from '#components/Layout';
/**
 * Базовый компонент для представления контрола в горизонтальном контейнере
 */
export function ContainerControl(props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { control, inlinePlace = false, size, required, label, labelProps, description, descriptionProps, error, errorProps, ...otherProps } = props;
    const vAlign = Assert.existValue(otherProps.vAlign) ? otherProps.vAlign : Assert.existValue(description) ? 'center' : 'baseline';
    const spacing = Assert.existValue(otherProps.spacing) ? otherProps.spacing : Assert.existValue(labelProps?.w) ? 'undefined' : (size ?? 'md');
    return (_jsxs(HorizontalStack, { ...otherProps, spacing: spacing, vAlign: vAlign, children: [_jsxs(Stack, { gap: 0, justify: "flex-start", w: labelProps?.w, children: [label && (_jsx(InputLabel, { ...labelProps, required: required, size: labelProps?.size ?? size, style: { ...labelProps?.style, whiteSpace: 'nowrap' }, w: undefined, children: label })), description && (_jsx(InputDescription, { ...descriptionProps, size: descriptionProps?.size ?? size, children: description }))] }), control] }));
}
//# sourceMappingURL=ContainerControl.js.map