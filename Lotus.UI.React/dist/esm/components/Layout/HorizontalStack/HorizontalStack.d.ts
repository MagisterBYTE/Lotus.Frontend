import { ComponentPropsWithRef } from 'react';
import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { TCssAlignItems, TCssGap, TCssJustifyContent, TElementSpacing } from '#types';
export interface IHorizontalStackProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'> {
    spacing?: TCssGap | TElementSpacing;
    hAlign?: TCssJustifyContent;
    vAlign?: TCssAlignItems;
    wrap?: boolean;
}
export declare function HorizontalStack(props: IHorizontalStackProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HorizontalStack.d.ts.map