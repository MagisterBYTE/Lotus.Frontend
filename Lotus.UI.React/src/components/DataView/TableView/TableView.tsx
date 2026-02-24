/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */

import { ActionIcon, Button, Modal, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCircleX, IconDeviceFloppy, IconEdit, IconProps, IconTextDecrease, IconTextIncrease } from '@tabler/icons-react';
import { StringHelper } from 'lotus-core/helpers';
import { LocalizationCore } from 'lotus-core/localization';
import { IObjectInfo, IPropertyDescriptor, ObjectInfo } from 'lotus-core/modules/objectInfo';
import { IPageInfoRequest, IPageInfoResponse, IRequest, IResponse, IResponsePage, ResponseHelper } from 'lotus-core/modules/requestAndResponse';
import { IValidator } from 'lotus-core/modules/validation';
import { IImageDatabase } from 'lotus-core/resources/image';
import { IRecordObject, TKey } from 'lotus-core/types';
import { Assert, ObjectName } from 'lotus-core/utils';
import { RefAttributes, useEffect, useMemo, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { Primitive } from '#components/Common';
import { Text } from '#components/Display';
import { HorizontalStack, VerticalStack } from '#components/Layout';
import { ImageGallery, MultiSelect, Select } from '#components/Selects';
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_FilterOption,
  MRT_Row,
  MRT_SortingState,
  MRT_TableInstance,
  MRT_TableOptions,
  MRT_Icons,
  useMantineReactTable,
  createRow,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton
} from '#external/mantine-react-table';
import { IContextRenderBase, TSizeType, TSizeTypes } from '#types';
import { MantineReactTableHelper } from './MantineReactTableHelper';
import { createDisabledSaveButtonEvent } from './TableViewEvents';
import {
  EditTableFilterArray,
  EditTableFilterEnum,
  EditTableFilterEnumNull,
  EditTableFilterNumber,
  EditTableFilterNumberNull,
  EditTableFilterString
} from './TableViewFilterTypes';
import { TableViewMultiSelectView } from './components/TableViewMultiSelectView';
import { TableViewSelectView } from './components/TableViewSelectView';
import { TableViewTextView } from './components/TableViewTextView';
import { useTableViewLocalization } from './useTableViewLocalization';

export interface ITableViewProps<TItem extends IRecordObject> extends Omit<MRT_TableOptions<TItem>, 'columns' | 'data'> {
  disabled?: boolean;
  size?: TSizeType;
  objectInfo: IObjectInfo;
  validator?: IValidator;
  onGetItems: <TFilterRequest extends IRequest>(filter: TFilterRequest) => Promise<IResponsePage<TItem>>;
  onTransformFilterRequest?: <TFilterRequest extends IRequest>(filter: TFilterRequest) => TFilterRequest;
  onCreateItem?: () => Promise<IResponse<TItem>>;
  onAddItem?: (item: TItem) => Promise<IResponse>;
  onUpdateItem?: (item: TItem) => Promise<IResponse<TItem>>;
  onDuplicateItem?: (id: TKey) => Promise<IResponse<TItem>>;
  onDeleteItem?: (id: TKey) => Promise<IResponse>;
  /**
   * База данных изображений
   */
  imageDatabase?: IImageDatabase;
}

type Updater<T> = T | ((old: T) => T);

const pageInfoResponseDefault: IPageInfoResponse = { pageNumber: 0, pageSize: 10, currentPageSize: 10, totalCount: 10 } as const;

export function TableView<TItem extends IRecordObject>(props: ITableViewProps<TItem>) 
{
  const {
    size = 'md',
    objectInfo,
    validator,
    onGetItems,
    onTransformFilterRequest,
    onAddItem,
    onCreateItem,
    onUpdateItem,
    onDuplicateItem,
    onDeleteItem,
    imageDatabase
  } = props;

  type ComponentTableProps = { tableProps: any; property: IPropertyDescriptor; column?: MRT_ColumnDef<TItem> };

  const properties = objectInfo.getProperties();

  const theme = useMantineTheme();
  const blueColor = theme.colors.blue[5];
  const redColor = theme.colors.red[5];

  const actualIcons: Partial<MRT_Icons> = {
    IconDeviceFloppy: (props: JSX.IntrinsicAttributes & IconProps & RefAttributes<SVGSVGElement>) => <IconDeviceFloppy {...props} color={blueColor} />,
    IconCircleX: (props: JSX.IntrinsicAttributes & IconProps & RefAttributes<SVGSVGElement>) => <IconCircleX {...props} color={redColor} />
  };

  // Статус
  const isAdd = Boolean(onAddItem);
  const isCreate = Boolean(onCreateItem);
  const isUpdate = Boolean(onUpdateItem);
  const isDelete = Boolean(onDeleteItem);

  // Размер
  const [actualSize, setActualSize] = useState(size);

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
  const [currentEditRow, setCurrentEditRow] = useState<MRT_Row<TItem> | undefined>(undefined);
  const [currentItem, setCurrentItem] = useState<TItem | undefined>(undefined);
  const [currentItemValid, setCurrentItemValid] = useState<boolean>(false);
  const [editItemName, setEditItemName] = useState<string>('');
  const [hashValid, setHashValid] = useState<number>(0);
  const [isUpdatingProcess, setUpdatingProcess] = useState<boolean>(false);
  const [creatingStatus, setCreatingStatus] = useState<boolean>(false);

  // Удаление
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<TItem | undefined>(undefined);
  const [deleteItemName, setDeleteItemName] = useState<string>('');
  const [isDeletingProcess, setDeletingProcess] = useState<boolean>(false);

  // Локализация
  const localizationFull = useTableViewLocalization();

  // Текущий контекст ренденинга
  const contextRender: IContextRenderBase = { disabled: props.disabled, size: actualSize, theme: theme };

  const CellViewText = (propsComponent: ComponentTableProps) => (
    <TableViewTextView
      {...propsComponent.tableProps}
      contextRender={contextRender}
      imageDatabase={imageDatabase}
      objectInfo={objectInfo}
      property={propsComponent.property}
      validator={validator}
    />
  );

  const CellViewSelect = (propsComponent: ComponentTableProps) => (
    <TableViewSelectView
      {...propsComponent.tableProps}
      contextRender={contextRender}
      imageDatabase={imageDatabase}
      objectInfo={objectInfo}
      property={propsComponent.property}
      validator={validator}
    />
  );

  const CellViewMulti = (propsComponent: ComponentTableProps) => (
    <TableViewMultiSelectView
      {...propsComponent.tableProps}
      contextRender={contextRender}
      imageDatabase={imageDatabase}
      objectInfo={objectInfo}
      property={propsComponent.property}
      validator={validator}
    />
  );

  const CellEditText = (propsComponent: ComponentTableProps) => 
  {
    const { column, property } = propsComponent;

    // Режим редактирования
    column!.mantineEditTextInputProps = {
      required: property.editing?.required,
      disabled: props.disabled,
      size: actualSize,
      type: 'text',
      error: validator?.validationStatus.getErrorByKey(property.fieldName),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => 
      {
        const newItem = ObjectInfo.updatedObject(currentItem, property, event.target.value) as TItem;
        setCurrentItem(newItem);
      },
      ...property.visualSettings?.propsEdit
    };
  };

  const CellEditSelect = (propsComponent: ComponentTableProps) => 
  {
    const { tableProps, property } = propsComponent;
    const { cell, row, column } = tableProps;
    const selectedValue = currentItem ? String(currentItem[property.fieldName]) : String(cell.getValue());
    const items = property.possibleValues!;
    const isModalMode = creatingStatus ? (table.options.createDisplayMode === 'modal') : (table.options.editDisplayMode === 'modal');
    return (
      <Select<TItem>
        disabled={props.disabled}
        error={validator?.validationStatus.getErrorByKey(property.fieldName)}
        imageDatabase={imageDatabase}
        items={items}
        label={isModalMode ? property.name : undefined}
        required={isModalMode ? property.editing?.required : undefined}
        selectedItem={selectedValue}
        selectProps={{
          withAlignedLabels: true,
          withCheckIcon: true,
          onChange: (value) => 
          {
            const newItem = ObjectInfo.updatedObject(currentItem, property, value) as TItem;
            setCurrentItem(newItem);
            row._valuesCache[column.id] = value;
          }
        }}
        size={actualSize}
        w={'100%'}
        {...property.visualSettings?.propsEdit}
      />
    );
  };

  const CellEditMulti = (propsComponent: ComponentTableProps) => 
  {
    const { tableProps, property } = propsComponent;
    const { cell, row, column } = tableProps;
    const selectedValues = currentItem ? (currentItem[property.fieldName] as any[]) : (cell.getValue() as any[]);
    const items = property.possibleValues!;
    const isModalMode = creatingStatus ? (table.options.createDisplayMode === 'modal') : (table.options.editDisplayMode === 'modal');

    return (
      <MultiSelect<TItem>
        disabled={props.disabled}
        error={validator?.validationStatus.getErrorByKey(property.fieldName)}
        imageDatabase={imageDatabase}
        items={items}
        label={isModalMode ? property.name : undefined}
        required={isModalMode ? property.editing?.required : undefined}
        selectedItems={selectedValues}
        selectProps={{
          withAlignedLabels: true,
          withCheckIcon: true,
          onChange: (value) => 
          {
            const newItem = ObjectInfo.updatedObject(currentItem, property, value) as TItem;
            setCurrentItem(newItem);
            row._valuesCache[column.id] = value;
          }
        }}
        size={actualSize}
        w="100%"
        {...property.visualSettings?.propsEdit}
      />
    );
  };

  // Модифицированные столбцы
  const editColumns = useMemo(
    () =>
      // eslint-disable-next-line complexity
      properties.map((property) => 
      {
        const column: MRT_ColumnDef<TItem> = MantineReactTableHelper.convertPropertyDescriptorToColumn(property);

        // Проверяем специальные свойства
        if (property.viewImage) 
        {
          // eslint-disable-next-line react/display-name
          column.Cell = function ({ cell, row }) 
          {
            const icon = cell.getValue();
            return <Primitive.Image icon={icon} iconSize={actualSize} {...property.visualSettings?.propsView} />;
          };

          if (property.editing?.enabled) 
          {
            // eslint-disable-next-line react/display-name
            column.Edit = function ({ cell, row }) 
            {
              const icon = cell.getValue();
              return (
                <ImageGallery
                  imageDatabase={imageDatabase}
                  selectedImage={icon}
                  selectRenderComponent={true}
                  size={actualSize}
                  {...property.visualSettings?.propsEdit}
                  onChangedItem={(image) =>
                  {
                    const newItem = ObjectInfo.updatedObject(currentItem, property, image?.source) as TItem;
                    setCurrentItem(newItem);

                    // @ts-expect-error row._valuesCache
                    row._valuesCache[column.id] = image?.source;
                  }
                  }
                />
              );
            };
          }

          return column;
        }

        const isLink = Assert.existValue(property.possibleValues);
        switch (property.propertyTypeDesc.type) 
        {
          case 'string':
            {
              if (property.isArray) 
              {
                //
                // Массив фильтров
                //
                column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);

                //
                // Отображение
                //
                if (isLink) 
                {
                  // Данные есть - в режиме Multi
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewMulti property={property} tableProps={props} />;
                }
                else 
                {
                  // Данные нет - в режиме Text
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;
                }
                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // multi-select (по умолчанию редактор)
                  if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditMulti property={property} tableProps={props} />;
                  }
                }
              }
              else 
              {
                //
                // Массив фильтров
                //
                column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterString(column, onSelectFilterMode);

                //
                // Отображение
                //
                if (isLink) 
                {
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewSelect property={property} tableProps={props} />;
                }
                else 
                {
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;
                }

                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // text (по умолчанию редактор)
                  if (property.editing?.editorType === 'text' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    CellEditText({ property: property, tableProps: {}, column: column });
                  }

                  // select (может быть если указан прямо)
                  if (property.editing?.editorType === 'select') 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditSelect property={property} tableProps={props} />;
                  }
                }
              }
            }
            break;
          case 'bool':
            {
              if (property.isArray) 
              {
                //
                // Массив фильтров
                //
                column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);

                //
                // Отображение
                //
                // eslint-disable-next-line react/display-name
                column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;

                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // multi-select
                  if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditMulti property={property} tableProps={props} />;
                  }
                }
              }
              else 
              {
                //
                // Массив фильтров
                //
                if (property.isNullable) 
                {
                  column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnumNull(column, onSelectFilterMode);
                }
                else 
                {
                  column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnum(column, onSelectFilterMode);
                }

                //
                // Отображение
                //
                // eslint-disable-next-line react/display-name
                column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;

                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  /* empty */
                }
              }
            }
            break;
          case 'int':
          case 'long':
          case 'float':
          case 'double':
            {
              if (property.isArray) 
              {
                //
                // Массив фильтров
                //
                column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);

                if (isLink) 
                {
                  // Данные есть - в режиме Multi
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewMulti property={property} tableProps={props} />;
                }
                else 
                {
                  // Данные нет - в режиме Text
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;
                }

                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // multi-select (по умолчанию)
                  if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditMulti property={property} tableProps={props} />;
                  }
                }
              }
              else 
              {
                //
                // Массив фильтров
                //
                if (property.isNullable) 
                {
                  column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterNumberNull(column, onSelectFilterMode);
                }
                else 
                {
                  column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterNumber(column, onSelectFilterMode);
                }

                //
                // Отображение
                //
                if (isLink) 
                {
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewSelect property={property} tableProps={props} />;
                }
                else 
                {
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;
                }

                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // text (по умолчанию редактор)
                  if (property.editing?.editorType === 'text' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    CellEditText({ property: property, tableProps: {}, column: column });
                  }

                  // select (может быть если указан прямо)
                  if (property.editing?.editorType === 'select') 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditSelect property={property} tableProps={props} />;
                  }
                }
              }
            }
            break;
          case 'enum':
            {
              if (property.isArray) 
              {
                //
                // Массив фильтров
                //
                column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);

                //
                // Отображение
                //
                if (isLink) 
                {
                  // Данные есть - в режиме Multi
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewMulti property={property} tableProps={props} />;
                }
                else 
                {
                  // Данные нет - в режиме Text хотя enun не может
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;
                }
                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // Только в режиме multi-select (по умолчанию редактор)
                  if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditMulti property={property} tableProps={props} />;
                  }
                }
              }
              else 
              {
                //
                // Массив фильтров
                //
                if (property.isNullable) 
                {
                  column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnumNull(column, onSelectFilterMode);
                }
                else 
                {
                  column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnum(column, onSelectFilterMode);
                }

                //
                // Отображение
                //
                if (isLink) 
                {
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewSelect property={property} tableProps={props} />;
                }
                else 
                {
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;
                }

                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // select (по умолчанию редактор)
                  if (property.editing?.editorType === 'select' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditSelect property={property} tableProps={props} />;
                  }

                  // text (может быть если указан прямо указан)
                  if (property.editing?.editorType === 'text') 
                  {
                    CellEditText({ property: property, tableProps: {}, column: column });
                  }
                }
              }
            }
            break;
          case 'dateTime':
            {
              if (property.isArray) 
              {
                //
                // Массив фильтров
                //
                column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);

                if (isLink) 
                {
                  // Данные есть - в режиме Multi
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewMulti property={property} tableProps={props} />;
                }
                else 
                {
                  // Данные нет - в режиме Text
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;
                }

                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // multi-select (по умолчанию)
                  if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditMulti property={property} tableProps={props} />;
                  }
                }
              }
              else 
              {
                //
                // Массив фильтров
                //
                if (property.isNullable) 
                {
                  column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterNumberNull(column, onSelectFilterMode);
                }
                else 
                {
                  column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterNumber(column, onSelectFilterMode);
                }

                //
                // Отображение
                //
                if (isLink) 
                {
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewSelect property={property} tableProps={props} />;
                }
                else 
                {
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;
                }

                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // text (по умолчанию редактор)
                  if (property.editing?.editorType === 'text' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    CellEditText({ property: property, tableProps: {}, column: column });
                  }

                  // select (может быть если указан прямо)
                  if (property.editing?.editorType === 'select') 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditSelect property={property} tableProps={props} />;
                  }
                }
              }
            }
            break;
          case 'guid':
            {
              if (property.isArray) 
              {
                //
                // Массив фильтров
                //
                column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);

                //
                // Отображение
                //
                if (isLink) 
                {
                  // Данные есть - в режиме Multi
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewMulti property={property} tableProps={props} />;
                }
                else 
                {
                  // Данные нет - в режиме Text хотя enun не может
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;
                }
                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // Только в режиме multi-select (по умолчанию редактор)
                  if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditMulti property={property} tableProps={props} />;
                  }
                }
              }
              else 
              {
                //
                // Массив фильтров
                //
                if (property.isNullable) 
                {
                  column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnumNull(column, onSelectFilterMode);
                }
                else 
                {
                  column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnum(column, onSelectFilterMode);
                }

                //
                // Отображение
                //
                if (isLink) 
                {
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewSelect property={property} tableProps={props} />;
                }
                else 
                {
                  // eslint-disable-next-line react/display-name
                  column.Cell = (props: any) => <CellViewText property={property} tableProps={props} />;
                }

                //
                // Редактирование
                //
                if (property.editing?.enabled) 
                {
                  // select (по умолчанию редактор)
                  if (property.editing?.editorType === 'select' || Assert.emptyValue(property.editing?.editorType)) 
                  {
                    // eslint-disable-next-line react/display-name
                    column.Edit = (props: any) => <CellEditSelect property={property} tableProps={props} />;
                  }

                  // text (может быть если указан прямо указан)
                  if (property.editing?.editorType === 'text') 
                  {
                    CellEditText({ property: property, tableProps: {}, column: column });
                  }
                }
              }
            }
            break;
        }
        return column;
      }),
    [hashValid, currentItem, actualSize, creatingStatus]
  );

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

  const refreshItemsAsync = async (filter: IRequest) => 
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
  const handleCreateRowBeginAsync = async () => 
  {
    if (onCreateItem) 
    {
      const response = await onCreateItem();
      if (ResponseHelper.succeed(response) && response.payload) 
      {
        setCurrentItem(response.payload);
        table.setCreatingRow(createRow(table, response.payload));
        setCreatingStatus(true);
      }
    }
    else 
    {
      setCurrentItem(undefined);
      table.setCreatingRow(true);
      setCreatingStatus(true);
    }

    const createObjectName = StringHelper.stringFormat(LocalizationCore.data.actions.createObject, objectInfo.objectName);
    setEditItemName(createObjectName);
  };

  const handleCreateRowSave = (props: { row: MRT_Row<TItem>; table: MRT_TableInstance<TItem>; exitCreatingMode: () => void }) => 
  {
    const { row, table, exitCreatingMode } = props;
    const createdItem: TItem = { ...currentItem } as TItem;

    if (onAddItem) 
    {
      const responsePromise = onAddItem(createdItem);
      void responsePromise.then((response) => 
      {
        if (ResponseHelper.succeed(response)) 
        {
          const newItems = [...items, createdItem];
          setItems(newItems);
        }
      });
    }
    setCurrentItem(undefined);
    validator?.reset();
    exitCreatingMode();
    setCreatingStatus(false);
  };

  const handleCreateRowCancel = (props: { row: MRT_Row<TItem>; table: MRT_TableInstance<TItem> }) => 
  {
    setCurrentItem(undefined);
    setCreatingStatus(false);
    validator?.reset();
  };
  // #endregion

  //
  // #region Редактирование данных
  //
  const handleEditRowBegin = (props: { row: MRT_Row<TItem>; table: MRT_TableInstance<TItem> }) => (event: any) => 
  {
    const { row, table } = props;
    table.setEditingRow(row);
    setCurrentEditRow(row);
    setCurrentItem(row.original);
    const itemName = ObjectName.getName(row.original);
    const editObjectName = StringHelper.stringFormat(LocalizationCore.data.actions.editObject, itemName);
    setEditItemName(editObjectName);
  };

  const handleEditRowCancel = (props: { row: MRT_Row<TItem>; table: MRT_TableInstance<TItem> }) => 
  {
    const { row, table } = props;
    table.setEditingRow(null);
    setCurrentEditRow(undefined);
    setCurrentItem(undefined);
    validator?.reset();
  };

  const handleEditRowSave = (props: { row: MRT_Row<TItem>; table: MRT_TableInstance<TItem> }) => 
  {
    const { row, table } = props;
    const updateItem: TItem = { ...currentItem } as TItem;

    if (onUpdateItem) 
    {
      setUpdatingProcess(true);
      const responsePromise = onUpdateItem(updateItem);
      void responsePromise
        .then((response) => 
        {
          if (ResponseHelper.succeed(response)) 
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
        })
        .finally(() => 
        {
          setUpdatingProcess(false);
        });
    }

    table.setEditingRow(null);
    setCurrentEditRow(undefined);
    setCurrentItem(undefined);
    validator?.reset();
  };
  // #endregion

  //
  // #region Удаление данных
  //
  const handleDeleteRow = (row: MRT_Row<TItem>) => (event: any) => 
  {
    setDeleteItem(row.original);
    setOpenDeleteDialog(true);
    const itemName = ObjectName.getName(row.original);
    const deleteObjectName = StringHelper.stringFormat(LocalizationCore.data.actions.deleteObject, itemName);
    setDeleteItemName(deleteObjectName);
  };

  const handleCloseDeleteDialog = () => 
  {
    setOpenDeleteDialog(false);
    setDeleteItem(undefined);
  };

  const handleOkDeleteDialogAsync = async () => 
  {
    setOpenDeleteDialog(false);
    if (deleteItem && onDeleteItem) 
    {
      setDeletingProcess(true);
      const response = await onDeleteItem(deleteItem.id);
      setDeletingProcess(false);
      if (ResponseHelper.succeed(response)) 
      {
        await refreshItemsAsync(getFilterQueryItems());
      }
    }
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

  //
  // Размер шрифта
  //
  const handleIncreaseFont = () => 
  {
    const newFontSize = TSizeTypes.next(actualSize);
    setActualSize(newFontSize);
  };

  const handleDecreaseFont = () => 
  {
    const newFontSize = TSizeTypes.prev(actualSize);
    setActualSize(newFontSize);
  };
  
  //
  // #region Методы жизненного цикла
  //
  useEffect(() => 
  {
    const filter = getFilterQueryItems();
    void refreshItemsAsync(filter);
  }, [paginationModel.pageIndex, paginationModel.pageSize, sortingState, columnFiltersState, columnFiltersFns, globalFilter]);

  useEffect(() => 
  {
    const initialColumnFiltersFns: Record<string, MRT_FilterOption> = MantineReactTableHelper.getFilterOptions(objectInfo);
    setColumnFiltersFns(initialColumnFiltersFns);
  }, []);

  useEffect(() => 
  {
    if (validator && currentItem) 
    {
      const statusValidation = validator.validate(currentItem);
    
      // 1. Проверяем изменение статуса валидности
      if (statusValidation !== currentItemValid) 
      {
        setCurrentItemValid(statusValidation);
        // Теперь событие отправляется ПОСЛЕ рендеринга
        window.dispatchEvent(createDisabledSaveButtonEvent(!statusValidation));
      }

      // 2. Проверяем изменение хеша
      const newHash = validator.validationStatus.hash();
      if (newHash !== hashValid) 
      {
        setHashValid(newHash);
      }
    }
  }, [currentItem, validator, currentItemValid, hashValid]);
  // #endregion

  //
  // #region Render
  //
  const renderRowActionsEditRow = (props: { row: MRT_Row<TItem>; table: MRT_TableInstance<TItem> }) => 
  {
    return (
      <HorizontalStack spacing={actualSize}>
        {isUpdate && (
          <Tooltip label={LocalizationCore.data.actions.edit}>
            <ActionIcon size={TSizeTypes.next(actualSize, 1, 'xl')} variant="default" onClick={handleEditRowBegin(props)}>
              <IconEdit color={blueColor} height={'100%'} width={'100%'} />
            </ActionIcon>
          </Tooltip>
        )}
        {isDelete && (
          <Tooltip label={LocalizationCore.data.actions.delete}>
            <ActionIcon size={TSizeTypes.next(actualSize, 1, 'xl')} variant="default" onClick={handleDeleteRow(props.row)}>
              <IconCircleX color={redColor} height={'100%'} width={'100%'} />
            </ActionIcon>
          </Tooltip>
        )}
      </HorizontalStack>
    );
  };

  const renderTopToolbarCustomActionsAddRow = (props: { table: MRT_TableInstance<TItem> }) => 
  {
    return (
      <Button m="md" onClick={handleCreateRowBeginAsync}>
        {LocalizationCore.data.actions.add}
      </Button>
    );
  };

  const renderToolbarInternalActions = (props: { table: MRT_TableInstance<TItem> }) => 
  {
    return (
      <>
        {/* 1. Сначала отрисовываем стандартные кнопки (поиск, фильтры и т.д.) */}
        <MRT_ToggleGlobalFilterButton table={table} />
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />

        {/* 2. Добавляем ваши кастомные кнопки в самый конец */}
        <Tooltip label="Обновить данные">
          <ActionIcon color="gray" variant="subtle" onClick={handleDecreaseFont}>
            <IconTextDecrease />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Настройки">
          <ActionIcon color="gray" mr={'md'} variant="subtle" onClick={handleIncreaseFont}>
            <IconTextIncrease />
          </ActionIcon>
        </Tooltip>
      </>
    );
  };
  // #endregion

  const table = useMantineReactTable({
    ...props,
    getRowId: (row) => row.id,
    columns: editColumns,
    layoutMode: 'grid',
    data: items,
    icons: actualIcons,
    localization: localizationFull,
    renderRowActions: props.renderRowActions ?? renderRowActionsEditRow,
    renderTopToolbarCustomActions: props.renderTopToolbarCustomActions ?? renderTopToolbarCustomActionsAddRow,
    renderToolbarInternalActions: renderToolbarInternalActions,
    rowCount: pageInfo.totalCount,
    state: {
      isLoading: isLoading,
      isSaving: isUpdatingProcess || isDeletingProcess,
      showProgressBars: isRefetching,
      showSkeletons: false,
      pagination: paginationModel,
      columnFilters: columnFiltersState,
      columnFilterFns: columnFiltersFns,
      globalFilter: globalFilter,
      sorting: sortingState
    },
    onColumnFilterFnsChange: handleColumnFilterFnsChange,
    onColumnFiltersChange: setColumnFiltersState,
    onEditingRowCancel: handleEditRowCancel,
    onEditingRowSave: handleEditRowSave,
    onCreatingRowSave: handleCreateRowSave,
    onCreatingRowCancel: handleCreateRowCancel,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPaginationModel,
    onSortingChange: setSortingState,
    mantineEditRowModalProps: ({ row }) => ({
      title: editItemName
    }),
    mantineCreateRowModalProps: ({ row }) => ({
      title: editItemName
    }),
    mantineFilterMultiSelectProps: { size: actualSize },
    mantineFilterSelectProps: { size: actualSize },
    mantineFilterTextInputProps: { size: actualSize },
    filterFns: {
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
    }
  });

  return (
    <>
      <MantineReactTable table={table} />
      <Modal key={'deleteDialog'} centered opened={openDeleteDialog} title={LocalizationCore.data.actions.delete} onClose={handleCloseDeleteDialog}>
        <VerticalStack spacing={'md'}>
          <Text>{deleteItemName}</Text>
          <HorizontalStack hAlign="space-between" mb="md" mt="md" spacing={'md'}>
            <Button radius="sm" variant="default" w={'160px'} onClick={handleCloseDeleteDialog}>
              {LocalizationCore.data.actions.cancel}
            </Button>
            <Button color={redColor} radius="sm" variant="filled" w={'160px'} onClick={handleOkDeleteDialogAsync}>
              {LocalizationCore.data.actions.delete}
            </Button>
          </HorizontalStack>
        </VerticalStack>
      </Modal>
    </>
  );
}
