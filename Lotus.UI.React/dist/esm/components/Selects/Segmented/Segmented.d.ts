import { SegmentedControlProps } from '@mantine/core';
import { JSX } from 'react';
import { IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
import { IItemsBaseOneProps } from '../types';
export interface ISegmentedProps<TItem> extends IBaseContainerControlProps, IItemsBaseOneProps<TItem>, IHorizontalStackProps {
    segmentedProps?: Omit<SegmentedControlProps, keyof IBaseContainerControlProps | 'data' | 'value'>;
    useAccentSelection?: boolean;
}
export declare function Segmented<TItem = unknown>(props: ISegmentedProps<TItem>): JSX.Element;
//# sourceMappingURL=Segmented.d.ts.map