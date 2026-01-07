import { TColorToken } from 'lotus-core/modules/color';
import { ComponentPropsWithRef } from 'react';
import { IGeneralBorderProperties, IGeneralContainerProperties } from '#base';
import { TCssBorderColor, TCssBorderStyle, TCssBorderWidth } from '#types';
export interface IDividerProps extends Omit<IGeneralContainerProperties, keyof IGeneralBorderProperties>, ComponentPropsWithRef<'div'> {
    isVertical?: boolean;
    lineStyle?: TCssBorderStyle;
    lineThickness?: TCssBorderWidth;
    lineColor?: TCssBorderColor | TColorToken;
    nml?: boolean;
    nmr?: boolean;
    nmt?: boolean;
    nmb?: boolean;
}
export declare function Divider(props: IDividerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map