import { ComponentPropsWithRef } from 'react';
import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { TCenterContent } from '#types';
export interface IBoxProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'> {
    centerContent?: TCenterContent;
}
export declare function Box(props: IBoxProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Box.d.ts.map