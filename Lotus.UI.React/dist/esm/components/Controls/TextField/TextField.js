import { jsx as _jsx } from "react/jsx-runtime";
import { TextInput } from '@mantine/core';
import { ContainerPropertiesHelper } from '#base';
import { ContainerField } from '../ContainerField/ContainerField';
export const TextField = (props) => {
    const { textInputProps, ...otherProps } = props;
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const textInput = (_jsx(TextInput, { error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], size: otherProps.size, style: { flex: 1 }, w: undefined, ...textInputProps }));
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: textInput }));
    }
    else {
        return (_jsx(TextInput, { ...containerProps, description: otherProps.description, descriptionProps: otherProps.descriptionProps, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, required: otherProps.required, size: otherProps.size, ...textInputProps }));
    }
};
//# sourceMappingURL=TextField.js.map