import { jsx as _jsx } from "react/jsx-runtime";
import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl } from '#components/Common';
export function PasswordInput(props) {
    const { passwordInputProps, value, onChange, onChangeValue, disabled, ...otherProps } = props;
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
        const passwordInput = (_jsx(MantinePasswordInput, { disabled: disabled, error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], size: otherProps.size, style: { flex: 1, ...passwordInputProps?.style }, value: value, w: undefined, ...passwordInputProps, onChange: handleChange }));
        return (_jsx(ContainerControl, { ...otherProps, control: passwordInput }));
    }
    else {
        return (_jsx(MantinePasswordInput, { ...containerProps, description: otherProps.description, descriptionProps: otherProps.descriptionProps, disabled: disabled, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, required: otherProps.required, size: otherProps.size, value: value, ...passwordInputProps, onChange: handleChange }));
    }
}
//# sourceMappingURL=PasswordInput.js.map