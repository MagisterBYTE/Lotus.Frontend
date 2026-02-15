import { IContextRenderBase } from '#types';
import { Factory, InputVariant, SelectProps, SelectStylesNames } from '@mantine/core';
import { ReactNode } from 'react';
export interface ISelectExProps extends SelectProps {
    renderValue?: (value: string, contextRender?: IContextRenderBase) => ReactNode;
}
export type SelectExFactory = Factory<{
    props: ISelectExProps;
    ref: HTMLInputElement;
    stylesNames: SelectStylesNames;
    variant: InputVariant;
}>;
export declare const SelectEx: import("@mantine/core").MantineComponent<{
    props: ISelectExProps;
    ref: HTMLInputElement;
    stylesNames: SelectStylesNames;
    variant: InputVariant;
}>;
//# sourceMappingURL=SelectEx.d.ts.map