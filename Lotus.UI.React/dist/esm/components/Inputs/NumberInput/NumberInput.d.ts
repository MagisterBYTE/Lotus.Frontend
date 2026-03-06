import { NumberInputProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
type TValueType = PropertyType<NumberInputProps, 'value'>;
type TValueMax = PropertyType<NumberInputProps, 'max'>;
type TValueMin = PropertyType<NumberInputProps, 'min'>;
type TValueStep = PropertyType<NumberInputProps, 'step'>;
type TValueDefaultValue = PropertyType<NumberInputProps, 'defaultValue'>;
type TChangeFunction = PropertyType<NumberInputProps, 'onChange'>;
type TChangedValueFunction = (value: number) => void;
export interface INumberInputProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange' | 'defaultValue'> {
    numberInputProps?: Omit<NumberInputProps, keyof IBaseContainerControlProps | 'value' | 'min' | 'step' | 'value' | 'disabled' | 'onChange'>;
    value?: TValueType;
    max?: TValueMax;
    min?: TValueMin;
    step?: TValueStep;
    defaultValue?: TValueDefaultValue;
    onChange?: TChangeFunction;
    onChangeValue?: TChangedValueFunction;
    disabled?: boolean;
}
export declare function NumberInput(props: INumberInputProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=NumberInput.d.ts.map