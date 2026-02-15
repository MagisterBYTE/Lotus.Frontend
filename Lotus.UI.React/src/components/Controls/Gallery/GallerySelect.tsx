/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Box, Combobox, Input, InputBase, Pagination, Popover, ScrollArea, SimpleGrid, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useResizer } from '#hooks';
import { RenderItem } from '#render';
import { IContextRenderBase, TSizeType } from '#types';
import { IItemsBaseOneProps } from '../types';

export interface IGallerySelectProps<TItem> extends IItemsBaseOneProps<TItem>
{
  size?: TSizeType;
  columns?: number;
  hasFilter?: boolean;
  onFilterItem?: (item: TItem, filter: string) => boolean;
}

export function GallerySelect<TItem = any>(props: IGallerySelectProps<TItem>)
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
    renderValue
  } = props;

  const [currentItem, setCurrentItem] = useState<TItem | undefined>(selectedItem);
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState('');
  const [activePage, setPage] = useState(1);
  const [focusedIndex, setFocusedIndex] = useState(-1); // Индекс для клавиатуры
  const [sizeField, handleMouseDown] = useResizer(350, 450);

  // Фильтрация
  const filtered = useMemo(() =>
  {
    if (onFilterItem)
    {
      return items.filter((x) => onFilterItem(x, search));
    }
    else
    {
      return items;
    }
  }, [items, search]);

  const actualItems = onFilterItem ? filtered : items;

  const itemsPerPage = 12;
  const totalPages = Math.ceil(actualItems.length / itemsPerPage);
  const currentItems = actualItems.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  const contextRender = { size: size } as IContextRenderBase;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: `${sizeField.width}px`, // Берем из хука useResizer
    height: `${sizeField.height}px`, // Берем из хука useResizer
    minWidth: '280px',
    minHeight: '300px',
    overflow: 'hidden'
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
  // #endregion

  // #region Render
  const renderInternalValue = (item: TItem) =>
  {
    if (typeof renderValue === 'function')
    {
      return renderValue(item, contextRender);
    }
    else
    {
      if (item)
      {
        return RenderItem.renderItem(size ?? 'md', item, undefined, { withBorder: true, p: 'xxs', bdRadius: 'md' });
      }
      else
      {
        return <></>;
      }
    }
  };

  const renderInternalItem = (item: TItem) =>
  {
    if (typeof renderItem === 'function')
    {
      return renderItem(item, contextRender);
    }
    else
    {
      if (item)
      {
        return RenderItem.renderItem(size ?? 'md', item, undefined, { withBorder: true, p: 'xxs', bdRadius: 'md' });
      }
      else
      {
        return <></>;
      }
    }
  };
  // #endregion

  return (
    <Popover withArrow opened={opened} position="bottom-start" onChange={setOpened}>
      <Popover.Target>
        <InputBase
          pointer
          component="button"
          h={undefined}
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          type="button"
          w={'max-content'}
          onClick={handleOpened}
          onKeyDown={handleKeyDownInput}
        >
          <div  style={{ paddingTop: '4px', paddingBottom: '4px' }}>
            {currentItem ? renderInternalValue(currentItem) : <Input.Placeholder>Pick value</Input.Placeholder>}
          </div>
        </InputBase>
      </Popover.Target>

      <Popover.Dropdown p={0} onKeyDown={handleKeyDown}>
        <div style={containerStyle}>
          {/* Поиск */}
          {hasFilter && (
            <Box p="xs" style={(theme) => ({ borderBottom: `1px solid ${theme.colors.gray[2]}` })}>
              <TextInput
                leftSection={<IconSearch size={14} />}
                placeholder="Поиск..."
                value={search}
                onChange={(e) =>
                {
                  setSearch(e.target.value);
                  setPage(1);
                  setFocusedIndex(-1);
                }}
              />
            </Box>
          )}

          {/* Сетка с прокруткой */}
          <ScrollArea p="xs" style={{ flex: 1 }}>
            <SimpleGrid cols={columns}>
              {currentItems.map((item, index) =>
              {
                return <div key={index} role="button" onMouseDown={handleMouseDownSelect(item)}>{renderInternalItem(item)}</div>;
              })}
            </SimpleGrid>
          </ScrollArea>

          {/* Пагинация */}
          {totalPages > 1 && (
            <Box p="xs" style={(theme) => ({ borderTop: `1px solid ${theme.colors.gray[2]}` })}>
              <Pagination size="sm" total={totalPages} value={activePage} onChange={setPage} />
            </Box>
          )}

          <div role="button" style={handleStyle} title="Потяните для изменения размера" onMouseDown={handleMouseDown} />
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
