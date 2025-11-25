import { SliderProps } from '@mantine/core';
import { JSX } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { IBaseFieldProps } from '../ContainerField/ContainerField';
export interface ISliderFieldProps extends IBaseFieldProps, IHorizontalStackProps {
    sliderProps?: Omit<SliderProps, keyof IBaseFieldProps>;
}
export declare function SliderField(props: ISliderFieldProps): JSX.Element;
//# sourceMappingURL=SliderField.d.ts.map