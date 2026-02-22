/* eslint-disable jsx-a11y/interactive-supports-focus */
import
{
  Combobox,
  Input,
  InputBase,
  InputBaseProps,
  Pagination,
  PaginationProps,
  Popover,
  ScrollArea,
  SimpleGrid,
  SimpleGridProps,
  TextInput
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { LocalizationCore } from 'lotus-core/localization';
import { Assert } from 'lotus-core/utils';
import React, { ComponentPropsWithRef, useEffect, useMemo, useState } from 'react';
import { ContainerControl, IBaseContainerControlProps } from '#components/Common';
import { Box, IHorizontalStackProps } from '#components/Layout';
import { useResizer } from '#hooks';
import { RenderItem } from '#render';
import { IContextRenderBase, TBorderSideFlags, TSizeType } from '#types';
import { IItemsBaseOneProps } from '../types';

export interface IGallerySelectProps<TItem> extends IBaseContainerControlProps, IItemsBaseOneProps<TItem>, IHorizontalStackProps
{
  size?: TSizeType;
  columns?: number;
  hasFilter?: boolean;
  onFilterItem?: (item: TItem, filter: string) => boolean;
  inputProps?: InputBaseProps;
  placeholder?: string;
  containerProps?: ComponentPropsWithRef<'div'>;
  gridProps?: SimpleGridProps;
  paginationProps?: PaginationProps;
}

// eslint-disable-next-line complexity
export function GallerySelect<TItem = unknown>(props: IGallerySelectProps<TItem>)
{
  const {
    size,
    columns = 3,
    hasFilter = false,
    onFilterItem,
    items,
    onChangedItem,
    selectedItem,
    renderItem,
    renderValue,
    selectRenderComponent,
    imageDatabase,
    inputProps,
    placeholder,
    containerProps,
    gridProps,
    paginationProps,
    ...otherProps
  } = props;

  const [currentItem, setCurrentItem] = useState<TItem | undefined>(selectedItem);
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState('');
  const [activePage, setPage] = useState(1);
  const [focusedIndex, setFocusedIndex] = useState(-1); // Индекс для клавиатуры
  const [sizeField, handleMouseDown] = useResizer(350, 450);

  // Фильтрация
  const actualItems = useMemo(() => 
  {
    if (!hasFilter || !onFilterItem) return items;
    return items.filter((x) => onFilterItem(x, search));
  }, [items, search, hasFilter, onFilterItem]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(actualItems.length / itemsPerPage);
  const currentItems = actualItems.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  const containerStyle: React.CSSProperties = {
    display: containerProps?.style?.display ?? 'flex',
    flexDirection: containerProps?.style?.flexDirection ?? 'column',
    position: containerProps?.style?.position ?? 'relative',
    width: `${sizeField.width}px`, // Берем из хука useResizer
    height: `${sizeField.height}px`, // Берем из хука useResizer
    minWidth: containerProps?.style?.minWidth ?? '280px',
    minHeight: containerProps?.style?.minHeight ?? '300px',
    overflow: 'hidden',
    ...containerProps?.style
  };

  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '16px',
    height: '16px',
    cursor: 'nwse-resize',
    zIndex: 100,
    // Используем radial-gradient для создания паттерна "точек"
    backgroundImage: 'radial-gradient(#ced4da 1px, transparent 1px)',
    backgroundSize: '4px 4px',
    backgroundPosition: 'center',
    // Небольшой отступ, чтобы точки не прилипали к самому краю
    margin: '2px'
  };

  // #region Effect
  useEffect(() =>
  {
    setCurrentItem(selectedItem);
  }, [items, selectedItem]);
  // #endregion

  // #region Handlers
  const handleOpened = () =>
  {
    setOpened(!opened);
  };

  const handleKeyDownInput = (event: React.KeyboardEvent) =>
  {
    if (event.key === 'Enter')
    {
      setOpened(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) =>
  {
    if (!opened) return;

    switch (event.key)
    {
      case 'ArrowRight':
        setFocusedIndex((prev) => Math.min(prev + 1, currentItems.length - 1));
        break;
      case 'ArrowLeft':
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'ArrowDown':
        setFocusedIndex((prev) => Math.min(prev + Number(columns), currentItems.length - 1));
        break;
      case 'ArrowUp':
        setFocusedIndex((prev) => Math.max(prev - Number(columns), 0));
        break;
      case 'Enter':
        if (focusedIndex >= 0) handleSelect(currentItems[focusedIndex]);
        break;
      case 'Escape':
        setOpened(false);
        break;
    }
  };

  const handleSelect = (item: TItem) =>
  {
    if (onChangedItem) onChangedItem(item);
    setCurrentItem(item);
    setOpened(false);
    setSearch('');
    setFocusedIndex(-1);
  };

  const handleMouseDownSelect = (item: TItem) => (_event: React.MouseEvent) =>
  {
    handleSelect(item);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setSearch(event.target.value);
    setPage(1);
    setFocusedIndex(-1);
  };

  const handleClearFilter = () =>
  {
    setSearch('');
    setPage(1);
    setFocusedIndex(-1);
  };
  // #endregion

  // #region Render
  const renderInternalValue = (item?: TItem) =>
  {
    const contextRender = { size: size } as IContextRenderBase;
    if (typeof renderValue === 'function')
    {
      const contentValue = renderValue(item, contextRender);
      if (Assert.existValue(contentValue))
      {
        return contentValue;
      }
      else
      {
        return <Input.Placeholder>{placeholder ?? 'Pick value'}</Input.Placeholder>;
      }
    }
    else
    {
      if (item)
      {
        return RenderItem.renderItem(size ?? 'md', item, imageDatabase, { withBorder: true, p: 'xxs', bdRadius: 'md' });
      }
      else
      {
        return <></>;
      }
    }
  };

  const renderInternalItem = (item: TItem) =>
  {
    const contextRender = { size: size, selected: item === currentItem } as IContextRenderBase;
    if (typeof renderItem === 'function')
    {
      return renderItem(item, contextRender);
    }
    else
    {
      if (item)
      {
        return RenderItem.renderItem(size ?? 'md', item, imageDatabase, { withBorder: true, p: 'xxs', bdRadius: 'md' });
      }
      else
      {
        return <></>;
      }
    }
  };

  const renderComponent = () =>
  {
    return (
      <Popover withArrow opened={opened} position="bottom-start" onChange={setOpened}>
        <Popover.Target>
          <InputBase
            pointer
            component="button"
            h={'auto'}
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            size={inputProps?.size ?? size}
            styles={{
              input: {
                height: 'auto',
                minHeight: 'unset', // Убираем стандартный минимум Mantine
                paddingTop: '0.2rem',
                paddingBottom: '0.2rem',
                display: 'flex',
                alignItems: 'center'
              }
            }}
            type="button"
            w={'fit-content'}
            onClick={handleOpened}
            onKeyDown={handleKeyDownInput}
            {...inputProps}
          >
            {renderInternalValue(currentItem)}
          </InputBase>
        </Popover.Target>

        <Popover.Dropdown p={0} onKeyDown={handleKeyDown}>
          <div {...containerProps} style={containerStyle}>
            {/* Поиск */}
            {hasFilter && (
              <Box p="xs" withBorder={TBorderSideFlags.Bottom}>
                <TextInput
                  leftSection={<IconSearch size={size} />}
                  placeholder={LocalizationCore.data.actions.search}
                  rightSection={search !== '' ? <Input.ClearButton onClick={handleClearFilter} /> : undefined}
                  value={search}
                  onChange={handleFilter}
                />
              </Box>
            )}

            {/* Сетка с прокруткой */}
            <ScrollArea p="xs" style={{ flex: 1 }}>
              <SimpleGrid cols={columns} {...gridProps}>
                {currentItems.map((item, index) =>
                {
                  return (
                    <Box
                      key={index}
                      bdColor={selectRenderComponent ? (item === currentItem ? 'primary' : undefined) : undefined}
                      role="button"
                      withBorder={selectRenderComponent ? true : undefined}
                      onClick={handleMouseDownSelect(item)}
                    >
                      {renderInternalItem(item)}
                    </Box>
                  );
                })}
              </SimpleGrid>
            </ScrollArea>

            {/* Пагинация */}
            {totalPages > 1 && (
              <Box p="xs" withBorder={TBorderSideFlags.Top}>
                <Pagination size={size} total={totalPages} value={activePage} onChange={setPage} {...paginationProps} />
              </Box>
            )}

            <div role="button" style={handleStyle} onMouseDown={handleMouseDown} />
          </div>
        </Popover.Dropdown>
      </Popover>
    );
  };
  // #endregion

  if (otherProps.inlinePlace) 
  {
    return (
      <ContainerControl
        {...otherProps}
        control={renderComponent()}
        size={size}
        vAlign={otherProps.vAlign ?? ((Assert.emptyValue(otherProps.error) && Assert.emptyValue(otherProps.description)) ? 'center' : undefined)}
      />
    );
  }
  else 
  {
    { renderComponent(); }
  }
}
