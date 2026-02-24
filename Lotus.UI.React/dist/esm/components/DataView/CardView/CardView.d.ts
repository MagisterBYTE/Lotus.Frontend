import { IObjectInfo } from 'lotus-core/modules/objectInfo';
import { IRecordObject } from 'lotus-core/types';
import { JSX } from 'react';
import { TSizeType } from '#types';
import { IItemsBaseOneProps, RenderFunction } from 'src/components/Selects/types';
export interface ICardViewProps<TItem> extends Omit<IItemsBaseOneProps<TItem>, 'renderItem' | 'renderValue'> {
    disabled?: boolean;
    size?: TSizeType;
    objectInfo: IObjectInfo;
    renderCard: RenderFunction<TItem>;
}
export declare function CardView<TItem extends IRecordObject>(props: ICardViewProps<TItem>): JSX.Element;
//# sourceMappingURL=CardView.d.ts.map