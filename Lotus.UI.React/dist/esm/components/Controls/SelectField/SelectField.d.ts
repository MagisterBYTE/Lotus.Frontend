import { SelectProps } from '@mantine/core';
import { IOption } from 'lotus-core/modules/option';
import { TKey } from 'lotus-core/types';
import { JSX } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { IBaseFieldProps } from '../ContainerField/ContainerField';
export interface ISelectFieldProps<TValueOption extends TKey = TKey> extends IBaseFieldProps, IHorizontalStackProps {
    options: IOption<TValueOption>[];
    onChanged?: (value: TValueOption | undefined) => void;
    value?: TValueOption;
    selectProps?: Omit<SelectProps, keyof IBaseFieldProps | 'data' | 'value'>;
}
export declare function SelectField<TValueOption extends TKey = TKey>(props: ISelectFieldProps<TValueOption>): JSX.Element;
//# sourceMappingURL=SelectField.d.ts.map