import { ComponentPropsWithRef } from 'react';
import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { TCssAlignItems, TCssGap, TCssJustifyContent, TSizeType } from '#types';
export interface IVerticalStackProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'> {
    spacing?: TCssGap | TSizeType;
    hAlign?: TCssAlignItems;
    vAlign?: TCssJustifyContent;
    wrap?: boolean;
}
export declare function VerticalStack(props: IVerticalStackProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=VerticalStack.d.ts.map