import { TextareaProps } from '@mantine/core';
import { FC } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { IBaseFieldProps } from '../ContainerField/ContainerField';
export interface ITextAreaFieldProps extends IBaseFieldProps, IHorizontalStackProps {
    textAreaProps?: Omit<TextareaProps, keyof IBaseFieldProps>;
}
export declare const TextAreaField: FC<ITextAreaFieldProps>;
//# sourceMappingURL=TextAreaField.d.ts.map