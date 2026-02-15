import { SegmentedControlProps } from '@mantine/core';
import { JSX } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { IBaseFieldProps } from '../ContainerField/ContainerField';
import { IItemsBaseOneProps } from '../types';
export interface ISegmentedFieldProps<TItem> extends IBaseFieldProps, IItemsBaseOneProps<TItem>, IHorizontalStackProps {
    segmentedProps?: Omit<SegmentedControlProps, keyof IBaseFieldProps | 'data' | 'value'>;
}
export declare function SegmentedField<TItem = unknown>(props: ISegmentedFieldProps<TItem>): JSX.Element;
//# sourceMappingURL=SegmentedField.d.ts.map