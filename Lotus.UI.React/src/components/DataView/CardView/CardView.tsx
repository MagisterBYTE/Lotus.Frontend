/* eslint-disable @typescript-eslint/no-unused-vars */
import { SimpleGrid, Button, Menu, Group, Box, Text, Indicator, ActionIcon, Popover } from '@mantine/core';
import { IconCheck, IconFilter, IconFilterSearch } from '@tabler/icons-react';
import { ItemsHelper } from 'lotus-core/helpers';
import { IObjectInfo } from 'lotus-core/modules/objectInfo';
import { IPageInfoResponse } from 'lotus-core/modules/requestAndResponse';
import { IRecordObject } from 'lotus-core/types';
import { JSX, useMemo, useState } from 'react';
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_FilterOption,
  MRT_FilterTextInput,
  MRT_Header,
  MRT_SortingState,
  MRT_TablePagination,
  useMantineReactTable
} from '#external/mantine-react-table';
import { TSizeType } from '#types';
import { IItemsBaseOneProps, RenderFunction } from 'src/components/Selects/types';
import { MantineReactTableHelper } from '../TableView/MantineReactTableHelper';
import { useTableViewLocalization } from '../TableView/useTableViewLocalization';

export interface ICardViewProps<TItem> extends Omit<IItemsBaseOneProps<TItem>, 'renderItem'|'renderValue'>
{
  disabled?: boolean;
  size?: TSizeType;
  objectInfo: IObjectInfo;
  renderCard: RenderFunction<TItem>;
}

const pageInfoResponseDefault: IPageInfoResponse = { pageNumber: 0, pageSize: 10, currentPageSize: 10, totalCount: 10 } as const;

export function CardView<TItem extends IRecordObject>(props: ICardViewProps<TItem>): JSX.Element 
{
  const {
    disabled,
    size,
    items,
    objectInfo,
    onChangedItem,
    selectedItem,
    imageDatabase,
    selectRenderComponent,
    getValueItem = ItemsHelper.getValueOfItem,
    getLabelItem = ItemsHelper.getLabelOfItem,
    getDisabledItem = ItemsHelper.getDisabledOfItem,
    renderCard,
    ...otherProps
  } = props;

  const properties = objectInfo.getProperties();

  const columns = useMemo(
    () =>
      properties.map((property) => 
      {
        const column: MRT_ColumnDef<TItem> = MantineReactTableHelper.convertPropertyDescriptorToColumn(property);
        return column;
      }),
    []
  );

  // Получение данных
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  // const [items, setItems] = useState<TItem[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfoResponse>(pageInfoResponseDefault);
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, pageIndex: 0 });

  // Сортировка и фильтрация
  const [sortingState, setSortingState] = useState<MRT_SortingState>([]);
  const [columnFiltersState, setColumnFiltersState] = useState<MRT_ColumnFiltersState>([]);
  const [columnFiltersFns, setColumnFiltersFns] = useState<Record<string, MRT_FilterOption>>();
  const [globalFilter, setGlobalFilter] = useState('');

  // Локализация
  const localizationFull = useTableViewLocalization();

  const table = useMantineReactTable({
    columns: columns,
    data: items,

    enableRowSelection: true,
    enableColumnFilters: true,
    enablePagination: true,
    rowCount: items.length,
    state: {
      isLoading: isLoading,
      showProgressBars: isRefetching,
      showSkeletons: false,
      pagination: paginationModel,
      columnFilters: columnFiltersState,
      columnFilterFns: columnFiltersFns,
      globalFilter: globalFilter,
      sorting: sortingState
    },
    localization: localizationFull,
    // memoMode 'rows' заставляет MRT не пересоздавать объекты строк без нужды
    memoMode: 'rows',
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPaginationModel,
    onSortingChange: setSortingState
  });

  // Достаем отфильтрованные строки
  const { rows } = table.getRowModel();
  const { columnFilters, rowSelection } = table.getState();

  const activeFiltersCount = columnFilters.length;
  const selectedCount = Object.keys(rowSelection).length;

  // Опции для текстовых полей
  const filterOptions: { value: MRT_FilterOption; label: string }[] = [
    { value: 'fuzzy', label: 'Умный поиск' },
    { value: 'contains', label: 'Содержит' },
    { value: 'startsWith', label: 'Начинается с' },
    { value: 'equals', label: 'Равно' },
    { value: 'notEquals', label: 'Не равно' }
  ];

  return (
    <Box p="md">
      {/* ВЕРХНЯЯ ПАНЕЛЬ: ФИЛЬТРЫ И ПАГИНАЦИЯ */}
      <Group justify="space-between" mb="xl">
        {/* Используем Popover вместо внешнего Menu */}
        <Popover 
          keepMounted 
          withArrow 
          closeOnClickOutside={true} 
          position="bottom-start" 
          shadow="md"
          trapFocus={false}
          width={300} 
        >
          <Popover.Target>
            <Indicator color="red" disabled={activeFiltersCount === 0} label={activeFiltersCount}>
              <Button leftSection={<IconFilter size={18} />} variant="light">
                Фильтры
              </Button>
            </Indicator>
          </Popover.Target>

          

          <Popover.Dropdown p="md">
            <Text fw={700} mb="md" size="sm">Фильтрация колонок</Text>
        
            {table.getLeafHeaders().map((header) => 
            {
              const mrtHeader = header as MRT_Header<TItem>;
              const column = mrtHeader.column;
              if (!column.getCanFilter()) return null;

              // const currentFn = columnFiltersFns![column.id] || 'fuzzy';
              const currentFn = 'fuzzy';
              
              // Создаем уникальный ID для инпута этой колонки
              const inputId = `filter-input-${column.id}`;

              return (
                <Box key={mrtHeader.id} mb="sm">
                  <Group justify="space-between" mb={4} wrap="nowrap">
                    <Text fw={500} size="xs">{column.columnDef.header}</Text>
                
                    {/* Внутреннее меню выбора функции (оно уже может быть Menu) */}
                    <Menu closeOnItemClick={true} shadow="xl" withinPortal={false}>
                      <Menu.Target>
                        <ActionIcon color="blue" size="sm" variant="subtle">
                          <IconFilterSearch size={14} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        {filterOptions.map((opt) => (
                          <Menu.Item
                            key={opt.value}
                            closeMenuOnClick={true} // Чтобы внутреннее меню не закрывалось сразу
                            rightSection={currentFn === opt.value ? <IconCheck size={14} /> : null}
                            onClick={(e) => 
                            {
                              // Останавливаем всплытие, чтобы Popover не перехватил клик
                              e.stopPropagation(); 
                              setColumnFiltersFns((prev) => ({
                                ...prev,
                                [column.id]: opt.value
                              }));
                            }}
                          >
                            {opt.label}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  </Group>

                  {/* Инпут MRT */}
                  <MRT_FilterTextInput  header={mrtHeader} id={inputId} table={table}
                  />

                  <Text c="dimmed" mt={2} size="10px">
                    Режим: <b>{filterOptions.find(o => o.value === currentFn)?.label}</b>
                  </Text>
                </Box>
              );
            })}
        
            <Button 
              fullWidth 
              mt="md" 
              size="xs" 
              variant="subtle" 
              onClick={() => table.resetColumnFilters()}
            >
              Сбросить всё
            </Button>
          </Popover.Dropdown>
        </Popover>

        <MRT_TablePagination table={table} />
      </Group>

      {/* СЕТКА С КАРТОЧКАМИ */}
      {rows.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {rows.map((row) => 
          {
            return renderCard(row.original);
          })}
        </SimpleGrid>
      ) : (
        <Box py="xl" style={{ textAlign: 'center' }}>
          <Text c="dimmed">Ничего не найдено по вашему запросу</Text>
        </Box>
      )}
    </Box>
  );
}
