import { SliderProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { JSX } from 'react';
import { IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
type TValueType = PropertyType<SliderProps, 'value'>;
type TValueMax = PropertyType<SliderProps, 'max'>;
type TValueMin = PropertyType<SliderProps, 'min'>;
type TValueStep = PropertyType<SliderProps, 'step'>;
type TValueDefaultValue = PropertyType<SliderProps, 'defaultValue'>;
type TChangeFunction = PropertyType<SliderProps, 'onChange'>;
type TChangedValueFunction = (value: TValueType) => void;
export interface ISliderProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange' | 'defaultValue'> {
    sliderProps?: Omit<SliderProps, keyof IBaseContainerControlProps | 'value' | 'min' | 'step' | 'value' | 'disabled' | 'onChange'>;
    value?: TValueType;
    max?: TValueMax;
    min?: TValueMin;
    step?: TValueStep;
    defaultValue?: TValueDefaultValue;
    onChange?: TChangeFunction;
    onChangeValue?: TChangedValueFunction;
    disabled?: boolean;
}
export declare function Slider(props: ISliderProps): JSX.Element;
export {};
//# sourceMappingURL=Slider.d.ts.map