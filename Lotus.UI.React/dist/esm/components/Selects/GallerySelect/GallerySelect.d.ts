import { InputBaseProps, PaginationProps, SimpleGridProps } from '@mantine/core';
import { ComponentPropsWithRef } from 'react';
import { IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
import { TSizeType } from '#types';
import { IItemsBaseOneProps } from '../types';
export interface IGallerySelectProps<TItem> extends IBaseContainerControlProps, IItemsBaseOneProps<TItem>, IHorizontalStackProps {
    size?: TSizeType;
    columns?: number;
    hasFilter?: boolean;
    onFilterItem?: (item: TItem, filter: string) => boolean;
    inputProps?: InputBaseProps;
    placeholder?: string;
    containerProps?: ComponentPropsWithRef<'div'>;
    gridProps?: SimpleGridProps;
    paginationProps?: PaginationProps;
}
export declare function GallerySelect<TItem = unknown>(props: IGallerySelectProps<TItem>): import("react/jsx-runtime").JSX.Element | undefined;
//# sourceMappingURL=GallerySelect.d.ts.map