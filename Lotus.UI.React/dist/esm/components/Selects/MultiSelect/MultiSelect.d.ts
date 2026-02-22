import { MultiSelectProps } from '@mantine/core';
import { JSX } from 'react';
import { IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
import { IItemsBaseMultiProps } from '../types';
export interface IMultiSelectProps<TItem> extends IBaseContainerControlProps, IItemsBaseMultiProps<TItem>, IHorizontalStackProps {
    selectProps?: Omit<MultiSelectProps, keyof IBaseContainerControlProps | 'data' | 'value'>;
}
export declare function MultiSelect<TItem = unknown>(props: IMultiSelectProps<TItem>): JSX.Element;
//# sourceMappingURL=MultiSelect.d.ts.map