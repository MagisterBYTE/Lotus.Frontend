import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_FilterTextInput.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActionIcon, Autocomplete, Badge, Box, MultiSelect, Select, TextInput, } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDebouncedValue } from '@mantine/hooks';
import { localizedFilterOption } from '../../fns/filterFns';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_FilterTextInput = ({ header, rangeFilterIndex, table, ...rest }) => {
    const { options: { columnFilterDisplayMode, columnFilterModeOptions, icons: { IconX }, localization, mantineFilterAutocompleteProps, mantineFilterDateInputProps, mantineFilterMultiSelectProps = {
        clearable: true,
    }, mantineFilterSelectProps, mantineFilterTextInputProps, manualFiltering, }, refs: { filterInputRefs }, setColumnFilterFns, } = table;
    const { column } = header;
    const { columnDef } = column;
    const arg = { column, rangeFilterIndex, table };
    const textInputProps = {
        ...parseFromValuesOrFunc(mantineFilterTextInputProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineFilterTextInputProps, arg),
        ...rest,
    };
    const selectProps = {
        ...parseFromValuesOrFunc(mantineFilterSelectProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineFilterSelectProps, arg),
    };
    const multiSelectProps = {
        ...parseFromValuesOrFunc(mantineFilterMultiSelectProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineFilterMultiSelectProps, arg),
    };
    const dateInputProps = {
        ...parseFromValuesOrFunc(mantineFilterDateInputProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineFilterDateInputProps, arg),
    };
    const autoCompleteProps = {
        ...parseFromValuesOrFunc(mantineFilterAutocompleteProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineFilterAutocompleteProps, arg),
    };
    const isRangeFilter = columnDef.filterVariant === 'range' ||
        columnDef.filterVariant === 'date-range' ||
        rangeFilterIndex !== undefined;
    const isSelectFilter = columnDef.filterVariant === 'select';
    const isMultiSelectFilter = columnDef.filterVariant === 'multi-select';
    const isDateFilter = columnDef.filterVariant === 'date' ||
        columnDef.filterVariant === 'date-range';
    const isAutoCompleteFilter = columnDef.filterVariant === 'autocomplete';
    const allowedColumnFilterOptions = columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;
    const currentFilterOption = columnDef._filterFn;
    const filterChipLabel = ['empty', 'notEmpty'].includes(currentFilterOption)
        ? localizedFilterOption(localization, currentFilterOption)
        : '';
    const filterPlaceholder = !isRangeFilter
        ? (textInputProps?.placeholder ??
            localization.filterByColumn?.replace('{column}', String(columnDef.header)))
        : rangeFilterIndex === 0
            ? localization.min
            : rangeFilterIndex === 1
                ? localization.max
                : '';
    const facetedUniqueValues = column.getFacetedUniqueValues();
    const filterSelectOptions = useMemo(() => (autoCompleteProps?.data ??
        selectProps?.data ??
        multiSelectProps?.data ??
        ((isAutoCompleteFilter || isSelectFilter || isMultiSelectFilter) &&
            facetedUniqueValues
            ? Array.from(facetedUniqueValues.keys())
                .filter((key) => key !== null)
                .sort((a, b) => a.localeCompare(b))
            : []))
        //@ts-ignore
        .filter((o) => o !== undefined && o !== null), [
        autoCompleteProps?.data,
        facetedUniqueValues,
        isAutoCompleteFilter,
        isMultiSelectFilter,
        isSelectFilter,
        multiSelectProps?.data,
        selectProps?.data,
    ]);
    const isMounted = useRef(false);
    const [filterValue, setFilterValue] = useState(() => isMultiSelectFilter
        ? column.getFilterValue() || []
        : isRangeFilter
            ? column.getFilterValue()?.[rangeFilterIndex] || ''
            : (column.getFilterValue() ?? ''));
    const [debouncedFilterValue] = useDebouncedValue(filterValue, manualFiltering ? 400 : 200);
    //send debounced filterValue to table instance
    useEffect(() => {
        if (!isMounted.current)
            return;
        if (isRangeFilter) {
            column.setFilterValue((old) => {
                const newFilterValues = Array.isArray(old) ? old : ['', ''];
                newFilterValues[rangeFilterIndex] =
                    debouncedFilterValue;
                return newFilterValues;
            });
        }
        else {
            column.setFilterValue(debouncedFilterValue ?? undefined);
        }
    }, [debouncedFilterValue]);
    //receive table filter value and set it to local state
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        const tableFilterValue = column.getFilterValue();
        if (tableFilterValue === undefined) {
            handleClear();
        }
        else if (isRangeFilter && rangeFilterIndex !== undefined) {
            setFilterValue((tableFilterValue ?? ['', ''])[rangeFilterIndex]);
        }
        else {
            setFilterValue(tableFilterValue ?? '');
        }
    }, [column.getFilterValue()]);
    const handleClear = () => {
        if (isMultiSelectFilter) {
            setFilterValue([]);
            column.setFilterValue([]);
        }
        else if (isRangeFilter) {
            setFilterValue('');
            column.setFilterValue((old) => {
                const newFilterValues = Array.isArray(old) ? old : ['', ''];
                newFilterValues[rangeFilterIndex] = undefined;
                return newFilterValues;
            });
            // This is from Mantine v6 but it also applies for v7
            // https://github.com/mantinedev/mantine/issues/4716#issuecomment-1702699688
        }
        else if (isSelectFilter) {
            setFilterValue(null);
            column.setFilterValue(null);
        }
        else {
            setFilterValue('');
            column.setFilterValue(undefined);
        }
    };
    const handleClearEmptyFilterChip = () => {
        if (isMultiSelectFilter) {
            setFilterValue([]);
            column.setFilterValue([]);
        }
        else {
            setFilterValue('');
            column.setFilterValue(undefined);
        }
        setColumnFilterFns((prev) => ({
            ...prev,
            [header.id]: allowedColumnFilterOptions?.[0] ?? 'fuzzy',
        }));
    };
    const { className, ...commonProps } = {
        'aria-label': filterPlaceholder,
        className: clsx('mrt-filter-text-input', classes.root, isDateFilter
            ? classes['date-filter']
            : isRangeFilter
                ? classes['range-filter']
                : !filterChipLabel && classes['not-filter-chip']),
        disabled: !!filterChipLabel,
        onChange: setFilterValue,
        onClick: (event) => event.stopPropagation(),
        placeholder: filterPlaceholder,
        style: {
            ...(isMultiSelectFilter
                ? multiSelectProps?.style
                : isSelectFilter
                    ? selectProps?.style
                    : isDateFilter
                        ? dateInputProps?.style
                        : textInputProps?.style),
        },
        title: filterPlaceholder,
        value: isMultiSelectFilter && !Array.isArray(filterValue) ? [] : filterValue,
        variant: 'unstyled',
    };
    const ClearButton = filterValue ? (_jsx(ActionIcon, { "aria-label": localization.clearFilter, color: "var(--mantine-color-gray-7)", onClick: handleClear, size: "sm", title: localization.clearFilter ?? '', variant: "transparent", children: _jsx(IconX, {}) })) : null;
    if (columnDef.Filter) {
        return (_jsx(_Fragment, { children: columnDef.Filter?.({ column, header, rangeFilterIndex, table }) }));
    }
    if (filterChipLabel) {
        return (_jsx(Box, { style: commonProps.style, children: _jsx(Badge, { className: classes['filter-chip-badge'], onClick: handleClearEmptyFilterChip, rightSection: ClearButton, size: "lg", children: filterChipLabel }) }));
    }
    if (isMultiSelectFilter) {
        return (_jsx(MultiSelect, { ...commonProps, searchable: true, ...multiSelectProps, className: clsx(className, multiSelectProps.className), data: filterSelectOptions, onChange: (value) => setFilterValue(value), ref: (node) => {
                if (node) {
                    filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
                        node;
                    if (multiSelectProps.ref) {
                        multiSelectProps.ref.current = node;
                    }
                }
            }, rightSection: filterValue?.toString()?.length && multiSelectProps?.clearable
                ? ClearButton
                : undefined, style: commonProps.style }));
    }
    if (isSelectFilter) {
        return (_jsx(Select, { ...commonProps, clearable: true, searchable: true, ...selectProps, className: clsx(className, selectProps.className), clearButtonProps: {
                size: 'md',
            }, data: filterSelectOptions, ref: (node) => {
                if (node) {
                    filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
                        node;
                    if (selectProps.ref) {
                        selectProps.ref.current = node;
                    }
                }
            }, style: commonProps.style }));
    }
    if (isDateFilter) {
        return (_jsx(DateInput, { ...commonProps, allowDeselect: true, clearable: true, popoverProps: { withinPortal: columnFilterDisplayMode !== 'popover' }, ...dateInputProps, className: clsx(className, dateInputProps.className), onChange: (event) => commonProps.onChange(event === null ? '' : event), ref: (node) => {
                if (node) {
                    filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
                        node;
                    if (dateInputProps.ref) {
                        dateInputProps.ref.current = node;
                    }
                }
            }, style: commonProps.style }));
    }
    if (isAutoCompleteFilter) {
        return (_jsx(Autocomplete, { ...commonProps, onChange: (value) => setFilterValue(value), rightSection: filterValue?.toString()?.length ? ClearButton : undefined, ...autoCompleteProps, className: clsx(className, autoCompleteProps.className), data: filterSelectOptions, ref: (node) => {
                if (node) {
                    filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
                        node;
                    if (autoCompleteProps.ref) {
                        autoCompleteProps.ref.current = node;
                    }
                }
            }, style: commonProps.style }));
    }
    return (_jsx(TextInput, { ...commonProps, onChange: (e) => setFilterValue(e.target.value), rightSection: filterValue?.toString()?.length ? ClearButton : undefined, ...textInputProps, className: clsx(className, textInputProps.className), mt: 0, ref: (node) => {
            if (node) {
                filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
                    node;
                if (textInputProps.ref) {
                    textInputProps.ref.current = node;
                }
            }
        }, style: commonProps.style }));
};
//# sourceMappingURL=MRT_FilterTextInput.js.map