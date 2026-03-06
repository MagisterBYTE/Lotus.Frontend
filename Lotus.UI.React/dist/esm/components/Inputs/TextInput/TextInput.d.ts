import { TextInputProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
type TValueType = PropertyType<TextInputProps, 'value'>;
type TChangeFunction = PropertyType<TextInputProps, 'onChange'>;
type TChangedValueFunction = (value: string) => void;
export interface ITextInputProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange'> {
    textInputProps?: Omit<TextInputProps, keyof IBaseContainerControlProps | 'value' | 'disabled' | 'onChange'>;
    value?: TValueType;
    onChange?: TChangeFunction;
    onChangeValue?: TChangedValueFunction;
    disabled?: boolean;
}
export declare function TextInput(props: ITextInputProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TextInput.d.ts.map