import { IRecordObject } from 'lotus-core/types';
import { ITableViewProps } from './TableView';

export type ITableViewPartProps<TItem extends IRecordObject> = Omit<ITableViewProps<TItem>, 'objectInfo'|'onGetItems'>

/**
 * Класс для получения типовых набор настроек для таблице
 */
export abstract class TableViewPropsPreset 
{
  public static getCrud<TItem extends IRecordObject>():ITableViewPartProps<TItem>
  {
    const props:ITableViewPartProps<TItem> =
    {
      // Включаем расширенный фильтр
      enableColumnFilterModes: true,
      enableColumnResizing: true,
      enableEditing: true,
      enableRowActions: true,
      enableRowNumbers: true,
      enableRowSelection: true,
      enableSelectAll: true,
      enablePagination: true,

      // Все делаем вручную
      manualFiltering: true,
      manualPagination: true,
      manualSorting: true,

      // Редактируем по умолчанию в режиме строки
      editDisplayMode: 'modal',

      // Закрепление управляющих столбцов
      displayColumnDefOptions: {
        'mrt-row-actions': 
        {
          size: 200,
          grow: false
        },
        'mrt-row-select': {
          size: 20, // adjust the size of the row select column
          grow: false // new in v2.8 (default is false for this column)
        },
        'mrt-row-numbers': {
          size: 20, // adjust the size of the row select column
          grow: false // new in v2.8 (default is false for this column)
        }
      },

      // Начальное состояние
      initialState: {
        columnPinning: { right: ['mrt-row-actions'], left: ['mrt-row-expand', 'mrt-row-select'] }
      },

      // Редактирование всегда справа
      positionActionsColumn: 'last',

      // Ширина
      mantinePaperProps: { style: { width: '100%' } } 
    };

    return props;
  }
}