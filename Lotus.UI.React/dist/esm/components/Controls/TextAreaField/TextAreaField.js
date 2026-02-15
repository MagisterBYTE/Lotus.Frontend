import { jsx as _jsx } from "react/jsx-runtime";
import { Textarea } from '@mantine/core';
import { ContainerPropertiesHelper } from '#base';
import { ContainerField } from '../ContainerField/ContainerField';
export const TextAreaField = (props) => {
    const { textAreaProps: textInputProps, ...otherProps } = props;
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const textArea = (_jsx(Textarea, { error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], resize: "both", size: otherProps.size, style: { flex: 1 }, w: undefined, ...textInputProps }));
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: textArea }));
    }
    else {
        return (_jsx(Textarea, { resize: "both", ...containerProps, description: otherProps.description, descriptionProps: otherProps.descriptionProps, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, required: otherProps.required, size: otherProps.size, ...textInputProps }));
    }
};
//# sourceMappingURL=TextAreaField.js.map