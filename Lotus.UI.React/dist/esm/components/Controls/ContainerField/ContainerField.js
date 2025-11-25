import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputDescription, InputLabel, Stack } from '@mantine/core';
import { Assert } from 'lotus-core/utils';
import { HorizontalStack } from '#components/Layout';
export function ContainerField(props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { componentField, inlinePlace = false, size, required, label, labelProps, description, descriptionProps, error, errorProps, ...otherProps } = props;
    const vAlign = Assert.existValue(otherProps.vAlign) ? otherProps.vAlign : Assert.existValue(description) ? 'center' : 'baseline';
    const spacing = Assert.existValue(otherProps.spacing) ? otherProps.spacing : Assert.existValue(labelProps?.w) ? 'undefined' : (size ?? 'md');
    return (_jsxs(HorizontalStack, { ...otherProps, spacing: spacing, vAlign: vAlign, children: [_jsxs(Stack, { gap: 0, justify: "flex-start", w: labelProps?.w, children: [label && (_jsx(InputLabel, { ...labelProps, required: required, size: labelProps?.size ?? size, w: undefined, children: label })), description && (_jsx(InputDescription, { ...descriptionProps, size: descriptionProps?.size ?? size, children: description }))] }), componentField] }));
}
//# sourceMappingURL=ContainerField.js.map