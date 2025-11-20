/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactElement, useEffect, useState } from 'react';
import { EditTableFilterArray, EditTableFilterEnum, EditTableFilterString } from './TableViewFilterTypes';
import { Button, MantineProvider } from '@mantine/core';
import { toastError, toastPromise, ToastWrapper } from '../../Feedback/Toast';
import { MantineReactTableHelper } from '../../../helpers';
import { IObjectInfo } from 'lotus-core/modules/objectInfo';
import { IPageInfoRequest, IPageInfoResponse, IRequest, IResponse, IResponsePage, ISortObject, ISortProperty } from 'lotus-core/modules/requestAndResponse';
import { IEditable, TKey } from 'lotus-core/types';
import { StringHelper } from 'lotus-core/helpers';
import { OptionHelper } from 'lotus-core/modules/option';
import { LocalizationCore } from 'lotus-core/localization';
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_FilterOption,
  MRT_Row,
  MRT_SortingState,
  MRT_TableInstance,
  MRT_TableOptions
} from '#external/mantine-react-table';

export interface IFormCreatedItem<TItem extends Record<string, any> | null> {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  onCreatedItem: (createdItem: TItem | null) => void;
}

export interface IFormDeletedItem<TItem extends Record<string, any> | null> {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  onDeleteItem: (createdItem: TItem | null) => void;
}

export interface ITableViewProps<TItem extends Record<string, any>> extends Omit<MRT_TableOptions<TItem>, 'columns' | 'data'> {
  objectInfo: IObjectInfo;
  onGetItems: <TFilterRequest extends IRequest>(filter: TFilterRequest) => Promise<IResponsePage<TItem>>;
  onTransformFilterRequest?: <TFilterRequest extends IRequest>(filter: TFilterRequest) => TFilterRequest;
  onAddItem?: () => Promise<IResponse<TItem>>;
  onUpdateItem?: (item: TItem) => Promise<IResponse<TItem>>;
  onDuplicateItem?: (id: TKey) => Promise<IResponse<TItem>>;
  onDeleteItem?: (id: TKey) => Promise<IResponse>;
  formCreated?: (args: IFormCreatedItem<TItem | null>) => ReactElement;
  formDeleted?: (args: IFormDeletedItem<TItem | null>) => ReactElement;
}

type Updater<T> = T | ((old: T) => T);

export const TableView = <TItem extends Record<string, any> & IEditable>(props: ITableViewProps<TItem>) => {
  const { objectInfo, onGetItems, onTransformFilterRequest, onAddItem, onUpdateItem, onDuplicateItem, onDeleteItem, formCreated, formDeleted } = props;

  const properties = objectInfo.getProperties();

  // Получение данных
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [items, setItems] = useState<TItem[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfoResponse>({ pageNumber: 0, pageSize: 10, currentPageSize: 10, totalCount: 10 });
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, pageIndex: 0 });

  // Сортировка и фильтрация
  const [sortingColumn, setSortingColumn] = useState<MRT_SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [columnFiltersFns, setColumnFiltersFns] = useState<Record<string, MRT_FilterOption>>();
  const [globalFilter, setGlobalFilter] = useState('');

  // Редактирование текущей записи
  const [currentEditRow, setCurrentEditRow] = useState<MRT_Row<TItem> | null>(null);
  const [currentItem, setCurrentItem] = useState<TItem | null>(null);
  const [currentItemInvalid, setCurrentItemInvalid] = useState<boolean>(false);

  // Удаление
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<TItem | null>(null);

  // Создание новой записи через окно
  const [openCreatedDialog, setOpenCreatedDialog] = useState<boolean>(false);
  const [createdItem, setCreatedItem] = useState<TItem | null>(null);

  const [autoCloseToastify, setAutoCloseToastify] = useState<number | false>(2000);

  // Служебные методы для получения данных текущего редактируемого объекта
  const setSelectedValues = (accessorKey: string, newSelectedValues: any[]) => {
    const newItem: TItem = { ...currentItem! };

    // @ts-ignore
    newItem[accessorKey] = newSelectedValues as any;
    setCurrentItem(newItem);
  };

  const setSelectedValue = (accessorKey: string, newSelectedValue: TKey) => {
    const newItem: TItem = { ...currentItem! };

    // @ts-ignore
    newItem[accessorKey] = newSelectedValue;
    setCurrentItem(newItem);
  };

  // Модифицированные столбцы
  const editColumns = properties.map((property) => {
    const column: MRT_ColumnDef<TItem> = MantineReactTableHelper.convertPropertyDescriptorToColumn(property);

    if (property.editing?.editorType === 'text') {
      column.mantineEditTextInputProps = {
        error: property.editing?.onValidation(currentItem).text,
        required: property.editing?.required,
        variant: 'outlined',
        size: 'small',
        type: 'text',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          const newItem: TItem = { ...currentItem! };
          newItem![column.accessorKey!] = event.target.value as any;
          setCurrentItem(newItem);

          let isErrorValidation = false;
          properties.forEach((c) => {
            const errorValidation = c.editing?.onValidation(newItem).error;
            if (errorValidation) {
              isErrorValidation = true;
              setCurrentItemInvalid(true);
            }
          });
          if (isErrorValidation === false) {
            setCurrentItemInvalid(false);
          }
        }
      };

      column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterString(column, onSelectFilterMode);
    }

    if (property.editing?.editorType === 'select') {
      column.Cell = function ({ cell }) {
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
        error: property.editing?.onValidation(currentItem).text,
        required: property.editing?.required,
        size: 'small',
        variant: 'outlined'
      };

      column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnum(column, onSelectFilterMode);
    }

    if (property.editing?.editorType === 'multi-select') {
      column.Cell = function ({ cell }) {
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
        error: property.editing?.onValidation(currentItem).text,
        required: property.editing?.required,
        size: 'small',
        variant: 'outlined'
      };

      column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);
    }

    if (property.viewImage) {
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
  const getFilterQueryItems = (): IRequest => {
    const pageInfo: IPageInfoRequest = { pageNumber: paginationModel.pageIndex, pageSize: paginationModel.pageSize };

    const sorting: ISortObject = sortingColumn.map((column) => {
      const sort: ISortProperty = {
        propertyPath: StringHelper.capitalizeFirstLetter(column.id),
        propertyTypeDesc: objectInfo.getPropertyByName(column.id).propertyTypeDesc,
        isDesc: column.desc
      };

      return sort;
    });

    const filtering = MantineReactTableHelper.convertColumnsFilterToFilterObjects(objectInfo, columnFilters, columnFiltersFns);

    const request = { pageInfo: pageInfo, sorting: sorting, filtering: filtering };

    if (onTransformFilterRequest) {
      const transformRequest = onTransformFilterRequest(request);
      return transformRequest;
    } else {
      return request;
    }
  };

  const refreshItems = async (filter: IRequest) => {
    try {
      if (!items.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const response = await onGetItems(filter);

      setItems(response.payload!);
      setPageInfo(response.pageInfo!);

      setIsLoading(false);
      setIsRefetching(false);
    } catch (exc) {
      setIsLoading(false);
      setIsRefetching(false);
      toastError(exc, LocalizationCore.data.actions.gettingFailed);
    }
  };
  // #endregion

  //
  // #region Добавление данных
  //
  const handleAddRow = async () => {
    if (onAddItem) {
      const result = toastPromise(
        onAddItem(),
        LocalizationCore.data.actions.adding,
        LocalizationCore.data.actions.addingSucceed,
        LocalizationCore.data.actions.addingFailed
      );

      result.then(() => {
        refreshItems(getFilterQueryItems());
      });
    } else {
      setCreatedItem(null);
      setOpenCreatedDialog(true);
    }
  };

  const handleCloseCreatedDialog = () => {
    setOpenCreatedDialog(false);
  };

  const handleOkCreatedDialog = async () => {
    setOpenCreatedDialog(false);
    await refreshItems(getFilterQueryItems());
  };
  // #endregion

  //
  // #region Редактирование данных
  //
  const handleEditRow = (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => (event: any) => {
    table.setEditingRow(row);
    setCurrentEditRow(row);
    setCurrentItem(row.original as TItem);
  };

  const handleCancelRow = (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => {
    table.setEditingRow(null);
    setCurrentEditRow(null);
    setCurrentItem(null);
  };
  // #endregion

  //
  // #region Дублирование данных
  //
  const handleDuplicateRow = (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => {};
  // #endregion

  //
  // #region Обновление данных
  //
  const handleSaveRow = async (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => {
    const updateItem: TItem = { ...currentItem } as TItem;

    if (onUpdateItem) {
      const result = toastPromise(
        onUpdateItem(updateItem),
        LocalizationCore.data.actions.saving,
        LocalizationCore.data.actions.savingSucceed,
        LocalizationCore.data.actions.savingFailed
      );

      result.then((value) => {
        const newItems = [...items];
        newItems[currentEditRow!.index] = value.payload!;
        setItems(newItems);
      });
    }

    table.setEditingRow(null);
    setCurrentEditRow(null);
  };
  // #endregion

  //
  // #region Удаление данных
  //
  const handleDeleteRow = (row: MRT_Row<TItem>) => {
    setDeleteItem(row.original as TItem);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOkDeleteDialog = async () => {
    setOpenDeleteDialog(false);

    if (onDeleteItem) {
      const result = toastPromise(
        onDeleteItem(deleteItem!.id),
        LocalizationCore.data.actions.deleting,
        LocalizationCore.data.actions.deletingSucceed,
        LocalizationCore.data.actions.deletingFailed
      );

      result.then(() => {
        const newItems = items.filter((x) => x.id !== deleteItem!.id);
        setItems(newItems);
      });
    }

    setDeleteItem(null);
  };
  // #endregion

  //
  // Фильтрация
  //
  const handleColumnFilterFnsChange = (updaterOrValue: Updater<{ [key: string]: MRT_FilterOption }>) => {
    const data = updaterOrValue as Record<string, MRT_FilterOption>;
    setColumnFiltersFns(data);
  };

  //
  // Методы оформления
  const renderTopToolbarCustomActions = (props: { table: MRT_TableInstance<TItem> }) => {
    if (onAddItem || formCreated) {
      return (
        <Button color="secondary" onClick={() => handleAddRow()} variant="contained">
          {LocalizationCore.data.actions.add}
        </Button>
      );
    }

    return <> </>;
  };

  //
  // Методы жизненного цикла
  //

  useEffect(() => {
    const filter = getFilterQueryItems();
    refreshItems(filter);
  }, [paginationModel.pageIndex, paginationModel.pageSize, sortingColumn, columnFilters, columnFiltersFns, globalFilter]);

  useEffect(() => {
    const initialColumnFiltersFns: Record<string, MRT_FilterOption> = MantineReactTableHelper.getFilterOptions(objectInfo);
    setColumnFiltersFns(initialColumnFiltersFns);
  }, []);

  const localizationFull = {
    filterIncludeAny: LocalizationCore.data.filters.includeAny,
    filterIncludeAll: LocalizationCore.data.filters.includeAll,
    filterIncludeEquals: LocalizationCore.data.filters.includeEquals,
    filterIncludeNone: LocalizationCore.data.filters.includeNone
  };

  return (
    <>
      <MantineReactTable
        {...props}
        table={undefined}
        columns={editColumns}
        data={items}
        editDisplayMode="row"
        manualSorting={true}
        manualFiltering={true}
        enablePagination={true}
        manualPagination={true}
        renderTopToolbarCustomActions={props.renderTopToolbarCustomActions ?? renderTopToolbarCustomActions}
        rowCount={pageInfo.totalCount}
        onColumnFiltersChange={setColumnFilters}
        onColumnFilterFnsChange={handleColumnFilterFnsChange}
        onGlobalFilterChange={setGlobalFilter}
        filterFns={{
          includeAny: (row, id, filterValue) => {
            return true;
          },
          includeAll: (row, id, filterValue) => {
            return true;
          },
          includeEquals: (row, id, filterValue) => {
            return true;
          },
          includeNone: (row, id, filterValue) => {
            return true;
          }
        }}
        onSortingChange={setSortingColumn}
        onPaginationChange={setPaginationModel}
        state={{
          isLoading: isLoading,
          showProgressBars: isRefetching,
          showSkeletons: false,
          pagination: paginationModel,
          columnFilters: columnFilters,
          columnFilterFns: columnFiltersFns,
          globalFilter: globalFilter,
          sorting: sortingColumn
        }}
      />
      <ToastWrapper autoClose={autoCloseToastify} />
      {formCreated &&
        formCreated({
          open: openCreatedDialog,
          onClose: handleCloseCreatedDialog,
          onCreate: handleOkCreatedDialog,
          onCreatedItem: setCreatedItem
        })}
    </>
  );
};
