import { PasswordInputProps } from '@mantine/core';
import { FC } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { IBaseFieldProps } from '../ContainerField/ContainerField';
export interface IPasswordFieldProps extends IBaseFieldProps, IHorizontalStackProps {
    passwordInputProps?: Omit<PasswordInputProps, keyof IBaseFieldProps>;
}
export declare const PasswordField: FC<IPasswordFieldProps>;
//# sourceMappingURL=PasswordField.d.ts.map