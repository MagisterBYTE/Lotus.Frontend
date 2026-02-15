import { TSizeType } from '#types';
import { IItemsBaseOneProps } from '../types';
export interface IGallerySelectProps<TItem> extends IItemsBaseOneProps<TItem> {
    size?: TSizeType;
    columns?: number;
    hasFilter?: boolean;
    onFilterItem?: (item: TItem, filter: string) => boolean;
}
export declare function GallerySelect<TItem = any>(props: IGallerySelectProps<TItem>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GallerySelect.d.ts.map