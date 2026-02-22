import { PasswordInputProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { JSX } from 'react';
import { IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
type TValueType = PropertyType<PasswordInputProps, 'value'>;
type TChangeFunction = PropertyType<PasswordInputProps, 'onChange'>;
type TChangedValueFunction = (value: TValueType) => void;
export interface IPasswordInputProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange'> {
    passwordInputProps?: Omit<PasswordInputProps, keyof IBaseContainerControlProps | 'value' | 'disabled' | 'onChange'>;
    value?: TValueType;
    onChange?: TChangeFunction;
    onChangeValue?: TChangedValueFunction;
    disabled?: boolean;
}
export declare function PasswordInput(props: IPasswordInputProps): JSX.Element;
export {};
//# sourceMappingURL=PasswordInput.d.ts.map