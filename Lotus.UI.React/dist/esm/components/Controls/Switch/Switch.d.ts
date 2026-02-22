import { SwitchProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
type TValueType = PropertyType<SwitchProps, 'checked'>;
type TChangeFunction = PropertyType<SwitchProps, 'onChange'>;
type TChangedValueFunction = (value: TValueType) => void;
export interface ISwitchProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange'> {
    switchProps?: Omit<SwitchProps, keyof IBaseContainerControlProps | 'checked' | 'disabled' | 'onChange'>;
    checked?: TValueType;
    onChange?: TChangeFunction;
    onChangeValue?: TChangedValueFunction;
    disabled?: boolean;
}
export declare function Switch(props: ISwitchProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Switch.d.ts.map