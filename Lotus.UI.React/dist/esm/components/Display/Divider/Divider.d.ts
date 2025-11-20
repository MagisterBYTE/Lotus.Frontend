import { IGeneralBorderProperties, IGeneralContainerProperties } from '#base';
import { TThemeColor } from '#theme/types';
import { TCssBorderStyle, TCssBorderWidth } from '#types';
import { ComponentPropsWithRef } from 'react';
export interface IDividerProps extends Omit<IGeneralContainerProperties, keyof IGeneralBorderProperties>, ComponentPropsWithRef<'div'> {
    isVertical?: boolean;
    lineStyle?: TCssBorderStyle;
    lineThickness?: TCssBorderWidth;
    lineColor?: TThemeColor;
    nml?: boolean;
    nmr?: boolean;
    nmt?: boolean;
    nmb?: boolean;
}
export declare function Divider(props: IDividerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map