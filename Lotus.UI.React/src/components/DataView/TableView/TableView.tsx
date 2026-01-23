/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCircleX, IconDeviceFloppy, IconEdit, IconProps, IconX } from '@tabler/icons-react';
import { LanguageChangeEvent, LanguageChangeEventType, LocalizationCore, LocalizationHelper, TLanguageType, TLanguageTypes } from 'lotus-core/localization';
import { IObjectInfo } from 'lotus-core/modules/objectInfo';
import { OptionHelper } from 'lotus-core/modules/option';
import { IPageInfoRequest, IPageInfoResponse, IRequest, IResponse, IResponsePage } from 'lotus-core/modules/requestAndResponse';
import { IEditable, IRecordObject, TKey } from 'lotus-core/types';
import { RefAttributes, useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { HorizontalStack } from '#components/Layout';
import
{
  MantineReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_FilterOption,
  MRT_Row,
  MRT_SortingState,
  MRT_TableInstance,
  MRT_TableOptions,
  MRT_Localization_RU,
  MRT_Localization_EN,
  MRT_Icons
} from '#external/mantine-react-table';
import { MantineReactTableHelper } from './MantineReactTableHelper';
import { EditTableFilterArray, EditTableFilterEnum, EditTableFilterString } from './TableViewFilterTypes';

export interface ITableViewProps<TItem extends IRecordObject> extends Omit<MRT_TableOptions<TItem>, 'columns' | 'data'>
{
  objectInfo: IObjectInfo;
  onGetItems: <TFilterRequest extends IRequest>(filter: TFilterRequest) => Promise<IResponsePage<TItem>>;
  onTransformFilterRequest?: <TFilterRequest extends IRequest>(filter: TFilterRequest) => TFilterRequest;
  onAddItem?: () => Promise<IResponse<TItem>>;
  onUpdateItem?: (item: TItem) => Promise<IResponse<TItem>>;
  onDuplicateItem?: (id: TKey) => Promise<IResponse<TItem>>;
  onDeleteItem?: (id: TKey) => Promise<IResponse>;
}

type Updater<T> = T | ((old: T) => T);

const pageInfoResponseDefault:IPageInfoResponse = { pageNumber: 0, pageSize: 10, currentPageSize: 10, totalCount: 10 } as const;

export const TableView = <TItem extends Record<string, any> & IEditable>(props: ITableViewProps<TItem>) => 
{
  const { objectInfo, onGetItems, onTransformFilterRequest, onAddItem, onUpdateItem, onDuplicateItem, onDeleteItem } = props;

  const properties = objectInfo.getProperties();
  
  const theme = useMantineTheme();

  const actualIcons: Partial<MRT_Icons> = {
    IconDeviceFloppy: (props: JSX.IntrinsicAttributes & IconProps & RefAttributes<SVGSVGElement>) => <IconDeviceFloppy {...props} color={theme.colors.info[5]} />,
    IconCircleX: (props: JSX.IntrinsicAttributes & IconProps & RefAttributes<SVGSVGElement>) => (<IconCircleX {...props} color={theme.colors.red[5]} />)
  };

  // Получение данных
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [items, setItems] = useState<TItem[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfoResponse>(pageInfoResponseDefault);
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, pageIndex: 0 });

  // Сортировка и фильтрация
  const [sortingState, setSortingState] = useState<MRT_SortingState>([]);
  const [columnFiltersState, setColumnFiltersState] = useState<MRT_ColumnFiltersState>([]);
  const [columnFiltersFns, setColumnFiltersFns] = useState<Record<string, MRT_FilterOption>>();
  const [globalFilter, setGlobalFilter] = useState('');

  // Редактирование текущей записи
  const [currentEditRow, setCurrentEditRow] = useState<MRT_Row<TItem> | null>(null);
  const [currentItem, setCurrentItem] = useState<TItem | null>(null);
  const [currentItemInvalid, setCurrentItemInvalid] = useState<boolean>(false);

  const isDelete = Boolean(onDeleteItem);

  // Локализация
  const localizationFullRU = {
    filterIncludeAny: LocalizationCore.data.filters.includeAny,
    filterIncludeAll: LocalizationCore.data.filters.includeAll,
    filterIncludeEquals: LocalizationCore.data.filters.includeEquals,
    filterIncludeNone: LocalizationCore.data.filters.includeNone,
    ...MRT_Localization_RU
  };
  const localizationFullEN = {
    filterIncludeAny: LocalizationCore.data.filters.includeAny,
    filterIncludeAll: LocalizationCore.data.filters.includeAll,
    filterIncludeEquals: LocalizationCore.data.filters.includeEquals,
    filterIncludeNone: LocalizationCore.data.filters.includeNone,
    ...MRT_Localization_EN
  };
  const [localizationFull, setLocalizationFull] = useState<object>(localizationFullRU);

  // Модифицированные столбцы
  const editColumns = properties.map((property) => 
  {
    const column: MRT_ColumnDef<TItem> = MantineReactTableHelper.convertPropertyDescriptorToColumn(property);

    if (property.editing?.editorType === 'text') 
    {
      column.mantineEditTextInputProps = {
        required: property.editing?.required,
        type: 'text',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => 
        {
          const newItem: TItem = { ...currentItem! };
          newItem[column.accessorKey!] = event.target.value as any;
          setCurrentItem(newItem);
        }
      };

      column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterString(column, onSelectFilterMode);
    }

    if (property.editing?.editorType === 'select') 
    {
      // eslint-disable-next-line react/display-name
      column.Cell = function ({ cell }) 
      {
        const id = cell.getValue() as TKey;
        const options = property.options!;
        const text = OptionHelper.getLabelByValue(options, id);
        return <>{text}</>;
      };

      // column.Edit = function ({ cell, column, table })
      // {
      //   const id = cell.getValue() as TKey;
      //   const options = property.options!;

      //   return <SelectOption size='medium'
      //     width='100%'
      //     menuPortalTarget={document.body}
      //     initialSelectedValue={id}
      //     onSetSelectedValue={(selectedValue) => { setSelectedValue(property.fieldName, selectedValue!) }}
      //     options={options} />
      // }

      column.mantineEditTextInputProps = {
        // error: property.editing?.onValidation(currentItem).text,
        required: property.editing?.required,
        size: 'small',
        variant: 'outlined'
      };

      column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnum(column, onSelectFilterMode);
    }

    if (property.editing?.editorType === 'multi-select') 
    {
      // eslint-disable-next-line react/display-name
      column.Cell = function ({ cell }) 
      {
        const massive = cell.getValue() as any[];
        const options = property.options!;

        const texts = OptionHelper.getLabelsByValues(options, massive);
        const text = texts.join(', ');
        return <>{text}</>;
      };

      // column.Edit = function ({ cell, column, table })
      // {
      //   const massive = cell.getValue() as any[];
      //   const options = property.options!;
      //   return <SelectOption size='medium'
      //     width='100%'
      //     initialSelectedValues={massive}
      //     onSetSelectedValues={(selectedValues) => { setSelectedValues(property.fieldName, selectedValues) }}
      //     options={options} />
      // }

      column.mantineEditTextInputProps = {
        // error: property.editing?.onValidation(currentItem).text,
        required: property.editing?.required,
        size: 'small',
        variant: 'outlined'
      };

      column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);
    }

    if (property.viewImage) 
    {
      // column.Cell = function({ cell, row })
      // {
      //   const id = cell.getValue() as number;
      //   return <ImageBox id={id} />
      // }
      // column.Edit = function({ cell, column, table })
      // {
      //   const id = cell.getValue() as number;
      //   return <ImageGallery size='small'
      //     fullWidth
      //     variant='outlined'
      //     initialSelectedValue={id}
      //     onSetSelectedValue={(selectedValue) => { setSelectedValue(property.fieldName, selectedValue); } }
      //     images={ImageDatabase.getAllImages()} />
      // }
    }
    return column;
  });

  //
  // #region Получение данных
  //
  const getFilterQueryItems = (): IRequest => 
  {
    const pageInfo: IPageInfoRequest = { pageNumber: paginationModel.pageIndex, pageSize: paginationModel.pageSize };

    const sortings = MantineReactTableHelper.convertColumnsSortStateToSortObjects(objectInfo, sortingState);

    const filtering = MantineReactTableHelper.convertColumnsFilterStateToFilterObjects(objectInfo, columnFiltersState, columnFiltersFns);

    const request = { pageInfo: pageInfo, sorting: sortings, filtering: filtering };

    if (onTransformFilterRequest) 
    {
      const transformRequest = onTransformFilterRequest(request);
      return transformRequest;
    }
    else 
    {
      return request;
    }
  };

  const refreshItems = async (filter: IRequest) => 
  {
    try 
    {
      if (!items.length) 
      {
        setIsLoading(true);
      }
      else 
      {
        setIsRefetching(true);
      }

      const response = await onGetItems(filter);

      if (response.payload && response.pageInfo)
      {
        setItems(response.payload);
        setPageInfo(response.pageInfo);
      }
      else
      {
        if (response.payload)
        {
          setItems(response.payload);
        }
        else
        {
          setItems([]);
        }
        setPageInfo(pageInfoResponseDefault);
      }

      setIsLoading(false);
      setIsRefetching(false);
    }
    catch (exc) 
    {
      setIsLoading(false);
      setIsRefetching(false);
      throw exc;
    }
  };
  // #endregion

  //
  // #region Добавление данных
  //
  const handleAddRow = () => 
  {
    if (onAddItem) 
    {
      const result = onAddItem();
      void result.then(async () => 
      {
        await refreshItems(getFilterQueryItems());
      });
    }
  };
  // #endregion

  //
  // #region Редактирование данных
  //
  const handleEditRowBegin = (props: { row: MRT_Row<TItem>, table: MRT_TableInstance<TItem> }) => (event: any) => 
  {
    const { row, table } = props;
    table.setEditingRow(row);
    setCurrentEditRow(row);
    setCurrentItem(row.original);
  };

  const handleEditRowCancel = (props: { row: MRT_Row<TItem>, table: MRT_TableInstance<TItem> }) => 
  {
    const { row, table } = props;
    table.setEditingRow(null);
    setCurrentEditRow(null);
    setCurrentItem(null);
  };

  const handleEditRowSave = (props: { row: MRT_Row<TItem>, table: MRT_TableInstance<TItem> }) =>
  {
    const { row, table } = props;
    const updateItem: TItem = { ...currentItem } as TItem;

    if (onUpdateItem) 
    {
      const responsePromise = onUpdateItem(updateItem);
      void responsePromise.then((response) => 
      {
        if (response.result)
        {
          if (response.result.succeeded)
          {
            const newItems = [...items];
            newItems[currentEditRow!.index] = response.payload!;
            setItems(newItems);
          }
          else
          {
            const newItems = [...items];
            newItems[currentEditRow!.index] = currentEditRow!.original;
            setItems(newItems);
          }
        }
      });
    }

    table.setEditingRow(null);
    setCurrentEditRow(null);
    setCurrentItem(null);
  };
  // #endregion

  //
  // #region Удаление данных
  //
  const handleDeleteRow = (row: MRT_Row<TItem>) => (event: any) =>
  {
    // setDeleteItem(row.original);
    // setOpenDeleteDialog(true);
  };
  // #endregion

  //
  // Фильтрация
  //
  const handleColumnFilterFnsChange = (updaterOrValue: Updater<{ [key: string]: MRT_FilterOption }>) => 
  {
    const data = updaterOrValue as Record<string, MRT_FilterOption>;
    setColumnFiltersFns(data);
  };

  const handleTranslate = (lang: TLanguageType) =>
  {
    if (lang === TLanguageTypes.ru_RU)
    {
      setLocalizationFull(localizationFullRU);
    }
    else
    {
      setLocalizationFull(localizationFullEN);
    }
  };

  //
  // #region Методы жизненного цикла
  //
  useEffect(() => 
  {
    const filter = getFilterQueryItems();
    void refreshItems(filter);
  }, [paginationModel.pageIndex, paginationModel.pageSize, sortingState, columnFiltersState, columnFiltersFns, globalFilter]);

  useEffect(() => 
  {
    const initialColumnFiltersFns: Record<string, MRT_FilterOption> = MantineReactTableHelper.getFilterOptions(objectInfo);
    setColumnFiltersFns(initialColumnFiltersFns);
  }, []);

  useEffect(() => 
  {
    const currentLang = LocalizationHelper.getDocumentLang();
    handleTranslate(currentLang);
  }, []);
  // #endregion

  // 
  // #region Render
  //
  const renderRowActionsEditRow = (props: { row: MRT_Row<TItem>, table: MRT_TableInstance<TItem> }) => 
  {
    return (<Tooltip label={LocalizationCore.data.actions.edit}>
      <ActionIcon size='lg' variant="default" onClick={handleEditRowBegin(props)}>
        <IconEdit color={theme.colors.info[5]} />
      </ActionIcon>
      {isDelete && <ActionIcon size='lg' variant="default" onClick={handleDeleteRow(props.row)}>
        <IconCircleX color={theme.colors.red[5]} />
      </ActionIcon>}
    </Tooltip>);
  };
  // #endregion

  return (
    <>
      <MantineReactTable
        {...props}
        columns={editColumns}
        data={items}
        editDisplayMode="row"
        enablePagination={true}
        filterFns={{
          includeAny: (row, id, filterValue) => 
          {
            return true;
          },
          includeAll: (row, id, filterValue) => 
          {
            return true;
          },
          includeEquals: (row, id, filterValue) => 
          {
            return true;
          },
          includeNone: (row, id, filterValue) => 
          {
            return true;
          }
        }}
        icons={actualIcons}
        localization={localizationFull}
        manualFiltering={true}
        manualPagination={true}
        manualSorting={true}
        renderRowActions={renderRowActionsEditRow}
        renderTopToolbarCustomActions={props.renderTopToolbarCustomActions}
        rowCount={pageInfo.totalCount}
        state={{
          isLoading: isLoading,
          showProgressBars: isRefetching,
          showSkeletons: false,
          pagination: paginationModel,
          columnFilters: columnFiltersState,
          columnFilterFns: columnFiltersFns,
          globalFilter: globalFilter,
          sorting: sortingState
        }}
        table={undefined}
        onColumnFilterFnsChange={handleColumnFilterFnsChange}
        onColumnFiltersChange={setColumnFiltersState}
        onEditingRowCancel={handleEditRowCancel}
        onEditingRowSave={handleEditRowSave}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPaginationModel}
        onSortingChange={setSortingState}
      />
    </>
  );
};
