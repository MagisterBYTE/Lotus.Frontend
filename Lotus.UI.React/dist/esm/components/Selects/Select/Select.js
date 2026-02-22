import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckIcon, Combobox, Group } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { Assert } from 'lotus-core/utils';
import { useMemo } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl } from '#components/Common';
import { SelectEx } from '#components/Extendeds';
import { RenderItem, RenderOption } from '#render';
export function Select(props) {
    const { items, onChangedItem, selectedItem, imageDatabase, selectRenderComponent, getValueItem = ItemsHelper.getValueOfItem, getLabelItem = ItemsHelper.getLabelOfItem, getDisabledItem = ItemsHelper.getDisabledOfItem, renderItem, renderValue, selectProps, size, ...otherProps } = props;
    const data = useMemo(() => items.map((item) => ({
        label: getLabelItem(item),
        value: getValueItem(item).toString(),
        disabled: getDisabledItem(item),
        original: item
    })), [items, getLabelItem, getValueItem, getDisabledItem]);
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const selectedValue = selectedItem ? getValueItem(selectedItem).toString() : undefined;
    const handleChange = (value, option) => {
        const original = option?.original;
        onChangedItem?.(value === null ? undefined : original);
        selectProps?.onChange?.(value, option);
    };
    // #region Render
    const renderOptionContent = (input) => {
        const { option, checked } = input;
        const itemObject = option;
        // 1. Подготавливаем данные для рендера
        const currentContext = {
            size,
            disabled: option.disabled,
            selected: checked
        };
        // 2. Получаем основной контент (кастомный или дефолтный)
        let content;
        if (typeof renderItem === 'function') {
            content = renderItem(itemObject.original, currentContext);
        }
        else {
            content = RenderOption.renderOption(size ?? 'md', itemObject.original, imageDatabase);
        }
        // 3. Если не нужно рисовать обертку с иконкой — просто возвращаем контент
        if (!selectRenderComponent && typeof renderItem === 'function') {
            return content;
        }
        // 4. Логика иконки чекбокса (Mantine-style)
        const isRight = selectProps?.checkIconPosition === 'right';
        const showCheck = selectProps?.withCheckIcon && checked;
        const checkIcon = showCheck ? (_jsx(CheckIcon, { className: Combobox.classes.optionsDropdownCheckIcon })) : selectProps?.withAlignedLabels ? (_jsx("div", { className: Combobox.classes.optionsDropdownCheckPlaceholder })) : null;
        // 5. Собираем финальную группу
        return (_jsxs(Group, { flex: "1", gap: "xs", wrap: "nowrap", children: [!isRight && checkIcon, content, isRight && checkIcon] }));
    };
    const renderSelectedValue = (val) => {
        const item = ItemsHelper.getItemByValueOrUndefined(items, val);
        // Если есть кастомная функция рендера значения
        if (typeof renderValue === 'function') {
            return renderValue(item, { size });
        }
        // Иначе дефолтный рендер элемента или просто текст
        if (item) {
            return RenderItem.renderItem(size ?? 'md', item, imageDatabase, {});
        }
        return val;
    };
    const actualRenderOption = useMemo(() => (renderItem ? renderOptionContent : undefined), [renderItem, items, size, selectProps]);
    const actualRenderValue = useMemo(() => (renderValue ? renderSelectedValue : undefined), [renderValue, items, size]);
    // #endregion
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerControl, { ...otherProps, control: _jsx(SelectEx, { data: data, error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], renderOption: actualRenderOption, renderValue: actualRenderValue, size: size, style: { flex: 1, ...selectProps?.style }, value: selectedValue, w: undefined, onChange: handleChange, ...selectProps }), size: size, vAlign: otherProps.vAlign ?? (Assert.emptyValue(otherProps.error) && Assert.emptyValue(otherProps.description) ? 'center' : undefined) }));
    }
    else {
        return (_jsx(SelectEx, { ...containerProps, data: data, description: otherProps.description, descriptionProps: otherProps.descriptionProps, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, renderOption: actualRenderOption, renderValue: actualRenderValue, required: otherProps.required, size: size, value: selectedValue, onChange: handleChange, ...selectProps }));
    }
}
//# sourceMappingURL=Select.js.map