import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckIcon, Combobox, Group } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { SelectEx } from '#components/Extendeds';
import { RenderItem, RenderOption } from '#render';
import { ContainerField } from '../ContainerField/ContainerField';
export function SelectField(props) {
    const { items, onChangedItem, selectedItem, getValueItem = ItemsHelper.getValueOfItem, getLabelItem = ItemsHelper.getLabelOfItem, getDisabledItem = ItemsHelper.getDisabledOfItem, renderItem, renderValue, selectProps, size, ...otherProps } = props;
    const [data, setData] = useState([]);
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const selectedValue = selectedItem ? getValueItem(selectedItem).toString() : undefined;
    const contextRender = { size: size, disabled: selectProps?.disabled };
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
    }, [items, items.length, size]);
    const handleChange = (value, option) => {
        const optionObject = option;
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
    const renderInternalOption = (item) => {
        const optionObject = item.option;
        if (typeof renderItem === 'function') {
            return renderItem(optionObject.original, contextRender);
        }
        else {
            const iconView = Boolean(selectProps?.withCheckIcon) && item.checked;
            const check = iconView ? (_jsx(CheckIcon, { className: Combobox.classes.optionsDropdownCheckIcon })) : selectProps?.withAlignedLabels ? (_jsx("div", { className: Combobox.classes.optionsDropdownCheckPlaceholder })) : undefined;
            const left = selectProps?.checkIconPosition === 'left' || selectProps?.checkIconPosition === undefined;
            const right = selectProps?.checkIconPosition === 'right';
            return (_jsxs(Group, { flex: "1", gap: "xs", children: [left && check, RenderOption.renderOption(size ?? 'md', optionObject.original), right && check] }));
        }
    };
    // { withBorder: true, p: 'xxs', bdRadius: 'md' }
    const renderInternalValue = (value, contextRender) => {
        const item = ItemsHelper.getItemByValueOrUndefined(items, value);
        if (typeof renderValue === 'function') {
            return renderValue(item, contextRender);
        }
        else {
            if (item) {
                return RenderItem.renderItem(size ?? 'md', item, undefined, {});
            }
            else {
                return _jsx(_Fragment, { children: value });
            }
        }
    };
    const actualRenderOption = (renderItem ? renderInternalOption : undefined);
    const actualRenderValue = (renderValue ? renderInternalValue : undefined);
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: _jsx(SelectEx, { data: data, error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], renderOption: actualRenderOption, renderValue: actualRenderValue, size: size, style: { flex: 1 }, value: selectedValue, w: undefined, onChange: handleChange, ...selectProps }) }));
    }
    else {
        return (_jsx(SelectEx, { ...containerProps, data: data, description: otherProps.description, descriptionProps: otherProps.descriptionProps, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, renderOption: actualRenderOption, renderValue: actualRenderValue, required: otherProps.required, size: size, value: selectedValue, onChange: handleChange, ...selectProps }));
    }
}
//# sourceMappingURL=SelectField.js.map