import { ComponentPropsWithRef } from 'react';
import { IGeneralContainerProperties, IGeneralTextProperties } from '#base';
export interface ITextProps extends IGeneralContainerProperties, IGeneralTextProperties, ComponentPropsWithRef<'div'> {
    isBlock?: boolean;
}
export declare function Text(props: ITextProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Text.d.ts.map