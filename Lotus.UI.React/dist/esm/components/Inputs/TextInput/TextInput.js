import { jsx as _jsx } from "react/jsx-runtime";
import { TextInput as MantineTextInput } from '@mantine/core';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl } from '#components/Common';
export function TextInput(props) {
    const { textInputProps, value, onChange, onChangeValue, disabled, ...otherProps } = props;
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
        const textInput = (_jsx(MantineTextInput, { disabled: disabled, error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], size: otherProps.size, style: { flex: 1, ...textInputProps?.style }, value: value, w: undefined, ...textInputProps, onChange: handleChange }));
        return _jsx(ContainerControl, { ...otherProps, control: textInput });
    }
    else {
        return (_jsx(MantineTextInput, { ...containerProps, description: otherProps.description, descriptionProps: otherProps.descriptionProps, disabled: disabled, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, required: otherProps.required, size: otherProps.size, value: value, ...textInputProps, onChange: handleChange }));
    }
}
//# sourceMappingURL=TextInput.js.map