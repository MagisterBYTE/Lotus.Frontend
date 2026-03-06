import { TextareaProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
type TValueType = PropertyType<TextareaProps, 'value'>;
type TChangeFunction = PropertyType<TextareaProps, 'onChange'>;
type TChangedValueFunction = (value: string) => void;
export interface ITextAreaInputProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange'> {
    textAreaProps?: Omit<TextareaProps, keyof IBaseContainerControlProps | 'value' | 'disabled' | 'onChange'>;
    value?: TValueType;
    onChange?: TChangeFunction;
    onChangeValue?: TChangedValueFunction;
    disabled?: boolean;
}
export declare function TextAreaInput(props: ITextAreaInputProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TextAreaInput.d.ts.map