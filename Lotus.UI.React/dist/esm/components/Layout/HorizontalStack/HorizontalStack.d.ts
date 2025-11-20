import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { TCssAlignItems, TCssGap, TCssJustifyContent, TElementSpacing } from '#types';
import { ComponentPropsWithRef } from 'react';
export interface IHorizontalStackProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'> {
    spacing?: TCssGap | TElementSpacing;
    hAlign?: TCssJustifyContent;
    vAlign?: TCssAlignItems;
}
export declare function HorizontalStack(props: IHorizontalStackProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HorizontalStack.d.ts.map