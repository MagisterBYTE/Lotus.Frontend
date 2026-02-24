import { IObjectInfo } from 'lotus-core/modules/objectInfo';
import { IRequest, IResponse, IResponsePage } from 'lotus-core/modules/requestAndResponse';
import { IValidator } from 'lotus-core/modules/validation';
import { IImageDatabase } from 'lotus-core/resources/image';
import { IRecordObject, TKey } from 'lotus-core/types';
import { JSX } from 'react/jsx-runtime';
import { MRT_TableOptions } from '#external/mantine-react-table';
import { TSizeType } from '#types';
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
export declare function TableView<TItem extends IRecordObject>(props: ITableViewProps<TItem>): JSX.Element;
//# sourceMappingURL=TableView.d.ts.map