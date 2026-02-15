import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckIcon, Combobox, Group } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { Assert } from 'lotus-core/utils';
import { useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { MultiSelectEx } from '#components/Extendeds';
import { RenderItem, RenderOption } from '#render';
import { ContainerField } from '../ContainerField/ContainerField';
export function MultiSelectField(props) {
    const { items, onChangedItems, selectedItems, getValueItem = ItemsHelper.getValueOfItem, getLabelItem = ItemsHelper.getLabelOfItem, getDisabledItem = ItemsHelper.getDisabledOfItem, renderItem, renderValue, selectProps, size, ...otherProps } = props;
    const [data, setData] = useState([]);
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const selectedValues = selectedItems ? selectedItems.map((x) => getValueItem(x).toString()) : undefined;
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
    const handleChange = (value) => {
        if (onChangedItems) {
            if (Assert.emptyValue(value) || value.length === 0) {
                onChangedItems([]);
            }
            else {
                const selectedItems = ItemsHelper.getItemsByValues(items, value);
                onChangedItems(selectedItems);
            }
        }
        if (selectProps?.onChange) {
            selectProps?.onChange(value);
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
    const renderInternalPill = (value, contextRender) => {
        const item = ItemsHelper.getItemByValueOrUndefined(items, value);
        if (typeof renderValue === 'function') {
            return renderValue(item, contextRender);
        }
        else {
            if (item) {
                return RenderItem.renderItem(size ?? 'md', item, undefined, { withBorder: true, p: 'xxs', bdRadius: 'md' });
            }
            else {
                return _jsx(_Fragment, { children: value });
            }
        }
    };
    const actualRenderOption = (renderItem ? renderInternalOption : undefined);
    const actualRenderPill = (renderValue ? renderInternalPill : undefined);
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: _jsx(MultiSelectEx, { data: data, error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], renderOption: actualRenderOption, renderPill: actualRenderPill, size: size, style: { flex: 1 }, value: selectedValues, w: undefined, onChange: handleChange, ...selectProps }) }));
    }
    else {
        return (_jsx(MultiSelectEx, { ...containerProps, withAlignedLabels: true, data: data, description: otherProps.description, descriptionProps: otherProps.descriptionProps, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, renderOption: actualRenderOption, renderPill: actualRenderPill, required: otherProps.required, size: size, value: selectedValues, onChange: handleChange, ...selectProps }));
    }
}
//# sourceMappingURL=MultiSelectField.js.map