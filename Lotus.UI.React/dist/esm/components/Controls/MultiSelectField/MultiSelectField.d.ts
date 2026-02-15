import { MultiSelectProps } from '@mantine/core';
import { JSX } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { IBaseFieldProps } from '../ContainerField/ContainerField';
import { IItemsBaseMultiProps } from '../types';
export interface IMultiSelectFieldProps<TItem> extends IBaseFieldProps, IItemsBaseMultiProps<TItem>, IHorizontalStackProps {
    selectProps?: Omit<MultiSelectProps, keyof IBaseFieldProps | 'data' | 'value'>;
}
export declare function MultiSelectField<TItem = unknown>(props: IMultiSelectFieldProps<TItem>): JSX.Element;
//# sourceMappingURL=MultiSelectField.d.ts.map