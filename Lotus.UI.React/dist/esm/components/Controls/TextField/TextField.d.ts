import { TextInputProps } from '@mantine/core';
import { FC } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { IBaseFieldProps } from '../ContainerField/ContainerField';
export interface ITextFieldProps extends IBaseFieldProps, IHorizontalStackProps {
    textInputProps?: Omit<TextInputProps, keyof IBaseFieldProps>;
}
export declare const TextField: FC<ITextFieldProps>;
//# sourceMappingURL=TextField.d.ts.map