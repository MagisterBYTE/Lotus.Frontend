/* eslint-disable */
import { IContextRenderBase } from '#types';
import {
  Combobox,
  ComboboxItem,
  Factory,
  factory,
  getOptionsLockup,
  getParsedComboboxData,
  Input,
  InputBase,
  InputVariant,
  OptionsDropdown,
  SelectFactory,
  SelectProps,
  SelectStylesNames,
  useCombobox,
  useProps,
  useResolvedStylesApi
} from '@mantine/core';
import { useId, usePrevious, useUncontrolled } from '@mantine/hooks';
import { ReactNode, useEffect, useMemo, useRef } from 'react';

export interface ISelectExProps extends SelectProps {
  renderValue?: (value: string, contextRender?: IContextRenderBase) => ReactNode;
}

const defaultProps = {
  withCheckIcon: true,
  allowDeselect: true,
  checkIconPosition: 'left',
  openOnFocus: true
} satisfies Partial<ISelectExProps>;

export type SelectExFactory = Factory<{
  props: ISelectExProps;
  ref: HTMLInputElement;
  stylesNames: SelectStylesNames;
  variant: InputVariant;
}>;

export const SelectEx = factory<SelectExFactory>((_props, ref) => 
{
  const props = useProps('Select', defaultProps, _props);
  const {
    classNames,
    styles,
    unstyled,
    vars,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownClose,
    onDropdownOpen,
    onFocus,
    onBlur,
    onClick,
    onChange,
    data,
    value,
    defaultValue,
    selectFirstOptionOnChange,
    selectFirstOptionOnDropdownOpen,
    onOptionSubmit,
    comboboxProps,
    readOnly,
    disabled,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    size,
    searchable,
    rightSection,
    checkIconPosition,
    withCheckIcon,
    withAlignedLabels,
    nothingFoundMessage,
    name,
    form,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    allowDeselect,
    error,
    rightSectionPointerEvents,
    id,
    clearable,
    clearButtonProps,
    hiddenInputProps,
    renderOption,
    onClear,
    autoComplete,
    scrollAreaProps,
    __defaultRightSection,
    __clearSection,
    __clearable,
    chevronColor,
    autoSelectOnBlur,
    openOnFocus,
    attributes,
    renderValue,
    ...others
  } = props;

  const parsedData = useMemo(() => getParsedComboboxData(data), [data]);
  const retainedSelectedOptions = useRef<Record<string, ComboboxItem>>({});
  const optionsLockup = useMemo(() => getOptionsLockup(parsedData), [parsedData]);
  const _id = useId(id);

  const [_value, setValue, controlled] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });

  const selectedOption = typeof _value === 'string' ? (_value in optionsLockup ? optionsLockup[_value] : retainedSelectedOptions.current[_value]) : undefined;
  const previousSelectedOption = usePrevious(selectedOption);

  const [search, setSearch, searchControlled] = useUncontrolled({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: selectedOption ? selectedOption.label : '',
    onChange: onSearchChange
  });

   const contextRender = { size, disabled } as IContextRenderBase;

  const combobox = useCombobox({
    opened: dropdownOpened,
    defaultOpened: defaultDropdownOpened,
    onDropdownOpen: () => 
    {
      onDropdownOpen?.();
      if (selectFirstOptionOnDropdownOpen) 
      {
        combobox.selectFirstOption();
      }
      else 
      {
        combobox.updateSelectedOptionIndex('active', { scrollIntoView: true });
      }
    },
    onDropdownClose: () => 
    {
      onDropdownClose?.();
      // Required for autoSelectOnBlur to work correctly
      setTimeout(combobox.resetSelectedOption, 0);
    }
  });

  const handleSearchChange = (value: string) => 
  {
    setSearch(value);
    combobox.resetSelectedOption();
  };

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<SelectFactory>({
    props,
    styles,
    classNames
  });

  useEffect(() => 
  {
    if (selectFirstOptionOnChange) 
    {
      combobox.selectFirstOption();
    }
  }, [selectFirstOptionOnChange, search]);

  useEffect(() => 
  {
    if (value === null) 
    {
      handleSearchChange('');
    }

    if (
      typeof value === 'string' &&
      selectedOption &&
      (previousSelectedOption?.value !== selectedOption.value || previousSelectedOption?.label !== selectedOption.label)
    ) 
    {
      handleSearchChange(selectedOption.label);
    }
  }, [value, selectedOption]);

  useEffect(() => 
  {
    if (!controlled && !searchControlled) 
    {
      handleSearchChange(
        typeof _value === 'string' ? (_value in optionsLockup ? optionsLockup[_value]?.label : retainedSelectedOptions.current[_value]?.label || '') : ''
      );
    }
  }, [optionsLockup, _value]);

  useEffect(() => 
  {
    if (_value) 
    {
      if (_value in optionsLockup) 
      {
        retainedSelectedOptions.current[_value] = optionsLockup[_value];
      }
    }
  }, [optionsLockup, _value]);

  const clearButton = (
    <Combobox.ClearButton
      {...clearButtonProps}
      onClear={() => 
      {
        setValue(null, null);
        handleSearchChange('');
        onClear?.();
      }}
    />
  );

  const _clearable = clearable && !!_value && !disabled && !readOnly;

  return (
    <>
      <Combobox
        __staticSelector="Select"
        attributes={attributes}
        classNames={resolvedClassNames}
        keepMounted={autoSelectOnBlur}
        readOnly={readOnly}
        size={size}
        store={combobox}
        styles={resolvedStyles}
        unstyled={unstyled}
        onOptionSubmit={(val) => 
        {
          onOptionSubmit?.(val);
          const optionLockup = allowDeselect ? (optionsLockup[val].value === _value ? null : optionsLockup[val]) : optionsLockup[val];

          const nextValue = optionLockup ? optionLockup.value : null;

          nextValue !== _value && setValue(nextValue, optionLockup);
          !controlled && handleSearchChange(typeof nextValue === 'string' ? optionLockup?.label || '' : '');
          combobox.closeDropdown();
        }}
        {...comboboxProps}
      >
        <Combobox.Target autoComplete={autoComplete} targetType={searchable ? (renderValue ? 'button' : 'input') : 'button'}>
          {renderValue && (
            <InputBase
              multiline
              pointer
              __clearable={_clearable}
              __clearSection={clearButton}
              __defaultRightSection={<Combobox.Chevron color={chevronColor} error={error} size={size} unstyled={unstyled} />}
              component="button"
              disabled={disabled}
              id={_id}
              rightSection={rightSection}
              rightSectionPointerEvents={rightSectionPointerEvents || 'none'}
              // @ts-expect-error
              type="button"
              onClick={() => combobox.toggleDropdown()}
              error={error}
              {...others}
              size={size}
            >
              {selectedOption ? <>{renderValue(selectedOption.value, contextRender)}</> : <Input.Placeholder>{props.placeholder}</Input.Placeholder>}
            </InputBase>
          )}
          {!renderValue && (
            <InputBase
              ref={ref}
              __clearable={_clearable}
              __clearSection={clearButton}
              __defaultRightSection={<Combobox.Chevron color={chevronColor} error={error} size={size} unstyled={unstyled} />}
              id={_id}
              rightSection={rightSection}
              rightSectionPointerEvents={rightSectionPointerEvents || 'none'}
              {...others}
              __staticSelector="Select"
              attributes={attributes}
              classNames={resolvedClassNames}
              disabled={disabled}
              error={error}
              pointer={!searchable}
              readOnly={readOnly || !searchable}
              size={size}
              styles={resolvedStyles}
              unstyled={unstyled}
              value={search}
              onBlur={(event) => 
              {
                if (autoSelectOnBlur) 
                {
                  combobox.clickSelectedOption();
                }

                !!searchable && combobox.closeDropdown();
                const optionLockup = typeof _value === 'string' && (_value in optionsLockup ? optionsLockup[_value] : retainedSelectedOptions.current[_value]);
                handleSearchChange(optionLockup ? optionLockup.label || '' : '');
                onBlur?.(event);
              }}
              onChange={(event) => 
              {
                handleSearchChange(event.currentTarget.value);
                combobox.openDropdown();
                selectFirstOptionOnChange && combobox.selectFirstOption();
              }}
              onClick={(event) => 
              {
                searchable ? combobox.openDropdown() : combobox.toggleDropdown();
                onClick?.(event);
              }}
              onFocus={(event) => 
              {
                openOnFocus && !!searchable && combobox.openDropdown();
                onFocus?.(event);
              }}
            />
          )}
        </Combobox.Target>
        <OptionsDropdown
          aria-label={others.label ? undefined : others['aria-label']}
          checkIconPosition={checkIconPosition}
          data={parsedData}
          filter={filter}
          filterOptions={!!searchable && selectedOption?.label !== search}
          hidden={readOnly || disabled}
          hiddenWhenEmpty={!nothingFoundMessage}
          labelId={others.label ? `${_id}-label` : undefined}
          limit={limit}
          maxDropdownHeight={maxDropdownHeight}
          nothingFoundMessage={nothingFoundMessage}
          renderOption={renderOption}
          scrollAreaProps={scrollAreaProps}
          search={search}
          unstyled={unstyled}
          value={_value}
          withAlignedLabels={withAlignedLabels}
          withCheckIcon={withCheckIcon}
          withScrollArea={withScrollArea}
        />
      </Combobox>
      <Combobox.HiddenInput disabled={disabled} form={form} name={name} value={_value} {...hiddenInputProps} />
    </>
  );
});
