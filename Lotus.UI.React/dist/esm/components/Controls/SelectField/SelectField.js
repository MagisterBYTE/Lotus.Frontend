import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Group, Select } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { ItemsHelper } from 'lotus-core/helpers';
import { useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { RenderIcon, RenderOption } from '#render';
import { ContainerField } from '../ContainerField/ContainerField';
export function SelectField(props) {
    const { items, onChangedItem, selectedItem, getValueItem = ItemsHelper.getValueOfItem, getLabelItem = ItemsHelper.getLabelOfItem, getDisabledItem = ItemsHelper.getDisabledOfItem, selectProps, ...otherProps } = props;
    const [selectedIcon, setSelectedIcon] = useState(undefined);
    const [data, setData] = useState([]);
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const selectedValue = selectedItem ? getValueItem(selectedItem).toString() : undefined;
    const prepareData = () => {
        const newData = [];
        for (const item of items) {
            newData.push({
                label: getLabelItem(item),
                value: getValueItem(item).toString(),
                disabled: getDisabledItem(item),
                original: item
            });
        }
        setData(newData);
    };
    useEffect(() => {
        prepareData();
    }, [items, items.length, otherProps.size]);
    const handleChange = (value, option) => {
        const optionObject = option;
        setSelectedIcon(optionObject.original?.icon);
        if (onChangedItem) {
            if (value === null) {
                onChangedItem(undefined);
            }
            else {
                onChangedItem(optionObject.original);
            }
        }
        if (selectProps?.onChange) {
            selectProps?.onChange(value, option);
        }
    };
    const renderOption = (item) => {
        const optionObject = item.option;
        return (_jsxs(Group, { flex: "1", gap: "xs", children: [RenderOption.renderOption(otherProps.size ?? 'md', optionObject.original), item.checked && _jsx(IconCheck, { style: { marginInlineStart: 'auto' } })] }));
    };
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: _jsx(Select, { data: data, error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], leftSection: RenderIcon.renderIcon(otherProps.size ?? 'md', selectedIcon), renderOption: renderOption, size: otherProps.size, style: { flex: 1 }, value: selectedValue, w: undefined, onChange: handleChange, ...selectProps }) }));
    }
    else {
        return (_jsx(Select, { ...containerProps, data: data, description: otherProps.description, descriptionProps: otherProps.descriptionProps, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, leftSection: RenderIcon.renderIcon(otherProps.size ?? 'md', selectedIcon), renderOption: renderOption, required: otherProps.required, size: otherProps.size, value: selectedValue, onChange: handleChange, ...selectProps }));
    }
}
//# sourceMappingURL=SelectField.js.map