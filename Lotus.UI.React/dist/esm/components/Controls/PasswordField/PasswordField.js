import { jsx as _jsx } from "react/jsx-runtime";
import { PasswordInput } from '@mantine/core';
import { ContainerPropertiesHelper } from '#base';
import { ContainerField } from '../ContainerField/ContainerField';
export const PasswordField = (props) => {
    const { passwordInputProps: textInputProps, ...otherProps } = props;
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const passwordInput = (_jsx(PasswordInput, { error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], size: otherProps.size, style: { flex: 1 }, w: undefined, ...textInputProps }));
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: passwordInput }));
    }
    else {
        return (_jsx(PasswordInput, { ...containerProps, description: otherProps.description, descriptionProps: otherProps.descriptionProps, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, required: otherProps.required, size: otherProps.size, ...textInputProps }));
    }
};
//# sourceMappingURL=PasswordField.js.map