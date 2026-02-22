import { SelectProps } from '@mantine/core';
import { JSX } from 'react';
import { IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
import { IItemsBaseOneProps } from '../types';
export interface ISelectProps<TItem> extends IBaseContainerControlProps, IItemsBaseOneProps<TItem>, Omit<IHorizontalStackProps, 'onChange' | 'defaultValue'> {
    selectProps?: Omit<SelectProps, keyof IBaseContainerControlProps | 'data' | 'value'>;
}
export declare function Select<TItem = unknown>(props: ISelectProps<TItem>): JSX.Element;
//# sourceMappingURL=Select.d.ts.map