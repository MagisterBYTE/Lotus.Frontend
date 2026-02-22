import { jsx as _jsx } from "react/jsx-runtime";
import { Textarea } from '@mantine/core';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl } from '#components/Common';
export function TextAreaInput(props) {
    const { textAreaProps, value, onChange, onChangeValue, disabled, ...otherProps } = props;
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const handleChange = (event) => {
        if (onChange) {
            onChange(event);
        }
        if (onChangeValue) {
            onChangeValue(event.target.value);
        }
    };
    if (otherProps.inlinePlace) {
        const textArea = (_jsx(Textarea, { disabled: disabled, error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], size: otherProps.size, style: { flex: 1, ...textAreaProps?.style }, value: value, w: undefined, ...textAreaProps, onChange: handleChange }));
        return _jsx(ContainerControl, { ...otherProps, control: textArea });
    }
    else {
        return (_jsx(Textarea, { ...containerProps, description: otherProps.description, descriptionProps: otherProps.descriptionProps, disabled: disabled, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, required: otherProps.required, size: otherProps.size, value: value, ...textAreaProps, onChange: handleChange }));
    }
}
//# sourceMappingURL=TextAreaInput.js.map