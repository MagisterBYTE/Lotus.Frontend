/* eslint-disable */
import
{
  Combobox,
  ComboboxItem,
  extractStyleProps,
  factory,
  Factory,
  getOptionsLockup,
  getParsedComboboxData,
  MultiSelectProps,
  MultiSelectStylesNames,
  OptionsDropdown,
  Pill,
  PillsInput,
  useCombobox,
  useProps,
  useResolvedStylesApi,
  useStyles
} from '@mantine/core';
import { useId, useUncontrolled } from '@mantine/hooks';
import { ReactNode, useEffect, useRef } from 'react';
import { filterPickedValues } from './filter-picked-values';
import { IContextRenderBase } from '#types';

const clearSectionOffset: Record<string, number> = {
  xs: 41,
  sm: 50,
  md: 60,
  lg: 72,
  xl: 89
};

export interface IMultiSelectExProps extends MultiSelectProps 
{
  renderPill?: (value: string, contextRender?: IContextRenderBase) => ReactNode
}

export type MultiSelectExFactory = Factory<{
  props: IMultiSelectExProps;
  ref: HTMLInputElement;
  stylesNames: MultiSelectStylesNames;
}>;

const defaultProps = {
  // @ts-expect-error maxValues
  maxValues: Infinity,
  withCheckIcon: true,
  checkIconPosition: 'left' as const,
  hiddenInputValuesDivider: ',',
  clearSearchOnChange: true,
  openOnFocus: true,
  size: 'sm'
} satisfies Partial<MultiSelectExFactory>;

export const MultiSelectEx = factory<MultiSelectExFactory>((_props, ref) =>
{
  const props = useProps('MultiSelect', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size,
    value,
    defaultValue,
    onChange,
    onKeyDown,
    variant,
    data,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose,
    selectFirstOptionOnChange,
    selectFirstOptionOnDropdownOpen,
    onOptionSubmit,
    comboboxProps,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    readOnly,
    disabled,
    onFocus,
    onBlur,
    radius,
    rightSection,
    rightSectionWidth,
    rightSectionPointerEvents,
    rightSectionProps,
    leftSection,
    leftSectionWidth,
    leftSectionPointerEvents,
    leftSectionProps,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    labelProps,
    descriptionProps,
    errorProps,
    wrapperProps,
    description,
    label,
    error,
    maxValues,
    searchable,
    nothingFoundMessage,
    withCheckIcon,
    withAlignedLabels,
    checkIconPosition,
    hidePickedOptions,
    withErrorStyles,
    name,
    form,
    id,
    clearable,
    clearButtonProps,
    hiddenInputProps,
    placeholder,
    hiddenInputValuesDivider,
    required,
    mod,
    renderOption,
    onRemove,
    onClear,
    scrollAreaProps,
    chevronColor,
    attributes,
    clearSearchOnChange,
    openOnFocus,
    renderPill,
    ...others
  } = props;

  const _id = useId(id);
  const parsedData = getParsedComboboxData(data);
  const optionsLockup = getOptionsLockup(parsedData);
  const retainedSelectedOptions = useRef<Record<string, ComboboxItem>>({});

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
    },
    onDropdownClose: () =>
    {
      onDropdownClose?.();
      combobox.resetSelectedOption();
    }
  });

  const {
    styleProps,
    rest: { type, autoComplete, ...rest }
  } = extractStyleProps(others);

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });

  const [_searchValue, setSearchValue] = useUncontrolled({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: '',
    onChange: onSearchChange
  });

  const handleSearchChange = (value: string) =>
  {
    setSearchValue(value);
    combobox.resetSelectedOption();
  };

  const getStyles = useStyles<MultiSelectExFactory>({
    name: 'MultiSelect',
    classes: {} as any,
    props,
    classNames,
    styles,
    unstyled,
    attributes
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<MultiSelectExFactory>({
    props,
    styles,
    classNames
  });

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) =>
  {
    onKeyDown?.(event);

    if (event.key === ' ' && !searchable)
    {
      event.preventDefault();
      combobox.toggleDropdown();
    }

    if (event.key === 'Backspace' && _searchValue.length === 0 && _value.length > 0)
    {
      onRemove?.(_value[_value.length - 1]);
      setValue(_value.slice(0, _value.length - 1));
    }
  };

  const values = _value.map((item, index) =>
  {
    const optionData = optionsLockup[item] || retainedSelectedOptions.current[item];
    const withRemoveButton = !readOnly && !optionsLockup[item]?.disabled;
    const itemDisabled = optionsLockup[item]?.disabled
    if (renderPill)
    {
      const contextRender = { withRemoveButton, size, disabled, itemDisabled, index };
      return renderPill(item, contextRender as IContextRenderBase);
    }
    else
    {
      return (
        <Pill
          key={`${item}-${index}`}
          disabled={disabled}
          unstyled={unstyled}
          withRemoveButton={withRemoveButton}
          onRemove={() =>
          {
            setValue(_value.filter((i) => item !== i));
            onRemove?.(item);
          }}
          {...getStyles('pill')}
        >
          {optionData?.label || item}
        </Pill>
      );
    }
  });

  useEffect(() =>
  {
    if (selectFirstOptionOnChange)
    {
      combobox.selectFirstOption();
    }
  }, [selectFirstOptionOnChange, _searchValue]);

  useEffect(() =>
  {
    _value.forEach((val) =>
    {
      if (val in optionsLockup)
      {
        retainedSelectedOptions.current[val] = optionsLockup[val];
      }
    });
  }, [optionsLockup, _value]);

  const clearButton = (
    <Combobox.ClearButton
      {...clearButtonProps}
      onClear={() =>
      {
        onClear?.();
        setValue([]);
        handleSearchChange('');
      }}
    />
  );

  const filteredData = filterPickedValues({ data: parsedData, value: _value });
  const _clearable = clearable && _value.length > 0 && !disabled && !readOnly;
  const pillsListStyle = _clearable ? { paddingInlineEnd: clearSectionOffset[size] ?? clearSectionOffset.sm } : undefined;

  return (
    <>
      <Combobox
        __staticSelector="MultiSelect"
        attributes={attributes}
        classNames={resolvedClassNames}
        readOnly={readOnly}
        size={size}
        store={combobox}
        styles={resolvedStyles}
        unstyled={unstyled}
        onOptionSubmit={(val) =>
        {
          onOptionSubmit?.(val);
          if (clearSearchOnChange)
          {
            handleSearchChange('');
          }
          combobox.updateSelectedOptionIndex('selected');

          if (_value.includes(optionsLockup[val].value))
          {
            setValue(_value.filter((v) => v !== optionsLockup[val].value));
            onRemove?.(optionsLockup[val].value);
          } else if (_value.length < maxValues)
          {
            setValue([..._value, optionsLockup[val].value]);
          }
        }}
        {...comboboxProps}
      >
        <Combobox.DropdownTarget>
          <PillsInput
            {...styleProps}
            __clearable={_clearable}
            __clearSection={clearButton}
            __defaultRightSection={<Combobox.Chevron color={chevronColor} error={error} size={size} unstyled={unstyled} />}
            __staticSelector="MultiSelect"
            __stylesApiProps={{
              ...props,
              rightSectionPointerEvents: rightSectionPointerEvents || (_clearable ? 'all' : 'none'),
              multiline: true
            }}
            attributes={attributes}
            className={className}
            classNames={resolvedClassNames}
            data-expanded={combobox.dropdownOpened || undefined}
            description={description}
            descriptionProps={descriptionProps}
            disabled={disabled}
            error={error}
            errorProps={errorProps}
            id={_id}
            inputContainer={inputContainer}
            inputWrapperOrder={inputWrapperOrder}
            label={label}
            labelProps={labelProps}
            leftSection={leftSection}
            leftSectionPointerEvents={leftSectionPointerEvents}
            leftSectionProps={leftSectionProps}
            leftSectionWidth={leftSectionWidth}
            mod={mod}
            pointer={!searchable}
            radius={radius}
            required={required}
            rightSection={rightSection}
            rightSectionPointerEvents={rightSectionPointerEvents || 'none'}
            rightSectionProps={rightSectionProps}
            rightSectionWidth={rightSectionWidth}
            size={size}
            style={style}
            styles={resolvedStyles}
            unstyled={unstyled}
            variant={variant}
            withAsterisk={withAsterisk}
            withErrorStyles={withErrorStyles}
            wrapperProps={wrapperProps}
            onClick={() => (searchable ? combobox.openDropdown() : combobox.toggleDropdown())}
          >
            <Pill.Group attributes={attributes} disabled={disabled} unstyled={unstyled} {...getStyles('pillsList', { style: pillsListStyle })}>
              {values}
              <Combobox.EventsTarget autoComplete={autoComplete}>
                <PillsInput.Field
                  {...rest}
                  ref={ref}
                  id={_id}
                  placeholder={placeholder}
                  type={!searchable && !placeholder ? 'hidden' : 'visible'}
                  {...getStyles('inputField')}
                  disabled={disabled}
                  pointer={!searchable}
                  readOnly={readOnly || !searchable}
                  unstyled={unstyled}
                  value={_searchValue}
                  onBlur={(event) =>
                  {
                    onBlur?.(event);
                    combobox.closeDropdown();
                    handleSearchChange('');
                  }}
                  onChange={(event) =>
                  {
                    handleSearchChange(event.currentTarget.value);
                    searchable && combobox.openDropdown();
                    selectFirstOptionOnChange && combobox.selectFirstOption();
                  }}
                  onFocus={(event) =>
                  {
                    onFocus?.(event);
                    openOnFocus && searchable && combobox.openDropdown();
                  }}
                  onKeyDown={handleInputKeydown}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <OptionsDropdown
          aria-label={label ? undefined : others['aria-label']}
          checkIconPosition={checkIconPosition}
          data={hidePickedOptions ? filteredData : parsedData}
          filter={filter}
          filterOptions={searchable}
          hidden={readOnly || disabled}
          hiddenWhenEmpty={!nothingFoundMessage}
          labelId={label ? `${_id}-label` : undefined}
          limit={limit}
          maxDropdownHeight={maxDropdownHeight}
          nothingFoundMessage={nothingFoundMessage}
          renderOption={renderOption}
          scrollAreaProps={scrollAreaProps}
          search={_searchValue}
          unstyled={unstyled}
          value={_value}
          withAlignedLabels={withAlignedLabels}
          withCheckIcon={withCheckIcon}
          withScrollArea={withScrollArea}
        />
      </Combobox>
      <Combobox.HiddenInput disabled={disabled} form={form} name={name} value={_value} valuesDivider={hiddenInputValuesDivider} {...hiddenInputProps} />
    </>
  );
});
