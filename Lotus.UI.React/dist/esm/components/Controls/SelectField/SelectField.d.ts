import { SelectProps } from '@mantine/core';
import { JSX } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { IBaseFieldProps } from '../ContainerField/ContainerField';
import { IItemsBaseProps } from '../types';
export interface ISelectFieldProps<TItem> extends IBaseFieldProps, IItemsBaseProps<TItem>, IHorizontalStackProps {
    selectProps?: Omit<SelectProps, keyof IBaseFieldProps | 'data' | 'value'>;
}
export declare function SelectField<TItem = unknown>(props: ISelectFieldProps<TItem>): JSX.Element;
//# sourceMappingURL=SelectField.d.ts.map