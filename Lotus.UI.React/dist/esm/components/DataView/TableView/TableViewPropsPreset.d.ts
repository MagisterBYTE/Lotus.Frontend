import { IRecordObject } from 'lotus-core/types';
import { ITableViewProps } from './TableView';
export type ITableViewPartProps<TItem extends IRecordObject> = Omit<ITableViewProps<TItem>, 'objectInfo' | 'onGetItems'>;
/**
 * Класс для получения типовых набор настроек для таблице
 */
export declare abstract class TableViewPropsPreset {
    static getCrud<TItem extends IRecordObject>(): ITableViewPartProps<TItem>;
}
//# sourceMappingURL=TableViewPropsPreset.d.ts.map