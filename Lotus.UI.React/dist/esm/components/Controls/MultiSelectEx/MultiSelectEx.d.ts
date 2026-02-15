import { Factory, MultiSelectProps, MultiSelectStylesNames } from '@mantine/core';
import { ReactNode } from 'react';
export interface IMultiSelectExProps extends MultiSelectProps {
    renderPill?: (value: string, context?: any) => ReactNode;
}
export type MultiSelectExFactory = Factory<{
    props: IMultiSelectExProps;
    ref: HTMLInputElement;
    stylesNames: MultiSelectStylesNames;
}>;
export declare const MultiSelectEx: import("@mantine/core").MantineComponent<{
    props: IMultiSelectExProps;
    ref: HTMLInputElement;
    stylesNames: MultiSelectStylesNames;
}>;
//# sourceMappingURL=MultiSelectEx.d.ts.map