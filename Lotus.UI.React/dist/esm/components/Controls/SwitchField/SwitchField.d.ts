import { SwitchProps } from '@mantine/core';
import { IHorizontalStackProps } from '#components/Layout';
import { IBaseFieldProps } from '../ContainerField/ContainerField';
export interface ISwitchFieldProps extends IBaseFieldProps, IHorizontalStackProps {
    switchProps?: Omit<SwitchProps, keyof IBaseFieldProps>;
}
export declare function SwitchField(props: ISwitchFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SwitchField.d.ts.map